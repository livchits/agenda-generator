import { DAYS } from '../constants';

import getGoogleSheetUrl from './getGoogleSheetUrl';

function getTomorrowCsv() {
  const day = new Date().getDay();
  const dayToGet = day >= 0 && day <= 4 ? day : 0;
  const csvUrl = getGoogleSheetUrl(DAYS[dayToGet + 1]);
  return csvUrl;
}

export default getTomorrowCsv;
