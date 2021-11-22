# Count Up

* Animation of increasing numbers
* Works with decimal numbers (but only with one number after the decimal point)
* Without repeat
* Starts from 0

## Props:
* `end (required)`: A number to stop the counter at
* `duration (required)`: Time in ms to stop the counter
* `className`: CSS class name to style the counter


## Example:
```
<>
  <CountUp end={100} duration={2000} />
  <CountUp end={500} duration={2000} />
  <CountUp end={10.5} duration={2000} />
</>
```

![](https://imgur.com/L0KBfDF.gif)
