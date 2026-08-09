import Link from "next/link";

const projects = [
  {
    name: "CrossCode",
    description: "OpenCode remote client for mobile",
    date: "Jul 2026",
    href: "/crosscode",
  },
  {
    name: "better-screenshots",
    description: "Screenshot tool with image and background customizations plus cloud uploads",
    date: "Mar 2026",
    href: "/better-screenshots",
  },
  {
    name: "nyashare",
    description: "Light-weight local file sharing tool between devices on the same network",
    date: "Feb 2026",
    href: "/nyashare",
  },
  {
    name: "fx0",
    description: "Fast, minimal, unified AI chat app that routes multiple models into a single interface",
    date: "Feb 2025",
    href: "/fx0",
  },
  {
    name: "VSCode Status",
    description: "Export your VSCode activity to a REST API",
    date: "Dec 2024",
    href: "/vscode-status",
  },
  {
    name: "AniMangaList",
    description: "Modern anime and manga tracking platform that lets users organize, track, and manage their watch and reading lists",
    date: "Apr 2024",
    href: "/animangalist",
  },
];

export default function ProjectsSection() {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-sm font-medium text-[var(--muted)]">Projects</h2>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex items-center justify-between py-2.5"
          >
            <Link href={project.href} className="group min-w-0 flex-1">
              <span className="text-base font-medium transition-colors group-hover:text-[var(--muted)]">
                {project.name}
              </span>
              <p className="truncate text-sm text-[#888]">{project.description}</p>
            </Link>
            <span className="shrink-0 text-sm text-[#888]">{project.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
