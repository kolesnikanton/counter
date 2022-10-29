import React, { useRef, useEffect } from 'react';

import './index.css';

function isInt(n: number) {
  return n % 1 === 0;
}

type CountParams = {
  start: number,
  end: number;
  intervalStepTime: number;
  isDecrease: boolean,
  element: {
    current?: {
      innerText: string,
    }
  };
};

function count(params: CountParams) {
  const {
    start, end, element, intervalStepTime, isDecrease,
  } = params;

  let current = start;
  element.current.innerText = String(current);

  const timer = setInterval(() => {
    const isFloatRange = !isInt(end) || !isInt(start);

    if (isFloatRange) {
      current = isDecrease
        ? Number((current - 0.1).toFixed(1))
        : Number((current + 0.1).toFixed(1));
    } else {
      current = isDecrease ? current - 1 : current + 1;
    }

    element.current.innerText = isFloatRange
      ? current.toFixed(1)
      : String(current);

    if (current === end) {
      clearInterval(timer);
    }
  }, intervalStepTime);
}

function getIntervalStepTime(params: {
  startNumber: number,
  endNumber: number;
  duration: number;
  isDecrease: boolean;
}) {
  const MINIMAL_INTERVAL_TIME = 10;

  const {
    duration, startNumber, endNumber, isDecrease,
  } = params;

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

function getErrorElement(errorMessage: string) {
  return (
    <h1 style={{ color: 'red' }}>
      Error
      {': '}
      {errorMessage}
    </h1>
  );
}

export default function Counter(props: {
  start?: number,
  end?: number,
  duration: number,
  className?: string,
}) {
  const inputRef = useRef();

  const {
    start = 0, end = 0, duration, className,
  } = props;

  if (!start && !end) {
    return getErrorElement('START & END VALUES ARE EMPTY');
  }

  const isDecrease = start > end;

  const intervalStepTime = getIntervalStepTime({
    startNumber: start, endNumber: end, duration, isDecrease,
  });

  if (!intervalStepTime) {
    return getErrorElement('TOO SMALL DURATION VALUE');
  }

  useEffect(() => {
    count({
      start,
      end,
      intervalStepTime,
      element: inputRef,
      isDecrease,
    });
  }, []);

  const defaultClassName = 'counter-number';
  const classNames = className ? `${defaultClassName} ${className}` : defaultClassName;

  return (
    <span className={classNames} ref={inputRef} />
  );
}
