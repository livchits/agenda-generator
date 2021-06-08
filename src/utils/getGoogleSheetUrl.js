import { URL, SUFIX } from '../constants';

function getGoogleSheetUrl(id) {
  return `${URL}${id}${SUFIX}`;
}

export default getGoogleSheetUrl;
