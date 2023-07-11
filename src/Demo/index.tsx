import React from 'react';
import { createRoot } from 'react-dom/client';

import Counter from '../Counter';

import './index.css';

const Demo = () => (
  <div>
    {/* With animation */}
    <div className="demo">
      from 200 to 100
      <Counter fontSize={80} withAnimation start={200} end={100} duration={100000} />
      from 100 to 200
      <Counter fontSize={80} withAnimation start={100} end={200} duration={100000} />
    </div>
    {/* Common */}
    <div className="demo">
      from 50 to 500
      <Counter fontSize={50} end={500} duration={10000} />
    </div>
    {/* With float range */}
    <div className="demo">
      from 100.2 to 50.5
      <Counter fontSize={50} start={100.2} end={50.5} duration={50000} />
      from 1.2 to 10.5
      <Counter fontSize={50} start={1.2} end={10.5} duration={10000} />
      from 0 to 23.5
      <Counter fontSize={50} end={23.5} duration={10000} />
    </div>
    {/* Errors */}
    <div className="demo">
      without numbers
      <Counter fontSize={50} duration={10000} />
      with small duration
      <Counter fontSize={50} end={23.5} duration={4} />
    </div>
  </div>
);

const main = document.getElementById('main');
if (main) {
  createRoot(main).render(<Demo />);
}
