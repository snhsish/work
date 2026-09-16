"use client";

import { useEffect, useState, useRef } from "react";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CACHE_KEY = "github-contributions-cache";
const CACHE_DURATION = 3600 * 1000;

function getCachedData(): Contribution[] | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (!Array.isArray(data) || data.length === 0) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    if (Date.now() - timestamp < CACHE_DURATION) return data;
  } catch {}
  return null;
}

function setCachedData(data: Contribution[]) {
  if (!Array.isArray(data) || data.length === 0) return;
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ContributionGraph() {
  const [contributions, setContributions] = useState<Contribution[]>(() => getCachedData() ?? []);
  const [loading, setLoading] = useState(() => getCachedData() === null);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const [cellSize, setCellSize] = useState(12);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cached = getCachedData();

    fetch("/api/github-contributions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.contributions) && data.contributions.length > 0) {
          setContributions(data.contributions);
          setCachedData(data.contributions);
          setError(null);
        } else if (!cached) {
          throw new Error("No contribution data available");
        }
        setLoading(false);
      })
      .catch((err: Error) => {
        if (!cached) {
          setError(err.message);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const el = graphRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const dayLabelWidth = 32;
        const gap = 3;
        const numWeeks = Math.ceil((contributions.slice(-9 * 4 * 7).length) / 7);
        const available = width - dayLabelWidth - (numWeeks - 1) * gap;
        const size = Math.floor(available / numWeeks);
        setCellSize(Math.max(Math.min(size, 16), 10));
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [contributions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--muted)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-sm text-[var(--muted)]">
        Error: {error}
      </div>
    );
  }

  if (contributions.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-[var(--muted)]">
        No contribution data available
      </div>
    );
  }

  const last9Months = contributions.slice(-9 * 4 * 7);

  const weeks: Contribution[][] = [];
  let currentWeek: Contribution[] = [];

  last9Months.forEach((contribution) => {
    currentWeek.push(contribution);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const reversedWeeks = weeks.slice().reverse();

  const dayLabelWidth = 32;
  const gap = 3;

  const monthLabels: { month: string; weekIndex: number }[] = [];
  let lastMonth = -1;

  reversedWeeks.forEach((week, weekIndex) => {
    if (week.length > 0) {
      const date = new Date(week[0].date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        const leftPos = weekIndex * (cellSize + gap);
        const prevLabel = monthLabels[monthLabels.length - 1];
        if (prevLabel) {
          const prevLeft = prevLabel.weekIndex * (cellSize + gap);
          if (leftPos - prevLeft < 30) {
            lastMonth = month;
            return;
          }
        }
        monthLabels.push({ month: months[month], weekIndex });
        lastMonth = month;
      }
    }
  });

  const handleMouseEnter = (e: React.MouseEvent, contribution: Contribution) => {
    setTooltip({
      x: e.clientX,
      y: e.clientY,
      text: `${contribution.count} contribution${contribution.count !== 1 ? "s" : ""} on ${formatDate(contribution.date)}`,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div ref={graphRef} className="relative w-full overflow-x-auto">
      <div className="relative mb-1" style={{ height: "16px", marginLeft: `${dayLabelWidth}px` }}>
        {monthLabels.map((label) => (
          <span
            key={label.weekIndex}
            className="absolute text-[11px] text-[var(--muted)]"
            style={{
              left: `${label.weekIndex * (cellSize + gap)}px`,
            }}
          >
            {label.month}
          </span>
        ))}
      </div>

      <div className="relative flex">
        <div className="flex flex-col shrink-0" style={{ width: `${dayLabelWidth}px`, gap: `${gap}px` }}>
          {["", "Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
            <div
              key={i}
              className="text-[10px] text-[var(--muted)]"
              style={{ height: `${cellSize}px`, lineHeight: `${cellSize}px` }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="flex" style={{ gap: `${gap}px` }}>
          {reversedWeeks.map((week, wi) => (
            <div key={wi} className="flex flex-col" style={{ gap: `${gap}px` }}>
              {week.map((contribution) => (
                <div
                  key={contribution.date}
                  className="contribution-cell"
                  data-level={contribution.level}
                  style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                  onMouseEnter={(e) => handleMouseEnter(e, contribution)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
          ))}
        </div>

        {tooltip && (
          <div
            className="pointer-events-none fixed z-10 rounded-md bg-[var(--tooltip-bg)] px-2.5 py-1.5 text-xs text-[var(--tooltip-text)] shadow-lg"
            style={{
              left: `${tooltip.x + 12}px`,
              top: `${tooltip.y - 30}px`,
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </div>
  );
}
