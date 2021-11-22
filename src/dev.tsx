import React from 'react';
import ReactDOM from 'react-dom';

import CountUp from './components/CountUp';

ReactDOM.render(
  <CountUp
    end={100}
    duration={2000}
  />,
  document.getElementById('main'),
);
