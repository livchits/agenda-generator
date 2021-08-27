import axios from 'axios';
import Papa from 'papaparse';

import getTomorrowCsv from './utils/getTomorrowCsv';
import removeObjectsWithoutActivities from './utils/removeObjectsWithoutActivities';
import sanitizeObject from './utils/sanitizeObject';

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
          const sanitizedData = data.map(sanitizeObject);
          const filteredData = sanitizedData.filter(removeObjectsWithoutActivities);
          res.json(filteredData);
        },
      });
    });
};
