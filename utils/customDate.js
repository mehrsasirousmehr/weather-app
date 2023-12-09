const DAYS = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];

// show forecast weather
const getWeekDay = (date) => {
    return DAYS[new Date(date * 1000).getDay()];
};

export { getWeekDay };
