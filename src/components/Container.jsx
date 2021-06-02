import * as React from 'react';
import PropTypes from 'prop-types';

function Container({ children }) {
  return (
    <div className='flex flex-col justify-between min-h-screen bg-indigo-900 font-inter'>
      {children}
    </div>
  );
}

Container.propTypes = { children: PropTypes.node };

export default Container;
