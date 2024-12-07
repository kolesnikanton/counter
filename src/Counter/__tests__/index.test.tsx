import React from 'react';
import { render } from '@testing-library/react';
import Counter from '..';

test('render', async () => {
  jest.useFakeTimers();

  const onUpdate = jest.fn();

  const { container } = render(
    <Counter onUpdate={onUpdate} fontSize={50} start="2" end="23.5" duration={10000} />,
  );

  const input1 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input1.innerText).toBe('2');

  jest.runAllTimers();

  const input2 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input2.innerText).toBe('23.5');

  const nextEl = container.getElementsByClassName('next')[0] as HTMLDivElement;
  expect(nextEl.innerText).toBe(undefined);

  expect(onUpdate).toHaveBeenCalledTimes(215);
  expect(onUpdate).toHaveBeenNthCalledWith(1, '2.1');
  expect(onUpdate).toHaveBeenNthCalledWith(2, '2.2');
  expect(onUpdate).toHaveBeenNthCalledWith(215, '23.5');

  expect(container).toMatchSnapshot();
});

test('render - withAnimation', async () => {
  jest.useFakeTimers();

  const { container } = render(
    <Counter withAnimation start="200" end="100" duration={100000} />,
  );

  const input1 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input1.innerText).toBe('200');

  jest.runAllTimers();

  const nextEl = container.getElementsByClassName('next')[0] as HTMLDivElement;
  expect(nextEl.innerText).toBe('100');
  expect(nextEl.style.transform).toEqual('translate(0, -92px)');

  const currentEl = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(currentEl.innerText).toBe('101');
  expect(currentEl.style.transform).toEqual('translate(0, 92px)');

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

test('render without end', async () => {
  jest.useFakeTimers();

  const { container } = render(
    <Counter start="100" duration={100000} />,
  );

  const input1 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input1.innerText).toBe('100');

  jest.runAllTimers();

  const input2 = container.getElementsByClassName('current')[0] as HTMLDivElement;
  expect(input2.innerText).toBe('0');

  const nextEl = container.getElementsByClassName('next')[0] as HTMLDivElement;
  expect(nextEl.innerText).toBe(undefined);

  expect(container).toMatchSnapshot();
});

test('render - intervalStepTime error', async () => {
  const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const { container } = render(
    <Counter start="101.321.32" end="100" duration={1} />,
  );

  expect(container).toMatchInlineSnapshot(`
<div>
  <span>
    Incorrect props
  </span>
</div>
`);
  logSpy.mockRestore();
});

test('render - duration error', async () => {
  const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const { container } = render(
    <Counter start="101" end="100" duration={1} />,
  );

  expect(container).toMatchInlineSnapshot(`
<div>
  <span>
    Too small duration value
  </span>
</div>
`);
  logSpy.mockRestore();
});

test('render - without numbers error', async () => {
  const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  const { container } = render(
    <Counter start="" end="" duration={100} />,
  );

  expect(container).toMatchInlineSnapshot(`
<div>
  <span>
    Start and end props are empty
  </span>
</div>
`);
  logSpy.mockRestore();
});

test('render with isStart', async () => {
  const { container } = render(
    <Counter isStart={false} end="100" duration={100000} />,
  );
  expect(container).toMatchInlineSnapshot('<div />');
});
