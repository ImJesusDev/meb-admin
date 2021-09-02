/**
 * Calculate days
 * @param date Date to calculate days relative today
 * @returns Number days calculates
 */
export function calcDays(date: string): number {
  const checkUpDate = new Date(date);
  const currentDate = new Date();

  const sub = currentDate.getTime() - checkUpDate.getTime();
  const results = Math.round(sub / (1000 * 60 * 60 * 24));
  return results;
}
