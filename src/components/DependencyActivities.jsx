import * as React from 'react';
import PropTypes from 'prop-types';

function DependencyActivities({ dependencySchedule }) {
  const scheduleTuples = Object.entries(dependencySchedule);
  const dependencyName = scheduleTuples[0][1];

  return (
    <li>
      <h2>{dependencyName}:</h2>
      {scheduleTuples.map(([time, activity]) => {
        if (activity !== dependencyName) {
          return (
            <p key={activity}>
              {time}
              {time ? ':' : null} {activity}
            </p>
          );
        }
      })}
    </li>
  );
}

DependencyActivities.propTypes = { dependencySchedule: PropTypes.object.isRequired };

export default DependencyActivities;
