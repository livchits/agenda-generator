import * as React from 'react';
import PropTypes from 'prop-types';

import getFormatedDate from '../utils/getFormatedDate';

import Activities from './Activities';

function Schedule({ data }) {
  const hasPresidency = data.find(
    (depencyData) => depencyData['Organismo'] === 'Presidencia'
  );
  const formatedDate = getFormatedDate();

  return (
    <section className='flex-1 p-10 bg-yellow-100 rounded-xl'>
      <Activities
        data={data}
        formatedDate={formatedDate}
        hasPresidency={hasPresidency}
        whatsapp={false}
      />
      <hr className='py-6' />
      <Activities
        data={data}
        formatedDate={formatedDate}
        hasPresidency={hasPresidency}
        whatsapp={true}
      />
    </section>
  );
}

Schedule.propTypes = { data: PropTypes.array.isRequired };

export default Schedule;
