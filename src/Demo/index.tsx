import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import Counter from '../Counter';
import '../Counter/styles.css';

import './index.css';

const Demo = () => {
  const DEFAULT_VALUES = {
    start: '1.0',
    end: '10.0',
    duration: 500000,
    key: 1,
    withAnimation: true,
  };

  const [values, setValues] = useState(DEFAULT_VALUES);
  const [formValues, setFormValues] = useState(DEFAULT_VALUES);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormValues({
      ...values,
      key: formValues.key + 1,
    });
  };

  return (
    <div>
      <div className="demo">
        <form onSubmit={handleSubmit}>
          <input name="start" placeholder="start" onChange={handleChange} value={values.start} />
          <input name="end" placeholder="end" onChange={handleChange} value={values.end} />
          <input name="duration" placeholder="duration" onChange={handleChange} value={values.duration} />
          {/* <input type="checkbox" checked={values.withAnimation} /> */}
          <button type="submit">Start</button>
        </form>
        <Counter
          key={formValues.key}
          fontSize={80}
          // decimals={1}
          withAnimation={formValues.withAnimation}
          start={formValues.start}
          end={formValues.end}
          duration={Number(formValues.duration)}
        />
      </div>
    </div>
  );
};

const main = document.getElementById('main');
if (main) {
  createRoot(main).render(<Demo />);
}
