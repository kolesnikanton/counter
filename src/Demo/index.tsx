import React from 'react';
import { createRoot } from 'react-dom/client';

import Counter from '../Counter';

import './index.css';

const Demo = () => (
  <div className="demo">
    <Counter fontSize={50} withAnimation start={200} end={100} duration={100000} />
    <Counter fontSize={50} end={500} duration={10000} />
    <Counter fontSize={50} withAnimation start={100} end={200} duration={100000} />
    <Counter fontSize={50} start={100.2} end={50.5} duration={500000} />
    <Counter fontSize={50} start={1.2} end={10.5} duration={10000} />
    {/* <Counter fontSize={50} duration={10000} /> */}
  </div>
);

createRoot(document.getElementById('main')).render(<Demo />);
