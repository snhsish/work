import Link from "next/link";

const workEntries = [
  {
    company: "Orcrys Technologies Private Limited",
    role: "Software Engineer Intern",
    start: "May 2026",
    end: "Jul 2026",
    href: "/orcrys",
  },
  {
    company: "Freelance",
    role: "Full-stack Web Developer",
    start: "Dec 2022",
    end: "Jan 2026",
  },
];

export default function WorkSection() {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-sm font-medium text-[var(--muted)]">Work</h2>
      <div className="divide-y divide-[var(--border)]">
        {workEntries.map((entry) => (
          <div
            key={entry.company}
            className="flex items-center justify-between py-2.5"
          >
            {"href" in entry && entry.href ? (
              <Link href={entry.href} className="group">
                <span className="text-base font-medium transition-colors group-hover:text-[var(--muted)]">
                  {entry.company}
                </span>
                <p className="text-sm text-[#888]">{entry.role}</p>
              </Link>
            ) : (
              <div>
                <span className="text-base font-medium">{entry.company}</span>
                <p className="text-sm text-[#888]">{entry.role}</p>
              </div>
            )}
            <span className="text-sm text-[#888]">
              {entry.start} - {entry.end}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
