import * as React from 'react';
import PropTypes from 'prop-types';

import DependencyActivities from './DependencyActivities';

function Activities({ hasPresidency, formatedDate, data, whatsapp }) {
  return (
    <article>
      <p className='text-2xl font-bold text-center'>
        <strong>
          {whatsapp && '*🗓'}
          Agenda de {hasPresidency ? 'Presidencia y ' : null} Ministerios del{' '}
          {formatedDate}
          {whatsapp && '*'}
        </strong>
      </p>
      <ul>
        {data.map((dependencySchedule) => {
          const dependencyName = dependencySchedule['Organismo'];
          return (
            <DependencyActivities
              key={dependencyName}
              dependencySchedule={dependencySchedule}
              whatsapp={whatsapp}
            />
          );
        })}
      </ul>
    </article>
  );
}

Activities.propTypes = {
  hasPresidency: PropTypes.bool,
  formatedDate: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  whatsapp: PropTypes.bool.isRequired,
};

export default Activities;
