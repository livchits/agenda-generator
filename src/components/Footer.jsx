import * as React from 'react';

function Footer() {
  return (
    <footer className='py-3 my-3 mx-auto w-3/4 text-center text-indigo-100 bg-indigo-800 bg-opacity-95 rounded-2xl'>
      Creado por{' '}
      <a className='hover:text-indigo-300' href='https://github.com/livchits'>
        Lucas Livchits
      </a>
    </footer>
  );
}

export default Footer;
