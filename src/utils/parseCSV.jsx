import Papa from 'papaparse';

import removeObjectsWithoutActivities from './removeObjectsWithoutActivities';
import sanitizeObject from './sanitizeObject';

function parseCSV(csvUrl, setSchedule) {
  setSchedule((previousSchedule) => ({ ...previousSchedule, status: 'pending' }));
  Papa.parse(csvUrl, {
    download: true,
    header: true,
    dinamicTyping: true,
    skipEmptyLines: true,
    worker: true,
    error: (error) =>
      setSchedule((previousSchedule) => ({
        ...previousSchedule,
        status: 'failed',
        error,
      })),
    complete: ({ data }) => {
      const sanitizedData = data.map(sanitizeObject);
      const filteredData = sanitizedData.filter(removeObjectsWithoutActivities);
      setSchedule((previousSchedule) => ({
        ...previousSchedule,
        status: 'complete',
        data: filteredData,
      }));
    },
  });
}

export default parseCSV;
