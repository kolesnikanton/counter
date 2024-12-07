export function isFloat(str: string): boolean {
  return str.includes('.');
}

export function getIntervalStepTime({
  duration, startNumber, endNumber, isDecrease, decimals,
}: {
  startNumber: string,
  endNumber: string;
  duration: number;
  isDecrease: boolean;
  decimals: number;
}): number {
  const start = Number(startNumber);
  const end = Number(endNumber);

  // Calculate how many operations we need to make before setInterval is finished
  const operations = isDecrease ? start - end : end - start;

  if (isFloat(endNumber) || isFloat(startNumber)) {
    // Multiply operations by number after point
    // 10 ** decimals - operations after point
    const factor = 10 ** decimals;
    const operationsWithFloat = operations * factor;
    return duration / operationsWithFloat;
  }

  return Math.floor(duration / operations);
}

export function isIntervalEnd({
  nextIntervalValue,
  end,
  decimals,
}: {
  nextIntervalValue: string;
  end: string;
  decimals: number;
}): boolean {
  // For a case where start = *.0 and end = *.01
  if (isFloat(nextIntervalValue) || isFloat(end)) {
    return nextIntervalValue === Number(end).toFixed(decimals);
  }

  return nextIntervalValue === end;
}

export function getDecimals({ start, end }: {
  start: string,
  end: string,
}): number {
  const startDecimals = isFloat(start) ? start.split('.')[1].length : 0;
  const endDecimals = isFloat(end) ? end.split('.')[1].length : 0;

  return startDecimals > endDecimals ? startDecimals : endDecimals;
}

export function getNextIntervalValue({
  isFloatRange, currentValue, decimals, operation,
}: {
  isFloatRange: boolean,
  currentValue: number,
  decimals: number,
  operation: number,
  // factor: number,
}): string {
  if (isFloatRange) {
    const factor = 10 ** decimals;
    // operation / factor = 0.1, 0.001, 0,0001... (Depends on decimals)
    const result = (currentValue + operation / factor).toFixed(decimals);
    return result;
  }

  const result = currentValue + operation;
  return String(result);
}
