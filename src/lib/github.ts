import fallbackData from "@/data/github-contributions-fallback.json";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

const USERNAME = "snhsish";

async function getContributionsViaGraphQL(token: string): Promise<Contribution[] | null> {
  const query = `
    query {
      user(login: "${USERNAME}") {
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

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const data = await res.json();
  if (data.errors || !data.data?.user?.contributionsCollection?.contributionCalendar) {
    return null;
  }

  const calendar = data.data.user.contributionsCollection.contributionCalendar as {
    weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
  };

  return calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
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
}

async function getContributionsViaPublicApi(): Promise<Contribution[] | null> {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const data = await res.json();
  if (!Array.isArray(data.contributions) || data.contributions.length === 0) {
    return null;
  }

  return data.contributions;
}

export async function getContributions(): Promise<Contribution[]> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      const live = await getContributionsViaGraphQL(token);
      if (live && live.length > 0) return live;
    } catch {}
  }

  try {
    const pub = await getContributionsViaPublicApi();
    if (pub && pub.length > 0) return pub;
  } catch {}

  return fallbackData.contributions as Contribution[];
}
