import {
  SiNixos,
  SiTypescript,
  SiGit,
  SiNextdotjs,
  SiNodedotjs,
  SiBun,
  SiTailwindcss,
  SiExpress,
  SiReact,
  SiRedux,
  SiSvelte,
  SiPrisma,
  SiDiscord,
  SiDiscorddotjs,
  SiSupabase,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiDrizzle,
  SiPostgresql,
  SiPostman,
  SiAstro,
  SiJavascript,
  SiPython,
  SiGo,
  SiC,
  SiCplusplus,
  SiRust,
  SiGnubash,
  SiHtml5,
  SiCss,
  SiLinux,
  SiElectron,
  SiGithub,
  SiNpm,
  SiPnpm,
  SiCockroachlabs,
  SiHoppscotch,
  SiBootstrap,
  SiNeovim,
  SiGooglecloud,
  SiVercel,
  SiCloudflare,
  SiNetlify,
  SiFirebase,
  SiSentry,
  SiArduino,
  SiRaspberrypi,
  SiBlender,
  SiFigma,
  SiGodotengine,
  SiChakraui,
  SiExpo,
  SiTurborepo,
  SiShadcnui,
  SiClaudecode,
  SiOpencode,
  SiGooglegemini,
  SiAgentskills,
  SiNvidia,
  SiHyprland,
} from "react-icons/si";
import { VscVscode, VscMcp } from "react-icons/vsc";
import { DiRedis } from "react-icons/di";
import { BsOpenai } from "react-icons/bs";
import { FaLaptop, FaMicrochip } from "react-icons/fa6";

const techStack = {
  Languages: [
    { name: "Nix", icon: SiNixos },
    { name: "TypeScript", icon: SiTypescript },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Python", icon: SiPython },
    { name: "Go", icon: SiGo },
    { name: "C", icon: SiC },
    { name: "C++", icon: SiCplusplus },
    { name: "Rust", icon: SiRust },
    { name: "Shell", icon: SiGnubash },
    { name: "HTML5", icon: SiHtml5 },
    { name: "CSS3", icon: SiCss },
  ],
  "Frameworks & Libraries": [
    { name: "React", icon: SiReact },
    { name: "Expo", icon: SiExpo },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Svelte", icon: SiSvelte },
    { name: "Astro", icon: SiAstro },
    { name: "Redux", icon: SiRedux },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Bun", icon: SiBun },
    { name: "Express.js", icon: SiExpress },
    { name: "Electron", icon: SiElectron },
    { name: "Discord.js", icon: SiDiscorddotjs },
  ],
  "UI & Styling": [
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Bootstrap", icon: SiBootstrap },
    { name: "Chakra UI", icon: SiChakraui },
    { name: "shadcn/ui", icon: SiShadcnui },
  ],
  "Databases & ORM": [
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MySQL", icon: SiMysql },
    { name: "CockroachDB", icon: SiCockroachlabs },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Redis", icon: DiRedis },
    { name: "Supabase", icon: SiSupabase },
    { name: "Firebase", icon: SiFirebase },
    { name: "Prisma", icon: SiPrisma },
    { name: "Drizzle ORM", icon: SiDrizzle },
  ],
  "Dev Tools": [
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: SiGithub },
    { name: "npm", icon: SiNpm },
    { name: "pnpm", icon: SiPnpm },
    { name: "Hoppscotch", icon: SiHoppscotch },
    { name: "Postman", icon: SiPostman },
    { name: "Neovim", icon: SiNeovim },
    { name: "VS Code", icon: VscVscode },
    { name: "Turborepo", icon: SiTurborepo },
  ],
  "Cloud & Hosting": [
    { name: "Linux", icon: SiLinux },
    { name: "Google Cloud", icon: SiGooglecloud },
    { name: "Vercel", icon: SiVercel },
    { name: "Cloudflare", icon: SiCloudflare },
    { name: "Netlify", icon: SiNetlify },
    { name: "Sentry", icon: SiSentry },
  ],
  "Hardware & IoT": [
    { name: "Arduino", icon: SiArduino },
    { name: "Raspberry Pi", icon: SiRaspberrypi },
  ],
  "Design & Creative": [
    { name: "Blender", icon: SiBlender },
    { name: "Figma", icon: SiFigma },
    { name: "Godot", icon: SiGodotengine },
  ],
  "AI & Agents": [
    { name: "Claude Code", icon: SiClaudecode },
    { name: "OpenCode", icon: SiOpencode },
    { name: "AntiGravity", icon: SiGooglegemini },
    { name: "Codex", icon: BsOpenai },
    { name: "Model Context Protocol", icon: VscMcp },
    { name: "Agent Skills", icon: SiAgentskills },
  ],
};

export default function TechStackSection() {
  return (
    <section className="mb-10 mt-16">
      <h2 className="mb-3 text-sm font-medium text-[var(--muted)]">Tech Stack</h2>
      {Object.entries(techStack).map(([category, items]) => (
        <div key={category} className="mb-4">
          <h3 className="mb-2 text-xs font-medium text-[var(--muted)]">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="group relative flex h-7 w-7 items-center justify-center"
                >
                  <Icon className="h-5 w-5 text-[var(--icon-default)] transition-colors hover:text-[var(--icon-hover)]" />
                  <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--tooltip-bg)] px-2 py-1 text-[10px] text-[var(--tooltip-text)] opacity-0 transition-opacity group-hover:opacity-100">
                    {tech.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-8 border-t border-[var(--border)] pt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xs font-medium text-[var(--muted)]">Hardware</h3>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-sm text-[var(--text)]">
                <FaLaptop className="h-4 w-4 text-[var(--icon-default)]" />
                <span>OMEN by HP Gaming Laptop 16</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text)]">
                <FaMicrochip className="h-4 w-4 text-[var(--icon-default)]" />
                <span>AMD Ryzen 7 7840HS (16) @ 3.80 GHz</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text)]">
                <SiNvidia className="h-4 w-4 text-[var(--icon-default)]" />
                <span>NVIDIA GeForce RTX 4060 Max-Q</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-medium text-[var(--muted)]">Software</h3>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-sm text-[var(--text)]">
                <SiNixos className="h-4 w-4 text-[var(--icon-default)]" />
                <span>NixOS 26.05 (Yarara)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text)]">
                <SiLinux className="h-4 w-4 text-[var(--icon-default)]" />
                <span>Linux 6.18.32</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text)]">
                <SiHyprland className="h-4 w-4 text-[var(--icon-default)]" />
                <span>Hyprland 0.55.0 (Wayland)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
