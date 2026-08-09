import fs from "fs";
import path from "path";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

interface CachedData {
  contributions: Contribution[];
  timestamp: number;
}

const CACHE_FILE = path.join(process.cwd(), ".cache", "github-contributions.json");
const CACHE_DURATION = 3600 * 1000; // 1 hour

function readCache(): CachedData | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const data = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
    if (Date.now() - data.timestamp < CACHE_DURATION) {
      return data;
    }
  } catch {}
  return null;
}

function writeCache(data: CachedData) {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data));
}

export async function getContributions(): Promise<Contribution[]> {
  const cached = readCache();
  if (cached) return cached.contributions;

  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  const query = `
    query {
      user(login: "snhsish") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    if (data.errors) return [];

    const calendar = data.data.user.contributionsCollection.contributionCalendar;

    const contributions = calendar.weeks.flatMap((week: any) =>
      week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        level:
          day.contributionLevel === "NONE"
            ? 0
            : day.contributionLevel === "FIRST_QUARTILE"
            ? 1
            : day.contributionLevel === "SECOND_QUARTILE"
            ? 2
            : day.contributionLevel === "THIRD_QUARTILE"
            ? 3
            : 4,
      }))
    );

    writeCache({ contributions, timestamp: Date.now() });
    return contributions;
  } catch {
    return [];
  }
}
