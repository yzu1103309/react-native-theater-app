const timeToSeconds = (seconds) => {
    seconds = seconds.split(',');
    const ms = seconds[1];
    const time = seconds[0].split(':');
    return time[0] && time[1] && time[2]
        ? +time[0] * 60 * 60 + +time[1] * 60 + +time[2] + ms / 1000
        : 0;
};
export default timeToSeconds;
