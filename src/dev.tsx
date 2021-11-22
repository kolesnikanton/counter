import React from 'react';
import ReactDOM from 'react-dom';

import CountUp from './components/CountUp';

ReactDOM.render(
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      maxWidth: '500px',
      margin: '0 auto',
    }}
  >
    <CountUp
      end={100}
      duration={2000}
    />
    <CountUp
      end={500}
      duration={2000}
    />
    <CountUp
      end={10.5}
      duration={2000}
    />
  </div>,
  document.getElementById('main'),
);
