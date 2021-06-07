const { VITE_MONDAY_ID: monday } = import.meta.env;
const { VITE_TUESDAY_ID: tuesday } = import.meta.env;
const { VITE_WEDNESDAY_ID: wednesday } = import.meta.env;
const { VITE_THURSDAY_ID: thursday } = import.meta.env;
const { VITE_FRIDAY_ID: friday } = import.meta.env;

const DAYS = { 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday };

export { DAYS };
