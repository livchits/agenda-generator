import * as React from 'react';
import PropTypes from 'prop-types';

import DependencyActivities from './DependencyActivities';

function Schedule({ data }) {
  return (
    <section>
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
