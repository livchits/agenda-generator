import * as React from 'react';
import PropTypes from 'prop-types';

import DependencyActivities from './DependencyActivities';

function Activities({ hasPresidency, formatedDate, data }) {
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

Activities.propTypes = {
  hasPresidency: PropTypes.bool,
  formatedDate: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default Activities;
