import axios from 'axios';
import Papa from 'papaparse';

import getTomorrowCsv from './utils/getTomorrowCsv';
import getObjectsWithActivities from './utils/getObjectsWithActivities';
import removePropertiesWithFalsyValues from './utils/removePropertiesWithFalsyValues';

module.exports = (req, res) => {
  const csvUrl = req.query?.csvUrl || getTomorrowCsv();

  axios
    .get(csvUrl, {
      responseType: 'blob',
    })
    .then((response) => {
      Papa.parse(response.data, {
        header: true,
        dinamicTyping: true,
        skipEmptyLines: true,
        worker: true,
        error: (error) => error.message,
        complete: ({ data }) => {
          const sanitizedData = data.map(removePropertiesWithFalsyValues);
          const filteredData = sanitizedData.filter(getObjectsWithActivities);
          res.json(filteredData);
        },
      });
    });
};
