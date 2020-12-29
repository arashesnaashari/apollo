import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/fa";

TimeAgo.addLocale(en);
const GG = () => {
  const timeAgo = new TimeAgo("fa");

  console.log(timeAgo.format(1606316108563))
  return <h1>ss</h1>;
};

export default GG;
