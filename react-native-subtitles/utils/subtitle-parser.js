import axios from 'axios';
import vttToJson from 'vtt-to-json';
const { default: srtParser2 } = require('srt-parser-2');
import timeToSeconds from './time-to-seconds';
const subtitleParser = async (subitleUrl) => {
    const { data: subtitleData } = await axios.get(subitleUrl);
    const subtitleType = subitleUrl.split('.')[subitleUrl.split('.').length - 1];
    const result = [];
    if (subtitleType === 'srt') {
        const parser = new srtParser2();
        const parsedSubtitle = parser.fromSrt(subtitleData);
        parsedSubtitle.forEach(({ startTime, endTime, text }) => {
            result.push({
                start: timeToSeconds(startTime),
                end: timeToSeconds(endTime),
                part: text,
            });
        });
    }
    if (subtitleType === 'vtt') {
        const parsedSubtitle = await vttToJson(subtitleData);
        parsedSubtitle.forEach(({ start, end, part }) => {
            // For some reason this library adds the index of the subtitle at the end of the part, so we cut it
            result.push({
                start: start / 1000,
                end: end / 1000,
                part: part.slice(0, part.length - part.split(' ')[part.split(' ').length - 1].length),
            });
        });
    }
    return result;
};
export default subtitleParser;
