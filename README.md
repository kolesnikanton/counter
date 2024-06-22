# Counter
React number increase/decrease animation

* Number increase animation (when start is less than end)
* Number decrease animation (when start is greater than end)
* Works with decimal numbers
* Without repeat

## Demo
See demo [HERE](https://antonkolesnik.com/counter/)

## Props:
* `start (0 by default)`: A number to start the counter at
* `end (0 by default)`: A number to stop the counter at
* `duration (required)`: Time in ms to stop the counter
* `className`: CSS class name to style the counter
* `fontSize (80 by default)`
* `withAnimation`: Smooth transition animation
* `decimals`

![Animation](https://raw.githubusercontent.com/kolesnikanton/counter/master/static/animation.gif)

## Installation

#### Install with NPM
```bash
npm install @antonkolesnik/counter
```
#### Install with Yarn
```bash
yarn add @antonkolesnik/counter
```

## Stylesheets
```js
import '@antonkolesnik/counter/lib/styles.css';
```

## Example:
```js
import Counter from '@antonkolesnik/counter';
import '@antonkolesnik/counter/lib/styles.css';

const Demo = () => (
  <div>
    <Counter fontSize={50} start={100} duration={10000} />
    <Counter end={500} duration={10000} />
    <Counter start={200} end={50} duration={10000} />
    <Counter start={100} end={200} duration={10000} />
    <Counter start={1.2} end={10.5} duration={10000} />
    <Counter withAnimation fontSize={80} start={200} end={100} duration={100000} />
  </div>
);
```
