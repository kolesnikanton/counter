import React, { useRef } from 'react';

function isInt(n: number) {
  return n % 1 === 0;
}

type CountParams = {
  end: number;
  intervalStepTime: number;
  element: {
    current?: {
      innerText: number,
    }
  };
};

const count = (params: CountParams) => {
  let current = 0;

  const { end, element, intervalStepTime } = params;

  const timer = setInterval(() => {
    if (!isInt(end)) {
      current = Number((current + 0.1).toFixed(2));
    } else {
      current += 1;
    }

    if (element?.current) {
      element.current.innerText = current;
    }

    if (current === end) {
      clearInterval(timer);
    }
  }, intervalStepTime);
};

const getIntervalStepTime = (params: {
  endNumber: number;
  duration: number;
}) => {
  const MINIMAL_INTERVAL_TIME = 4;
  const { duration, endNumber } = params;

  let stepTime = Math.floor(duration / endNumber);

  if (!isInt(endNumber)) {
    const fromDecimalToInteger = endNumber * 10;
    stepTime = duration / fromDecimalToInteger;
  }

  if (stepTime < MINIMAL_INTERVAL_TIME) {
    return null;
  }

  return stepTime;
};

const CountUp = (props: {
  end: number,
  duration: number,
  className?: string,
}) => {
  const inputRef = useRef();
  const { end, duration, className } = props;

  const intervalStepTime = getIntervalStepTime({ endNumber: end, duration });

  if (!intervalStepTime) {
    return null;
  }

  count({
    end,
    intervalStepTime,
    element: inputRef,
  });

  return <span className={className} ref={inputRef} />;
};

export default CountUp;
