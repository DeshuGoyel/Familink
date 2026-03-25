export function calculateProjectionSequence(
  initialValue: number,
  annualGrowthRate: number,
  years: number
): { year: number; value: number }[] {
  const currentYear = new Date().getFullYear();
  const sequence = [];
  
  for (let i = 0; i <= years; i++) {
    sequence.push({
      year: currentYear + i,
      value: initialValue * Math.pow(1 + annualGrowthRate, i)
    });
  }
  
  return sequence;
}

export function calculateProjection(
  initialValue: number,
  annualGrowthRate: number,
  years: number
): number {
  return initialValue * Math.pow(1 + annualGrowthRate, years);
}
