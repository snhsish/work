# work — personal portfolio

Personal portfolio site built with Next.js 16, React 19, and Tailwind CSS 4. Showcases profile, projects, work experience, tech stack, and a GitHub contribution graph.

Live repo: https://github.com/snhsish/work

## Features

- Profile / about / work experience sections
- Projects sourced from `src/lib/projects.ts` with external links
- Markdown project pages (`content/*.md`, rendered with `react-markdown` + GFM)
- GitHub contribution graph (`/api/github-contributions`) with offline fallback (`src/data/github-contributions-fallback.json`)
- Dark/light theme toggle
- Responsive layout

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, `@tailwindcss/typography`
- `react-icons`, `react-markdown`, `remark-gfm`, `rehype-sanitize`

## Getting started

Prerequisites: Node 20+, pnpm (or npm/yarn/bun).

```bash
pnpm install
cp .env.local.example .env.local   # optional, for live GitHub data
pnpm dev
```

Open http://localhost:3000.

### Env vars

| Var | Required | Description |
| --- | -------- | ----------- |
| `GITHUB_TOKEN` | No | GitHub PAT (`public_repo` scope) for live contribution graph. Without it, the fallback JSON is used. Create one at https://github.com/settings/tokens |

## Scripts

```bash
pnpm dev    # start dev server
pnpm build  # production build
pnpm start  # run production build
pnpm lint   # eslint
```

## Project structure

```
src/app/            # routes, layout, /api/github-contributions, /[slug]
src/components/     # sections (About, Projects, Work, TechStack, ContributionGraph, …)
src/lib/            # github.ts, projects.ts, markdown.ts
src/data/           # github-contributions-fallback.json
content/            # markdown pages for each project slug
public/             # static assets
```

To add/edit a project page, add a `slug.md` file in `content/` and register the slug in `src/lib/projects.ts`.

## Deploy

Any Node host works. On Vercel, import the repo, optionally set `GITHUB_TOKEN`, and deploy with defaults (`pnpm build`).
