const monday = process.env.MONDAY_ID;
const tuesday = process.env.TUESDAY_ID;
const wednesday = process.env.WEDNESDAY_ID;
const thursday = process.env.THURSDAY_ID;
const friday = process.env.FRIDAY_ID;
const URL = process.env.SHEET_URL;
const SUFIX = process.env.SHEET_SUFIX;

const DAYS = { 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday };

export { DAYS, URL, SUFIX };
