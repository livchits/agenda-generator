function getGoogleSheetUrl(id) {
  return `https://docs.google.com/spreadsheets/d/e/2PACX-1vTShK5eoDPRlxQHoT8bX6cGSkvS_Ip6iZqsqNtJAU36VOyl1Y2vA7-ARFD7lsd1wYj0rd0DVmuFpdXc/pub?gid=${id}&single=true&output=csv`;
}

export default getGoogleSheetUrl;
