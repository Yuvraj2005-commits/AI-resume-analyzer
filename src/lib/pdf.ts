import * as pdfjsLib from "pdfjs-dist";

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
      .map((item: any) => item.str)
      .join(" ");
  }

  return text;
}