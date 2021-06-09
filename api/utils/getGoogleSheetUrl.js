import { URL, SUFIX } from '../constants';
// const { SUFIX } = require('../constants');
// const { URL } = require('../constants');

function getGoogleSheetUrl(id) {
  return `${URL}${id}${SUFIX}`;
}

export default getGoogleSheetUrl;
