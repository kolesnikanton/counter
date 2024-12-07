import * as utils from '../utils';

test('getNextIntervalValue', () => {
  expect(utils.getNextIntervalValue({
    isFloatRange: true,
    currentValue: 10,
    decimals: 3,
    operation: 1,
  })).toEqual('10.001');

  expect(utils.getNextIntervalValue({
    isFloatRange: true,
    currentValue: 10,
    decimals: 1,
    operation: -1,
  })).toEqual('9.9');

  expect(utils.getNextIntervalValue({
    isFloatRange: true,
    currentValue: 10,
    decimals: 1,
    operation: 1,
  })).toEqual('10.1');

  expect(utils.getNextIntervalValue({
    isFloatRange: true,
    currentValue: 10.501,
    decimals: 3,
    operation: 1,
  })).toEqual('10.502');

  expect(utils.getNextIntervalValue({
    isFloatRange: true,
    currentValue: 1.0,
    decimals: 2,
    operation: 1,
  })).toEqual('1.01');

  // floatRange = false
  expect(utils.getNextIntervalValue({
    isFloatRange: false,
    currentValue: 10,
    decimals: 1,
    operation: 1,
  })).toEqual('11');

  expect(utils.getNextIntervalValue({
    isFloatRange: false,
    currentValue: 10,
    decimals: 0,
    operation: -1,
  })).toEqual('9');
});

test('getDecimals', () => {
  expect(utils.getDecimals({
    start: '10',
    end: '10',
  })).toEqual(0);

  expect(utils.getDecimals({
    start: '10.1',
    end: '10.11',
  })).toEqual(2);

  expect(utils.getDecimals({
    start: '10.111',
    end: '10.11',
  })).toEqual(3);

  expect(utils.getDecimals({
    start: '1.0',
    end: '10.01',
  })).toEqual(2);
});

test('getIntervalStepTime', () => {
  expect(utils.getIntervalStepTime({
    duration: 1000, // 1s
    startNumber: '1',
    endNumber: '11',
    isDecrease: false,
    decimals: 0,
  })).toEqual(100); // 1000 / (11 - 1) = 100ms

  expect(utils.getIntervalStepTime({
    duration: 1000, // 1s
    startNumber: '11',
    endNumber: '1',
    isDecrease: true,
    decimals: 0,
  })).toEqual(100); // 1000 / (11 - 1) = 100ms

  expect(utils.getIntervalStepTime({
    duration: 1000, // 1s
    startNumber: '1.0',
    endNumber: '11.0',
    isDecrease: false,
    decimals: 1,
  })).toEqual(10);
  // Operations = (11.00 - 1.00) * 10^1 = 100
  // 1000 / 100 = 10ms

  expect(utils.getIntervalStepTime({
    duration: 1000, // 1s
    startNumber: '1.00',
    endNumber: '11.00',
    isDecrease: false,
    decimals: 2,
  })).toEqual(1);
  // Operations (11.00 - 1.00) * 10^2 = 1000;
  // 1000 / 1000 = 1ms
});

test('isIntervalEnd', () => {
  expect(utils.isIntervalEnd({
    nextIntervalValue: '10',
    end: '10',
    decimals: 0,
  })).toBeTruthy();

  expect(utils.isIntervalEnd({
    nextIntervalValue: '10.0',
    end: '10.0',
    decimals: 1,
  })).toBeTruthy();

  expect(utils.isIntervalEnd({
    nextIntervalValue: '10.0',
    end: '10.01',
    decimals: 1,
  })).toBeTruthy();

  expect(utils.isIntervalEnd({
    nextIntervalValue: '10.0',
    end: '10.00001',
    decimals: 1,
  })).toBeTruthy();

  expect(utils.isIntervalEnd({
    nextIntervalValue: '10',
    end: '10',
    decimals: 3,
  })).toBeTruthy();

  expect(utils.isIntervalEnd({
    nextIntervalValue: '10.001',
    end: '10.00100',
    decimals: 3,
  })).toBeTruthy();

  expect(utils.isIntervalEnd({
    nextIntervalValue: '10.001',
    end: '10.1',
    decimals: 2,
  })).toBeFalsy();

  expect(utils.isIntervalEnd({
    nextIntervalValue: '10.01',
    end: '10.00001',
    decimals: 2,
  })).toBeFalsy();
});
