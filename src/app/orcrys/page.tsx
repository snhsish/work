import fs from "fs";
import path from "path";
import Link from "next/link";
import { MarkdownContent } from "@/components/MarkdownContent";

export default function OrcrysPage() {
  const filePath = path.join(process.cwd(), "content", "orcrys.md");
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-20">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-[#888] transition-colors hover:text-[#1a1a1a]"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back
      </Link>

      <article className="prose prose-sm max-w-none">
        <MarkdownContent source={content} />
      </article>
    </div>
  );
}
