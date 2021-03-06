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

export function scroolIntoView(e) {
  let el = e.target.parentElement.parentElement.parentElement;
  while(!isElementInViewport(el))
  el.scrollIntoView(true);
}

export function isElementInViewport (el) {

  var rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
}
