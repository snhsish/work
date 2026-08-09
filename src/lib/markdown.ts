import fs from "fs";
import path from "path";

export async function getMarkdownContent(source: string): Promise<string> {
  if (source.startsWith("http://") || source.startsWith("https://")) {
    const res = await fetch(source, { next: { revalidate: 3600 } });
    if (!res.ok) return "";
    return res.text();
  }

  const filePath = path.join(/*turbopackIgnore: true*/ process.cwd(), source);
  return fs.readFileSync(filePath, "utf-8");
}
