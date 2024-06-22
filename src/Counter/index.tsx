import React, { useRef, useEffect } from 'react';
import { combineStrings } from '@antonkolesnik/utils';

import {
  isFloat,
  getIntervalStepTime,
  getNextIntervalValue,
  getDecimals,
  isIntervalEnd,
} from './utils';

import {
  ERROR_MESSAGES, MINIMAL_ANIMATION_INTERVAL_TIME, DEFAULT_VALUES, MINIMAL_INTERVAL_TIME,
} from './constants';

// TODO: Add handleStop
/* eslint-disable no-param-reassign */
export default function Counter({
  duration,
  start = '0',
  end = '0',
  className,
  withAnimation,
  fontSize = DEFAULT_VALUES.fontSize,
  decimals: decimalsProp,
}: {
  duration: number,
  start?: string,
  end?: string,
  className?: string,
  withAnimation?: boolean,
  fontSize?: number,
  decimals?: number,
}) {
  const inputRef = useRef<HTMLDivElement>(null);
  const currentInputValueRef = useRef<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Value after point
  const decimals = decimalsProp || getDecimals({ start, end });
  const isFloatRange = isFloat(end) || isFloat(start);
  const isDecrease = Number(start) > Number(end);
  const operation = isDecrease ? -1 : 1;
  const fontHeight = fontSize * 1.15;
  const intervalStepTime = getIntervalStepTime({
    startNumber: start, endNumber: end, duration, isDecrease, decimals,
  });
  // We can't make it slowly than intervalStepTime / 2,
  // because we will not have time to see the animation
  const ANIMATION_SPEED = intervalStepTime / 2;

  function setInputPosition({
    isInitial,
    currentEl,
    nextEl,
  }: {
    isInitial: boolean;
    currentEl: HTMLDivElement;
    nextEl: HTMLDivElement;
  }) {
    // Show the translate changes slowly
    // intervalStepTime / 2 - Show it at the same time as intervalStepTime, but smoother
    const transition = isInitial ? 'transform 0s' : `transform ${ANIMATION_SPEED}ms`;
    currentEl.style.transition = transition;
    nextEl.style.transition = transition;

    const currentElTranslate = isInitial
      // Go back and wait for the next transition
      ? 'translate(0, 0)'
      // The current element goes down/up depends on isDecrease
      : `translate(0, ${isDecrease ? fontHeight : -fontHeight}px)`;

    const nextElTranslate = isInitial
      /*
        isDecrease: move nextEl above currentEl:
        * 2 - position of currentEl + one more
        !isDecrease: do nothing
        isInitial: go back and wait for the next transition
      */
      ? `translate(0, ${isDecrease ? -fontHeight * 2 : 0}px)`
      /*
        Move nextEl to the currentEl position
        0 - current nextEl position, we don't see it
        0 - fontHeight = goes up
        fontHeight*2 - fontHeight = goes down
      */
      : `translate(0, ${-fontHeight}px)`;

    currentEl.style.transform = currentElTranslate;
    nextEl.style.transform = nextElTranslate;
  }

  function setInitialValue(value: string, currentEl: HTMLDivElement) {
    currentInputValueRef.current = value;
    currentEl.innerText = value;
  }

  function changeInputValue(
    nextInputValue: string,
    currentEl: HTMLDivElement,
    nextEl: HTMLDivElement,
  ) {
    if (withAnimation) {
      // Set nextInputValue from the previous call
      // or currentValue from setInitialValue
      currentEl.innerText = currentInputValueRef.current;
      nextEl.innerText = nextInputValue;

      // This is for currentEl.innerText
      // when changeInputValue will be called again
      currentInputValueRef.current = nextInputValue;

      // Go back to inital translate values
      setInputPosition({
        isInitial: true,
        currentEl,
        nextEl,
      });

      // Start animation here
      const timeout = setTimeout(() => {
        setInputPosition({
          isInitial: false,
          currentEl,
          nextEl,
        });
      }, ANIMATION_SPEED);

      // To clear when unmount
      timeoutRef.current = timeout;
      return;
    }

    currentEl.innerText = nextInputValue;
  }

  function count({ counterEl }: {
    counterEl: HTMLDivElement;
  }) {
    const currentEl = counterEl.children[0] as HTMLDivElement;
    const nextEl = counterEl.children[1] as HTMLDivElement;

    // To see the first start value before changing
    setInitialValue(start, currentEl);

    let currentIntervalValue = start;

    const timer = setInterval(() => {
      const nextIntervalValue = getNextIntervalValue({
        isFloatRange,
        currentValue: Number(currentIntervalValue),
        decimals,
        operation,
      });

      changeInputValue(
        nextIntervalValue,
        currentEl,
        nextEl,
      );

      if (isIntervalEnd({ nextIntervalValue, end, decimals })) {
        clearInterval(timer);
      }

      currentIntervalValue = nextIntervalValue;
    }, intervalStepTime);

    intervalRef.current = timer;
  }

  useEffect(() => {
    if (inputRef.current) {
      count({ counterEl: inputRef.current });
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  if (!start && !end) {
    const error = new Error(ERROR_MESSAGES.emptyStartEndValue);
    // eslint-disable-next-line no-console
    console.error(error);
    return <span>{String(error)}</span>;
  }

  if (
    intervalStepTime < MINIMAL_INTERVAL_TIME
    || (withAnimation && intervalStepTime < MINIMAL_ANIMATION_INTERVAL_TIME)
  ) {
    const error = new Error(ERROR_MESSAGES.smallDurationValue);
    // eslint-disable-next-line no-console
    console.error(error);
    return <span>{String(error)}</span>;
  }

  return (
    <div
      ref={inputRef}
      className={combineStrings('counter-number', className)}
      style={{ fontSize, height: fontHeight }}
    >
      <div style={{ height: fontHeight }} className="current" />
      <div style={{ height: fontHeight }} className="next" />
    </div>
  );
}
