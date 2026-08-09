import Link from "next/link";
import { SiX, SiInstagram, SiDiscord, SiWhatsapp } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";

const socials = [
  {
    label: "X",
    href: "https://x.com/snhsish",
    icon: SiX,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/snehasish",
    icon: SiInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/snhsish",
    icon: FaLinkedin,
  },
  {
    label: "Discord",
    href: "https://discord.gg/K6k6ebkJkx",
    icon: SiDiscord,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918918369476",
    icon: SiWhatsapp,
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 flex items-center justify-between border-t border-[var(--border)] pt-6">
      <div className="flex items-center gap-3">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-7 w-7 items-center justify-center"
              aria-label={social.label}
            >
              <Icon className="h-4 w-4 text-[var(--icon-default)] transition-colors group-hover:text-[var(--icon-hover)]" />
              <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--tooltip-bg)] px-2 py-1 text-[10px] text-[var(--tooltip-text)] opacity-0 transition-opacity group-hover:opacity-100">
                {social.label}
              </div>
            </Link>
          );
        })}
      </div>
      <ThemeToggle />
    </footer>
  );
}
