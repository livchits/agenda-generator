import * as React from 'react';
import PropTypes from 'prop-types';

function Container({ children }) {
  return (
    <div className='flex flex-col justify-between px-2 mx-auto max-w-3xl min-h-screen font-inter'>
      {children}
    </div>
  );
}

Container.propTypes = { children: PropTypes.node };

export default Container;
