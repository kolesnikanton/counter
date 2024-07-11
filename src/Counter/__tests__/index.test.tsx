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

  const nextEl = container.getElementsByClassName('next')[0] as HTMLDivElement;
  expect(nextEl.innerText).toBe(undefined);

  expect(container).toMatchSnapshot();
});

test('render - withAnimation', async () => {
  jest.useFakeTimers();

  const { container } = render(
    <Counter withAnimation fontSize={80} start="200" end="100" duration={100000} />,
  );

  const input1 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input1.innerText).toBe('200');

  jest.runAllTimers();

  const nextEl = container.getElementsByClassName('next')[0] as HTMLDivElement;
  expect(nextEl.innerText).toBe('100');

  const currentEl = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(currentEl.innerText).toBe('101');

  expect(container).toMatchSnapshot();
});

test('render with floats', async () => {
  jest.useFakeTimers();

  const { container } = render(
    <Counter fontSize={80} start="10.1" end="100.10" duration={100000} />,
  );

  const input1 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input1.innerText).toBe('10.1');

  jest.runAllTimers();

  const input2 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input2.innerText).toBe('100.10');

  const nextEl = container.getElementsByClassName('next')[0] as HTMLDivElement;
  expect(nextEl.innerText).toBe(undefined);

  expect(container).toMatchSnapshot();
});

test('render with floats with decimals', async () => {
  jest.useFakeTimers();

  const { container } = render(
    <Counter decimals={2} fontSize={80} start="10.10000" end="100.10000000" duration={100000} />,
  );

  const input1 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input1.innerText).toBe('10.10000');

  jest.runAllTimers();

  const input2 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input2.innerText).toBe('100.10');

  const nextEl = container.getElementsByClassName('next')[0] as HTMLDivElement;
  expect(nextEl.innerText).toBe(undefined);

  expect(container).toMatchSnapshot();
});

test('render without start', async () => {
  jest.useFakeTimers();

  const { container } = render(
    <Counter fontSize={80} end="100" duration={100000} />,
  );

  const input1 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input1.innerText).toBe('0');

  jest.runAllTimers();

  const input2 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input2.innerText).toBe('100');

  const nextEl = container.getElementsByClassName('next')[0] as HTMLDivElement;
  expect(nextEl.innerText).toBe(undefined);

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
