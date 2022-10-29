# Counter

* Number increase animation (when start is less than end)
* Number decrease animation (when start is greater than end)
* Works with decimal numbers (but only with one number after the decimal point)
* Without repeat

## Props:
* `start (0 by default)`: A number to start the counter at
* `end (0 by default)`: A number to stop the counter at
* `duration (required)`: Time in ms to stop the counter
* `className`: CSS class name to style the counter

## Example:
```
<Counter start={100} duration={10000} />
<Counter end={500} duration={10000} />
<Counter start={200} end={50} duration={10000} />
<Counter start={100} end={200} duration={10000} />
<Counter start={1.2} end={10.5} duration={10000} />
```