import React, { useRef, useEffect } from 'react';

import Error from './Error';
import { isInt, getIntervalStepTime, getNextIntervalValue } from './utils';
import { ERROR_MESSAGES, SMALL_DURATION_VALUE, DEFAULT_VALUES } from './constants';

import './index.css';

export default function Counter({
  duration,
  start = 0,
  end = 0,
  className,
  withAnimation,
  fontSize = DEFAULT_VALUES.fontSize,
}: {
  duration: number,
  start?: number,
  end?: number,
  className?: string,
  withAnimation?: boolean,
  fontSize?: number,
}) {
  const inputRef = useRef(null);
  const isDecrease = start > end;
  const currentInputValueRef = useRef('');

  function setInputPosition({
    isInitial,
    intervalStepTime,
  }: {
    isInitial: boolean,
    intervalStepTime: number,
  }) {
    const transition = isInitial ? 'transform 0s' : `transform ${intervalStepTime / 2}ms`;
    inputRef.current.children[0].style.transition = transition;
    inputRef.current.children[1].style.transition = transition;

    const trasnlateValue = fontSize;
    const currentElTranslate = isInitial
      ? 'translate(0, 0)'
      : `translate(0, ${isDecrease ? trasnlateValue : -trasnlateValue}px)`;

    const nextElTranslate = isInitial
      ? `translate(0, ${isDecrease ? -trasnlateValue : trasnlateValue}px)`
      : 'translate(0, 0)';

    inputRef.current.children[0].style.transform = currentElTranslate;
    inputRef.current.children[1].style.transform = nextElTranslate;
  }

  function setInitialValue(value: string) {
    currentInputValueRef.current = value;
    inputRef.current.children[0].innerText = value;
  }

  function changeInputValue(
    nextInputValue: string,
    intervalStepTime: number,
    isFloatRange: boolean,
  ) {
    if (isFloatRange || !withAnimation) {
      inputRef.current.children[0].innerText = nextInputValue;
      return;
    }

    setInputPosition({ isInitial: true, intervalStepTime });
    inputRef.current.children[0].innerText = currentInputValueRef.current;
    inputRef.current.children[1].innerText = nextInputValue;

    setTimeout(() => {
      setInputPosition({ isInitial: false, intervalStepTime });
    }, intervalStepTime / 2);

    currentInputValueRef.current = nextInputValue;
  }

  function count({ intervalStepTime }: {
    intervalStepTime: number;
    element: React.Ref<HTMLDivElement>,
  }) {
    setInitialValue(String(start));

    const isFloatRange = !isInt(end) || !isInt(start);
    let currentIntervalValue = start;

    const timer = setInterval(() => {
      const nextIntervalValue = getNextIntervalValue({
        isFloatRange,
        isDecrease,
        currentValue: currentIntervalValue,
      });

      changeInputValue(
        isFloatRange ? nextIntervalValue.toFixed(1) : String(nextIntervalValue),
        intervalStepTime,
        isFloatRange,
      );

      if (nextIntervalValue === end) {
        clearInterval(timer);
      }

      currentIntervalValue = nextIntervalValue;
    }, intervalStepTime);
  }

  if (!start && !end) {
    return <Error errorMessage={ERROR_MESSAGES.emptyStartEndValue} />;
  }

  const intervalStepTime = getIntervalStepTime({
    startNumber: start, endNumber: end, duration, isDecrease,
  });

  if (!intervalStepTime) {
    return <Error errorMessage={ERROR_MESSAGES.smallDurationValue} />;
  }

  if (withAnimation && intervalStepTime < SMALL_DURATION_VALUE) {
    return <Error errorMessage={ERROR_MESSAGES.smallDurationValue} />;
  }

  useEffect(() => {
    if (inputRef.current) {
      count({ intervalStepTime, element: inputRef });
    }
  }, [inputRef.current]);

  const defaultClassName = 'counter-number';
  const classNames = className ? `${defaultClassName} ${className}` : defaultClassName;
  const startLength = String(start).length;
  const endLength = String(end).length;
  const maxLength = startLength > endLength ? startLength : endLength;
  const fontWidth = fontSize * 0.6;
  const fontHeight = fontSize * 1.15;
  const width = maxLength * fontWidth;

  return (
    <div
      ref={inputRef}
      className={classNames}
      style={{ fontSize, height: fontHeight, width }}
    >
      <div className="current" />
      <div className="next" />
    </div>
  );
}
