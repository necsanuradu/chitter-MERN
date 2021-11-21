export function timeAgo(prevDate) {
  const diff = parseInt(new Date().getTime() / 1000) - parseInt(prevDate);
  const timeFrames = [
    ["second", 1],
    ["minute", 60],
    ["hour", 60 * 60],
    ["day", 60 * 60 * 24],
    ["year", 60 * 60 * 24 * 365],
  ];
  let returnFrameSince = "just now";
  timeFrames.forEach((frame, index) => {
    let setFrame = Math.round(diff / parseInt(frame[1]));
    if (setFrame > 0) {
      returnFrameSince = `${setFrame} ${frame[0]}${
        setFrame > 1 ? "s" : ""
      } ago`;
    }
  });
  return returnFrameSince;
}
