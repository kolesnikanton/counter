import React from 'react';
import { render } from '@testing-library/react';
import Counter from '..';

test('render', async () => {
  jest.useFakeTimers();

  const { container } = render(
    <Counter fontSize={50} start="2" end="23.5" duration={10000} />,
  );

  const input1 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input1.innerText).toBe('2');

  jest.runAllTimers();

  const input2 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input2.innerText).toBe('23.5');

  expect(container).toMatchSnapshot();
});

test('render - with animation', async () => {
  jest.useFakeTimers();

  const { container } = render(
    <Counter fontSize={80} start="200" end="100" duration={100000} />,
  );

  const input1 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input1.innerText).toBe('200');

  jest.runAllTimers();

  const input2 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input2.innerText).toBe('100');

  expect(container).toMatchSnapshot();
});

test('render - duration error', async () => {
  const { container } = render(
    <Counter fontSize={80} start="101" end="100" duration={1} />,
  );

  expect(container).toMatchSnapshot();
});

test('render - without numbers error', async () => {
  const { container } = render(
    <Counter start="" end="" fontSize={80} duration={100} />,
  );

  expect(container).toMatchSnapshot();
});
