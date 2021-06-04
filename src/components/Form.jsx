import * as React from 'react';
import PropTypes from 'prop-types';
import Papa from 'papaparse';

import sanitizeObject from '../utils/sanitizeObject';

function Form({ setSchedule }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const { value: csvUrl } = event.target.elements['csv-url'];

    Papa.parse(csvUrl, {
      download: true,
      header: true,
      dinamicTyping: true,
      skipEmptyLines: true,
      worker: true,
      complete: ({ data }) => {
        setSchedule((previousSchedule) => ({ ...previousSchedule, status: 'pending' }));
        const sanitizedData = data.map(sanitizeObject);
        setSchedule((previousSchedule) => ({
          ...previousSchedule,
          status: 'complete',
          data: sanitizedData,
        }));
      },
    });
  };

  return (
    <form className='my-8 text-center' onSubmit={handleSubmit}>
      <div className='mx-auto w-5/6 text-left'>
        <label className='ml-2 text-indigo-300 ' htmlFor='csv-url'>
          Ingrese la url del archivo .csv
        </label>
        <input
          required
          className='p-1.5 mt-1 w-full leading-relaxed text-indigo-200 bg-indigo-900 rounded-lg border-2 border-emerald-500 focus:border-transparent focus:ring-2 focus:ring-emerald-600 focus:ring-offset-1 focus:ring-offset-transparent focus:outline-none'
          id='csv-url'
          name='csv-url'
          type='text'
        />
      </div>
      <button
        className='py-4 px-8 my-6 text-xl font-bold text-center text-indigo-50 hover:text-indigo-100 bg-emerald-500 hover:bg-emerald-600 rounded-full focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-indigo-900 transition-colors duration-200 focus:outline-none'
        type='submit'
      >
        Generar agenda
      </button>
    </form>
  );
}

Form.propTypes = { setSchedule: PropTypes.func.isRequired };

export default Form;
