export function canCancelMeal(now: Date, servingTime: Date, cutoffHours = 3) {
  const cutoffMs = servingTime.getTime() - cutoffHours * 60 * 60 * 1000;
  return now.getTime() <= cutoffMs;
}

export function cancellationCutoff(servingTime: Date, cutoffHours = 3) {
  return new Date(servingTime.getTime() - cutoffHours * 60 * 60 * 1000);
}

