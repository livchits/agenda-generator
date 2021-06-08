import { DAYS } from '../constants';

import getGoogleSheetUrl from './getGoogleSheetUrl';

function getTomorrowCsv() {
  const day = new Date().getDay();
  const csvUrl = getGoogleSheetUrl(DAYS[day + 1]);
  return csvUrl;
}

export default getTomorrowCsv;
