/** Abuja inspections are booked on West Africa Time, which stays at UTC+1. */
const LAGOS_OFFSET_MS = 60 * 60 * 1000;
const LEAD_MS = 6 * 60 * 60 * 1000;
const OPEN_MINUTES = 9 * 60;
const CLOSE_MINUTES = 17 * 60;

type LagosParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  weekday: number;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function lagosParts(instant: Date): LagosParts {
  const shifted = new Date(instant.getTime() + LAGOS_OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
    second: shifted.getUTCSeconds(),
    weekday: shifted.getUTCDay(),
  };
}

export function formatSlotDate(parts: Pick<LagosParts, "year" | "month" | "day">) {
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`;
}

function minutesToTime(minutes: number) {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

export function inspectionInstant(date: string, time: string) {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})/.exec(time);
  if (!dateMatch || !timeMatch) return null;
  const parsed = new Date(`${date}T${timeMatch[1]}:${timeMatch[2]}:00+01:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function weekdayOf(date: string) {
  return lagosParts(inspectionInstant(date, "12:00") ?? new Date(NaN)).weekday;
}

/** First Monday–Saturday that still has a time at least 6 hours ahead, between 9:00 and 17:00. */
export function earliestInspectionDate(now = new Date()) {
  for (let day = 0; day < 21; day += 1) {
    const probe = new Date(now.getTime() + day * 24 * 60 * 60 * 1000);
    const date = formatSlotDate(lagosParts(probe));
    if (inspectionTimeBounds(date, now)) return date;
  }
  return formatSlotDate(lagosParts(now));
}

/** Allowed clock times for a chosen day. Null when that day cannot be booked. */
export function inspectionTimeBounds(date: string, now = new Date()) {
  const midday = inspectionInstant(date, "12:00");
  if (!midday || lagosParts(midday).weekday === 0) return null;

  const earliest = new Date(now.getTime() + LEAD_MS);
  const earliestParts = lagosParts(earliest);
  const earliestDate = formatSlotDate(earliestParts);
  if (date < earliestDate) return null;

  let minMinutes = OPEN_MINUTES;
  if (date === earliestDate) {
    let minutes = earliestParts.hour * 60 + earliestParts.minute;
    if (earliestParts.second > 0) minutes += 1;
    minMinutes = Math.max(OPEN_MINUTES, minutes);
  }
  if (minMinutes > CLOSE_MINUTES) return null;

  return { min: minutesToTime(minMinutes), max: minutesToTime(CLOSE_MINUTES) };
}

export function inspectionScheduleIssue(date: string, time: string, now = new Date()) {
  if (!date) return { path: "date" as const, message: "Choose a preferred date" };
  if (!time) return { path: "time" as const, message: "Choose a preferred time" };

  const slot = inspectionInstant(date, time);
  if (!slot || Number.isNaN(weekdayOf(date))) {
    return { path: "date" as const, message: "Choose a valid date" };
  }
  if (weekdayOf(date) === 0) {
    return { path: "date" as const, message: "Inspections run Monday to Saturday." };
  }
  const today = formatSlotDate(lagosParts(now));
  if (date < today) {
    return { path: "date" as const, message: "Choose a date that has not already passed." };
  }
  if (!inspectionTimeBounds(date, now)) {
    return {
      path: "date" as const,
      message: "No inspection times are left on that day. Choose a later Monday to Saturday.",
    };
  }

  const match = /^(\d{2}):(\d{2})/.exec(time);
  const minutes = match ? Number(match[1]) * 60 + Number(match[2]) : -1;
  if (minutes < OPEN_MINUTES || minutes > CLOSE_MINUTES) {
    return { path: "time" as const, message: "Choose a time between 9:00 AM and 5:00 PM." };
  }
  if (slot.getTime() < now.getTime()) {
    return { path: "time" as const, message: "Choose a time that has not already passed." };
  }
  if (slot.getTime() < now.getTime() + LEAD_MS) {
    return { path: "time" as const, message: "Book at least 6 hours from now." };
  }
  return null;
}
