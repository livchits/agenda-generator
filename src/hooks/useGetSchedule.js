import axios from 'axios';
import * as React from 'react';

function useGetSchedule() {
  const [{ data, error, status }, setSchedule] = React.useState({
    data: null,
    error: null,
    status: 'idle',
  });
  const [{ getScheduleEnable, csvUrl }, setCsvUrl] = React.useState({
    getScheduleEnable: false,
    csvUrl: null,
  });

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    if (getScheduleEnable) {
      setSchedule(() => ({
        status: 'pending',
        data: null,
      }));

      axios
        .get('/api', { cancelToken: source.token, params: { csvUrl } })
        .then(({ data }) => {
          setSchedule(() => ({
            data,
            status: 'complete',
          }));
        })
        .catch((error) => setSchedule({ error: error.message, status: 'complete' }))
        .finally(() => setCsvUrl({ getScheduleEnable: false, csvUrl: null }));
    }

    return () => source.cancel();
  }, [csvUrl, getScheduleEnable]);

  return { data, error, status, setCsvUrl };
}

export default useGetSchedule;
