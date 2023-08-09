export function setIntervalX(
  callback: () => void,
  delay: number,
  repetitions: number,
) {
  let x = 0;
  const intervalID = setInterval(() => {
    callback();

    if (++x === repetitions) {
      window.clearInterval(intervalID);
    }
  }, delay);
}
