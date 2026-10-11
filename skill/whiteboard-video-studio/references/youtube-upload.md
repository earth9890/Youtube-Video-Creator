# YouTube upload — Studio via Claude in Chrome

Step 9, after render + package. Uploads each video with title, description, tags, thumbnail, audience, visibility. Everything here was learned on the Black Hole Life batch (10 × 4K, Oct 2026); every gotcha cost a retry.

## 0. Before starting (ask / check once)
- **Visibility the user wants**: Unlisted (review first) · Public · Public + instant Premiere · Scheduled. Never go Public without the user saying so in chat.
- **Channel verified?** Unverified channels get **only ~5 custom thumbnails per day**; the 6th triggers a "One-time verification needed" modal and silently skips the thumbnail. If uploading > 5 videos, ask the user to verify first: Studio → Settings → Channel → Feature eligibility → phone verification (user does this — never enter phone numbers/codes yourself).
- **Pinned comments** post publicly as the channel → get explicit OK before posting.
- **Logged-in channel**: screenshot `studio.youtube.com` and confirm the channel name/avatar.

## 1. Manifest (one JSON for the whole batch)
Build from each `package.md` — title = the **pick**, thumbnail = the variant the package pairs with the pick (`a` or `b`), description verbatim (no `<` `>`, ≤ 5000 chars), tags ≤ 500 chars, absolute paths.
```python
# scratchpad/uploads.json → [{slug,title,desc,tags,pin,video,thumb}, ...]
desc = re.search(r'## Description\n(.*?)\n## Tags', t, re.S).group(1).strip()
tags = re.search(r'## Tags[^\n]*\n(.*?)\n\n', t, re.S).group(1).strip()
```
Title "Pick" lines vary in format across agents — map picks explicitly instead of regex-parsing them; `assert title in package_text`.

## 2. Getting big files into the page
`file_upload` (Chrome tool) caps at **10 MB per call** — 4K renders are 50–90 MB. Approach that worked (**needs the user's explicit approval first** — the safety classifier blocks it otherwise; ask with AskUserQuestion, offering "user drags files in" and "re-encode < 10 MB" as alternatives):

1. Throwaway local server with CORS + Private-Network headers, rooted at the channel folder:
```python
import http.server, os
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Private-Network', 'true')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()
    def do_OPTIONS(self): self.send_response(204); self.end_headers()
os.chdir(os.path.expanduser('~/videos/<channel>'))
http.server.ThreadingHTTPServer(('127.0.0.1', 8765), H).serve_forever()
```
2. First page fetch triggers Chrome's **"Allow access to local network"** prompt — the user must click Allow; the fetch hangs until then (CDP evaluate times out at 45 s → fire-and-forget the fetch and poll a `window.__state`).
3. In the page: fetch → `File` → `DataTransfer` → set `input.files` → dispatch `change`.
4. Copy the manifest next to the served files (`renders/uploads.json`), `trash` it and `pkill -f srv.py` when done.

## 3. Upload dialog — selectors that work
| What | How |
|---|---|
| Open dialog | button `aria-label="Upload videos"` (top-right upload icon) |
| Video file input | `ytcp-uploads-dialog input[type=file]` |
| Title / description | `ytcp-uploads-dialog #textbox` [0] / [1] (contenteditable) |
| Thumbnail input | `ytcp-uploads-dialog input#file-loader` (png/jpg, < 2 MB) |
| Not made for kids | `tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"]` |
| Show more (tags) | `#toggle-button` (click only if text says "more") |
| Tags input | `input[aria-label="Tags"]` |
| Progress text | `.progress-label` → wait for /Checks complete|Upload complete/ |
| Next ×3 | `#next-button` (Details → Video elements → Checks → Visibility) |
| Visibility | radio `name="PRIVATE" | "UNLISTED" | "PUBLIC"`; premiere = `ytcp-checkbox-lit#enable-premiere-checkbox` (click its `#checkbox`, check `aria-checked`) |
| Save | `#done-button` |
| After save | `ytcp-video-share-dialog` ("Video published") **or** `ytcp-uploads-still-processing-dialog` ("Video processing") → `ytcp-button#close-button` |

### Gotchas (each one broke a video)
- **Studio overwrites the title (and wipes the description) with the filename** a few seconds after the file lands. Set text only after the video link (`a[href*="youtu.be"]`) appears + 2.5 s, then **re-check right before Next** and re-set if wrong. **Re-query `#textbox` every time** — Studio re-renders them; a cached element reference writes into a detached node and the check falsely passes.
- **Writing contenteditable**: `document.execCommand('selectAll')` selects the whole page when focus didn't land. Use a Range on the element:
```js
const setBox = (el, text) => { el.click(); el.focus(); const s = getSelection(); s.removeAllRanges();
  const r = document.createRange(); r.selectNodeContents(el); s.addRange(r);
  document.execCommand('insertText', false, text); el.dispatchEvent(new Event('input', {bubbles: true})); };
```
- **Tags**: `execCommand('insertText')` into the tag input produced garbled chips (`"how to stop overthinkinoverthinking"`). Reliable: scroll the input into view, get its rect via JS, then real `computer.left_click` + `computer.type` of `"tag1, tag2, …, last,"` (trailing comma commits the last chip). Verify chip texts via `ytcp-chip` innerText; remove bad chips by clicking their ✕.
- **`offsetParent` is null inside fixed-position dialogs** → use `el.getClientRects().length > 0` for visibility checks, or the close-button wait never resolves and the loop hangs at "save".
- Keep each `javascript_exec` under ~40 s (CDP 45 s timeout). Long loops: start them without `await`, store progress in `window.__s`, poll with short calls.
- Don't run a long autonomous loop and also act manually on the same dialog — the "stuck" loop resumes and saves under you. Either kill it (make its helpers throw) or let it finish.
- Typing while focus is on the video preview fires player shortcuts (`f` = fullscreen). Click the exact input rect first; `Escape` + `document.exitFullscreen()` to recover.

## 4. Fix-ups on the edit page (`studio.youtube.com/video/<ID>/edit`)
Use when a field didn't stick. Same `#textbox` [0]/[1], `input#file-loader`, tags input; Save = `ytcp-button#save` (disabled = saved; toast "Changes saved").
- Navigating away with unsaved changes raises "Leave site?" and blocks `navigate` → always Save first.

## 5. Visibility change on existing videos (Unlisted → Public / Premiere)
1. Open `/video/<ID>/edit`, wait ~5 s, `ytcp-video-metadata-visibility.scrollIntoView({block:'center'})`, read its rect.
2. Click it with `computer.left_click` — **the first click after page load often only focuses it**; screenshot/zoom and click again if the popup isn't open. Never fire blind second clicks (the popup's Schedule row sits under the same spot).
3. With the popup open, do the rest in JS: click `tp-yt-paper-radio-button[name=PUBLIC]` (visible one), then the premiere `#checkbox` if `aria-checked !== 'true'`, verify both, click visible `ytcp-button#save-button` (Done).
4. `document.querySelector('ytcp-button#save').click()`; wait 4 s; confirm the visibility text reads **"Premiere"** (saved) — **"Premiering"** means still unsaved → click Save again. Coordinate clicks on Save right after Done were often swallowed.
5. Viewport can change mid-session (1492→1512 wide) — never reuse old coordinates without a fresh screenshot.
6. If screenshots/scripts start timing out ("page is busy"), a native dialog is probably blocking the tab — stop and ask the user to look at the window; don't retry blindly.

## 6. Verify the batch (always)
Content list `studio.youtube.com/channel/<UC…>/videos/upload` → per row: `ytcp-video-row #video-title`, video ID from the `/video/` link, `.tablecell-visibility`. Shrink with `document.body.style.zoom='0.55'` for one screenshot of every thumbnail; reset after. Report a table: slug · link · visibility · custom thumbnail ✅/❌ · anything not done.

## 7. Report to the user
Links (`https://youtu.be/<ID>`), what's live vs unlisted, which thumbnails are missing and why (verification), anything skipped (pinned comments, A/B "Test & compare" with the second thumbnail — available on the Details page under Thumbnail → A/B Testing once verified).
