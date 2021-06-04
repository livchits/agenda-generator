import * as React from 'react';
import PropTypes from 'prop-types';

import formatActivitiesTime from '../utils/formatActivitiesTime';

function DependencyActivities({ dependencySchedule }) {
  const scheduleTuples = Object.entries(dependencySchedule);
  const activitesWithTimeFormated = formatActivitiesTime(scheduleTuples);
  const dependencyName = scheduleTuples[0][1];

  return (
    <li>
      <br />
      <p className='font-bold'>
        <strong className='underline'>{dependencyName}:</strong>
      </p>
      <br />
      {activitesWithTimeFormated.map(([time, activity]) => {
        if (activity !== dependencyName) {
          return (
            <div key={activity}>
              <p>
                <strong>
                  {time}
                  {time ? ':' : null}
                </strong>{' '}
                {activity}
              </p>
              <br />
            </div>
          );
        }
      })}
    </li>
  );
}

DependencyActivities.propTypes = { dependencySchedule: PropTypes.object.isRequired };

export default DependencyActivities;
