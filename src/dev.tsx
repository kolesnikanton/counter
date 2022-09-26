import React from 'react';
import ReactDOM from 'react-dom';

import CountUp from './CountUp';

import './dev.css';

const Test = () => (
  <div className="test">
    <CountUp
      end={100}
      duration={20000}
    />
    <CountUp
      end={50}
      duration={20000}
    />
    <CountUp
      end={100}
      duration={20000}
    />
    <CountUp
      end={100}
      duration={20000}
    />
    <CountUp
      end={100}
      duration={20000}
    />
    <CountUp
      end={100}
      duration={20000}
    />
  </div>
);

ReactDOM.render(
  <Test />,
  document.getElementById('main'),
);
