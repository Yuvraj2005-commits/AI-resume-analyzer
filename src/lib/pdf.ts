// The default "generic" pdfjs-dist build assumes a browser DOM (DOMMatrix,
// etc). Server-side (Next.js API routes run in Node), pdfjs-dist requires
// the "legacy" Node-compatible build instead.
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractPdfText(buffer: Buffer) {
  const uint8Array = new Uint8Array(buffer);

  const pdf = await pdfjsLib.getDocument({
    data: uint8Array,
  }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const content = await page.getTextContent();

    text += content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
  }

  return text;
}