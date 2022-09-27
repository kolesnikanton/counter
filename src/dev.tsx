import React from 'react';
import ReactDOM from 'react-dom';

import Counter from './Counter';

import './dev.css';

const Test = () => (
  <div className="test">
    <Counter
      end={100}
      duration={20000}
    />
    <Counter
      end={50}
      duration={20000}
    />
    <Counter
      end={100}
      duration={20000}
    />
    <Counter
      end={100}
      duration={20000}
    />
    <Counter
      end={100}
      duration={20000}
    />
    <Counter
      end={100}
      duration={20000}
    />
  </div>
);

ReactDOM.render(
  <Test />,
  document.getElementById('main'),
);
