interface Contribution {
  date: string;
  count: number;
  level: number;
}

export async function getContributions(): Promise<Contribution[]> {
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

    return contributions;
  } catch {
    return [];
  }
}
