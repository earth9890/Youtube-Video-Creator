// macOS Vision OCR for thumbnails: prints one JSON line per image:
// {"f": path, "lines": [{"t": text, "c": confidence, "x","y","w","h": box as 0–1 of the image, y from the top}]}
// build: swiftc -O ocr.swift -o ocr      usage: ./ocr img/*.jpg > ocr.jsonl
import Foundation
import Vision
import AppKit

for path in CommandLine.arguments.dropFirst() {
    guard let img = NSImage(contentsOfFile: path),
          let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
    let req = VNRecognizeTextRequest()
    req.recognitionLevel = .accurate
    req.usesLanguageCorrection = false
    try? VNImageRequestHandler(cgImage: cg).perform([req])
    var lines: [[String: Any]] = []
    for o in req.results ?? [] {
        guard let c = o.topCandidates(1).first else { continue }
        let b = o.boundingBox
        lines.append(["t": c.string, "c": Double(c.confidence),
                      "x": b.minX, "y": 1 - b.maxY, "w": b.width, "h": b.height])
    }
    var data = try! JSONSerialization.data(withJSONObject: ["f": path, "lines": lines])
    data.append(10)
    FileHandle.standardOutput.write(data)   // one write() per line: parallel runs (xargs -P) don't interleave
}
