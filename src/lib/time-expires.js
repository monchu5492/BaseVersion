
const second = 1000,
  minute = 60 * second,
  hour = 60 * minute,
  day = 24 * hour,
  timeframe = {
    second, minute, hour, day,
  },
  breakpoints = {
    second: 60,
    minute: 60,
    hour: 24,
    day: 30,
  };

const toDate = timeStampString => new Date(timeStampString);

const getDiff = (timestamp, now) => toDate(now) - toDate(timestamp);

const isUnderTime = (diff, timeframe, time) => diff / timeframe < time;

const diffOverTimeframe = (diff, timeframe) => Math.floor(diff / timeframe);

const printResult = (result, timeframeName) =>
  `${result} ${timeframeName + ((result > 1) ? 's' : '')}`;

const checkDate = (diff, timeframeName, underTime, timeframe) =>
  ((isUnderTime(diff, timeframe[timeframeName], underTime)) ?
    printResult(diffOverTimeframe(diff, timeframe[timeframeName]), timeframeName) :
    null);
const lessThanAMinute = timeString =>
  ((timeString.match(/seconds/)) ?
    'less than a minute' :
    `${timeString} ago`);

const _checkNext = (result, callback) =>
  ((result) ?
    lessThanAMinute(result) :
    callback());

const checkNext = ([tfName, ...rest], timeframe, timestamp, now) =>
  _checkNext(
    checkDate(getDiff(timestamp, now), tfName, breakpoints[tfName], timeframe),
    () => howLongAgo(rest, timeframe, timestamp, now),
  );

const printFullDate = dateTime =>
  `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`;

const howLongAgo = (remainingTimeframe, timeframe, timestamp, now) =>
  ((!remainingTimeframe.length) ?
    printFullDate(toDate(timestamp)) :
    checkNext(remainingTimeframe, timeframe, timestamp, now));

export const ago = (timestamp, now = new Date().toString()) =>
  howLongAgo(Object.keys(timeframe), timeframe, timestamp, now);

export function testState(expires) {
  // const testCommand = tourney;
  // const prettyPrint = JSON.stringify(expires);
  // alert(`TestCommand tournament_id ${tournament.tournament_id} expires =>  ${prettyPrint} :: ${expires}`);
  const expireDate = new Date(`${expires}`);
  // alert(`Expires ${expires} and the expireDate => ${expireDate}`);


  // if (typeof testCommand !== 'object') {
  // alert(`TestCommand not an object ${testCommand}`);

  // const expireDate = new Date(`"${expireTime}"`);
  // const expireDate = new Date('2019-11-05T23:00:00');

  // if (expireDate) {
  // set the date we are counting down to
  // var expireDate = new Date("2019-11-05T23:00:00");
  // alert(`Expired time ${expireTime}`);
  // update the countdown every 1 second
  const x = setInterval(() => {
    const now = new Date();

    // alert(`expireTime ${expireDate} and now ${now}`)
    // Find the distance between now and the countdown date
    const distance = Math.abs(expireDate - now);
    // alert(`Distance => ${distance}`);

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance > 0) {
      // alert(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      return (`Expires: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    } else if (distance < 0) {
      clearInterval(x);
      // alert('EXPIRED');
      return ('EXPIRED');
    }
  }, 1000);
  // }
  // }
}
