import Timeago from "react-timeago";

const timeifyDate = date => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  date = typeof new Date() !== typeof date ? new Date(date) : date;
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const time = `${(date.getHours() + 24) % 12 || 12}:${minutes}`;

  if (date.getTime() < Date.now() - 31536000000) {
    return `${
      months[date.getUTCMonth()]
    } ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  } else if (date.getTime() < Date.now() - 604800000) {
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
  } else if (date.getTime() < Date.now() - 86400000) {
    return days[date.getDay()];
  } else if (date.getTime() < Date.now() - 43200000) {
    return <Timeago date={date} />;
  } else {
    return date.getHours() < 12 ? `${time} am` : `${time} pm`;
  }
};

export default timeifyDate;
