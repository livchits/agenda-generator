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
    <Activities data={data} formatedDate={formatedDate} hasPresidency={hasPresidency} />
  );
}

Schedule.propTypes = { data: PropTypes.array.isRequired };

export default Schedule;
