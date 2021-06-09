const Papa = require('papaparse');
const axios = require('axios');

const { default: sanitizeObject } = require('../src/utils/sanitizeObject');

const {
  default: removeObjectsWithoutActivities,
} = require('./utils/removeObjectsWithoutActivities');
const { default: getTomorrowCsv } = require('./utils/getTomorrowCsv');

module.exports = (req, res) => {
  const csvUrl = req.body || getTomorrowCsv();

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
          res.json({ data: filteredData });
        },
      });
    });
};