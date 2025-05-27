export function getPrecision(num: number | null): number | null {
  if (num === null) return null;
  // Округляем до 2 знаков после запятой и преобразуем в число
  return Number(num.toFixed(2));
}
