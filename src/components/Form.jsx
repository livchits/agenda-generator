import * as React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Rolling } from '../assets/rolling.svg';
import getTomorrowCsv from '../../api/utils/getTomorrowCsv';

function Form({ setSchedule, status }) {
  const [enableCustomUrl, setEnableCustomUrl] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const csvUrl = enableCustomUrl
      ? event.target.elements['csv-url'].value
      : getTomorrowCsv();

    parseCSV(csvUrl, setSchedule);
  };

  const handleCheckBoxChange = () => {
    setEnableCustomUrl((enableCustomUrl) => !enableCustomUrl);
  };

  const inputStyle = enableCustomUrl
    ? 'bg-indigo-900 border-emerald-500'
    : 'bg-gray-300 border-gray-400';

  return (
    <form className='my-8 text-center' onSubmit={handleSubmit}>
      <div className='mx-auto w-5/6 sm:w-max text-left'>
        <div className='flex relative items-center mr-4 mb-2'>
          <label className='mx-2 text-indigo-300' htmlFor='custom-url'>
            Usar url personalizada para el archivo .csv
          </label>
          <input
            checked={enableCustomUrl}
            className='absolute right-1 w-8 h-8 opacity-0'
            id='custom-url'
            name='custom-url'
            type='checkbox'
            onChange={handleCheckBoxChange}
          />
          <div className='flex flex-shrink-0 justify-center items-center mr-2 w-5 h-5 text-emerald-600 bg-indigo-100 rounded-md border-2 border-emerald-400 focus-within:border-emerald-600'>
            <svg
              className='hidden w-3 h-3 pointer-events-none'
              version='1.1'
              viewBox='0 0 17 12'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g fill='none' fillRule='evenodd'>
                <g fill='#059669' fillRule='nonzero' transform='translate(-9 -11)'>
                  <path d='m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z' />
                </g>
              </g>
            </svg>
          </div>
        </div>
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
