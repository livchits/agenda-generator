import * as React from 'react';
import PropTypes from 'prop-types';

import getFormatedDate from '../utils/getFormatedDate';

import DependencyActivities from './DependencyActivities';

function Schedule({ data }) {
  const hasPresidency = data.find(
    (depencyData) => depencyData['Organismo'] === 'Presidencia'
  );
  const formatedDate = getFormatedDate();

  return (
    <section className='flex-1 p-10 bg-yellow-100 rounded-xl'>
      <p className='text-2xl font-bold text-center'>
        <strong>
          Agenda de {hasPresidency ? 'Presidencia y ' : null} Ministerios del{' '}
          {formatedDate}
        </strong>
      </p>
      <ul>
        {data.map((dependencySchedule) => {
          const dependencyName = dependencySchedule['Organismo'];
          return (
            <DependencyActivities
              key={dependencyName}
              dependencySchedule={dependencySchedule}
            />
          );
        })}
      </ul>
    </section>
  );
}

Schedule.propTypes = { data: PropTypes.array.isRequired };

export default Schedule;
