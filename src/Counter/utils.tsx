export function isInt(n: number) {
  return n % 1 === 0;
}

export function getIntervalStepTime({
  duration, startNumber, endNumber, isDecrease,
}: {
  startNumber: number,
  endNumber: number;
  duration: number;
  isDecrease: boolean;
}) {
  const MINIMAL_INTERVAL_TIME = 10;

  const number = isDecrease ? startNumber - endNumber : endNumber - startNumber;
  let stepTime = Math.floor(duration / number);

  if (!isInt(endNumber) || !isInt(startNumber)) {
    const fromDecimalToInteger = number * 10;
    stepTime = duration / fromDecimalToInteger;
  }

  if (stepTime < MINIMAL_INTERVAL_TIME) {
    return null;
  }

  return stepTime;
}

export function getNextIntervalValue({ isFloatRange, isDecrease, currentValue }: {
  isFloatRange: boolean,
  isDecrease: boolean,
  currentValue: number,
}) {
  if (isDecrease) {
    return isFloatRange ? Number((currentValue - 0.1).toFixed(1)) : currentValue - 1;
  }

  return isFloatRange ? Number((currentValue + 0.1).toFixed(1)) : currentValue + 1;
}
