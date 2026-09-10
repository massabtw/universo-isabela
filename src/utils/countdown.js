export function getTimeLeft(targetDate, now = Date.now()) {
  const diff = Math.max(0, new Date(targetDate).getTime() - now);
  const totalSeconds = Math.ceil(diff / 1000);
  return {
    diff,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds / 3600) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
  };
}
