import { AnalyticsItem, Origin } from "../types";
import { getEnv } from "./getEnv";

export const getVercelAnalytics = async (origin: Origin.SW1 | Origin.SW2) => {
  const url = buildVercelUrl(origin);

  const verceltoken = getEnv("API_TOKEN_VERCEL");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${verceltoken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  const dataFormated = summarizeAnalytics(
    data.data.groups.all as AnalyticsItem[]
  );

  return dataFormated;
};

const buildVercelUrl = (origin: Origin.SW1 | Origin.SW2) => {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const url = new URL("https://vercel.com/api/web-analytics/timeseries");

  const project =
    origin === Origin.SW2 ? "cercle-des-vignerons" : "portfolio-v2";

  url.searchParams.set("from", sevenDaysAgo.toISOString());
  url.searchParams.set("to", now.toISOString());
  url.searchParams.set("projectId", project);
  url.searchParams.set("teamId", "rossalex0s-projects");
  url.searchParams.set("tz", "Europe/Paris");

  return url;
};

const summarizeAnalytics = (data: AnalyticsItem[]) => {
  const perDay: Record<string, number> = {};
  let total = 0;

  const formatter = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  for (const item of data) {
    const date = new Date(item.key);
    const dayLabel = formatter.format(date);

    perDay[dayLabel] = (perDay[dayLabel] || 0) + item.devices;
    total += item.devices;
  }

  return { perDay, total };
};
