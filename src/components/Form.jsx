import * as React from 'react';

function Form() {
  return (
    <form className='my-8 text-center'>
      <div className='mx-auto w-5/6 text-left'>
        <label className='ml-2 text-indigo-300 ' htmlFor='csv-url'>Ingrese la url del archivo</label>
        <input
          className='bg-indigo-900 border-2 border-emerald-500 p-1.5 rounded-lg leading-relaxed text-indigo-200 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent focus:ring-offset-1 focus:ring-offset-transparent'
          id='csv-url'
          name='csv-url'
          type='text'
        />
      </div>
      <button className='bg-emerald-500 text-indigo-50 font-bold py-4 px-8 rounded-full my-6 text-xl text-center hover:bg-emerald-600 hover:text-indigo-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-indigo-900 focus:ring-offset-2' type='submit'>Generar agenda</button>
    </form>
  );
}

export default Form;
