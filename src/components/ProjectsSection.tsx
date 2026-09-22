import Link from "next/link";

const projects = [
  {
    name: "CrossCode",
    description: "OpenCode remote client for mobile",
    date: "Jul 2026",
    href: "https://crosscode.site",
  },
  {
    name: "mtrx",
    description: "Local-first telemetry & analytics dashboard for AI coding agents",
    date: "Aug 2026",
    href: "https://github.com/snhsish/mtrx",
  },
  {
    name: "readme-terminal",
    description: "Beautiful animated terminal SVGs for your READMEs and websites",
    date: "Sep 2026",
    href: "https://terminal-readme.vercel.app",
  },
  {
    name: "fx0",
    description: "Fast, minimal, unified AI chat app that routes multiple models into a single interface",
    date: "Feb 2025",
    href: "/fx0",
  },
];

export default function ProjectsSection() {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-sm font-medium text-[var(--muted)]">Projects</h2>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {projects.map((project) => {
          const external = project.href.startsWith("http");
          return (
            <div
              key={project.name}
              className="flex items-center justify-between py-2.5"
            >
              <Link
                href={project.href}
                className="group min-w-0 flex-1"
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
              <span className="text-base font-medium transition-colors group-hover:text-[var(--muted)]">
                {project.name}
              </span>
              <p className="truncate text-sm text-[#888]">{project.description}</p>
            </Link>
            <span className="shrink-0 text-sm text-[#888]">{project.date}</span>
          </div>
          );
        })}
      </div>
    </section>
  );
}
