import React from 'react';
import ReactDOM from 'react-dom';

import Counter from '../Counter';

import './index.css';

const Demo = () => (
  <div className="demo">
    <Counter start={100} duration={10000} />
    <Counter end={500} duration={10000} />
    <Counter duration={10000} />
    <Counter start={100} end={200.5} duration={1000} />
    <Counter start={1.2} end={10.5} duration={10000} />
  </div>
);

ReactDOM.render(
  <Demo />,
  document.getElementById('main'),
);