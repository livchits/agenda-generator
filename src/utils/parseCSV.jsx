import Papa from 'papaparse';

import sanitizeObject from './sanitizeObject';

function parseCSV(csvUrl, setState) {
  Papa.parse(csvUrl, {
    download: true,
    header: true,
    dinamicTyping: true,
    skipEmptyLines: true,
    worker: true,
    complete: ({ data }) => {
      setState((previousSchedule) => ({ ...previousSchedule, status: 'pending' }));
      const sanitizedData = data.map(sanitizeObject);
      setState((previousSchedule) => ({
        ...previousSchedule,
        status: 'complete',
        data: sanitizedData,
      }));
    },
  });
}

export default parseCSV;
