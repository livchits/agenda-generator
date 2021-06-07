import * as React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Rolling } from '../assets/rolling.svg';
import parseCSV from '../utils/parseCSV';
import getTomorrowCsv from '../utils/getTomorrowCsv';

function Form({ setSchedule, status }) {
  const [enableCustomUrl, setEnableCustomUrl] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const csvUrl = enableCustomUrl
      ? event.target.elements['csv-url'].value
      : getTomorrowCsv();
    console.log(csvUrl);
    parseCSV(csvUrl, setSchedule);
  };

  const handleCheckBoxChange = () => {
    setEnableCustomUrl((enableCustomUrl) => !enableCustomUrl);
  };

  const inputStyle = enableCustomUrl
    ? 'bg-indigo-900 border-emerald-500'
    : 'bg-gray-400 border-gray-400';

  return (
    <form className='my-8 text-center' onSubmit={handleSubmit}>
      <div className='mx-auto w-5/6 text-left'>
        <label className='ml-2 text-indigo-300' htmlFor='custom-url'>
          Usar url personalizada para el archivo .csv
        </label>
        <input
          checked={enableCustomUrl}
          id='custom-url'
          name='custom-url'
          type='checkbox'
          onChange={handleCheckBoxChange}
        />
        <input
          required
          className={`${inputStyle} p-1.5 mt-1 w-full leading-relaxed text-indigo-200  rounded-lg border-2  focus:border-transparent focus:ring-2 focus:ring-emerald-600 focus:ring-offset-1 focus:ring-offset-transparent focus:outline-none`}
          disabled={!enableCustomUrl}
          id='csv-url'
          name='csv-url'
          type='text'
        />
      </div>
      <button
        className='py-4 px-8 my-6 w-56 h-16 text-xl font-bold text-center text-indigo-50 hover:text-indigo-100 bg-emerald-500 hover:bg-emerald-600 rounded-full focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-indigo-900 transition-colors duration-200 focus:outline-none'
        type='submit'
      >
        {status === 'pending' ? <Rolling /> : 'Generar agenda'}
      </button>
    </form>
  );
}

Form.propTypes = {
  setSchedule: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default Form;
