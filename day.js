function getDate() {
  const options = {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric",
  };
  const day = new Date();
  const today = day.toLocaleTimeString("en-US", options);
  return today;
}

const getDay = () => {
  const options = {
    day: "numeric",
  };
  const day = new Date();
  const today = day.toLocaleTimeString("en-US", options);
  return today;
};

exports.getDate = getDate();
exports.getDay = getDay();
