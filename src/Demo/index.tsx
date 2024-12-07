import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import Counter from '../Counter';
import '../Counter/styles.css';

import './index.css';

const DEFAULT_VALUES = {
  start: '1.0',
  end: '10.0',
  duration: 5000,
  key: 1,
  withAnimation: false,
  decimals: 0,
};

const Demo = () => {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [isStartState, setIsStart] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsStart(false);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {};

  return (
    <div className="demo">
      Start
      <input
        id="start"
        name="start"
        placeholder="start"
        onChange={handleChange}
        value={values.start}
      />
      End
      <input name="end" placeholder="end" onChange={handleChange} value={values.end} />
      Duration
      <input name="duration" placeholder="duration" onChange={handleChange} value={values.duration} />
      Decimals
      <input name="decimals" placeholder="decimals" onChange={handleChange} value={values.decimals} />
      WithAnimation
      <input
        type="checkbox"
        onChange={() => {
          setIsStart(false);
          setValues({ ...values, withAnimation: !values.withAnimation });
        }}
        checked={values.withAnimation}
      />

      <button
        type="button"
        onClick={() => {
          setIsStart(false);
          setTimeout(() => setIsStart(true), 0);
        }}
      >
        Start
      </button>

      <Counter
        fontSize={80}
        decimals={Number(values.decimals)}
        withAnimation={values.withAnimation}
        start={values.start}
        end={values.end}
        duration={Number(values.duration)}
        onUpdate={handleUpdate}
        isStart={isStartState}
      />
    </div>
  );
};

const main = document.getElementById('main');
if (main) {
  createRoot(main).render(<Demo />);
}
