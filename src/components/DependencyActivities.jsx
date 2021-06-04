import * as React from 'react';
import PropTypes from 'prop-types';

import formatActivitiesTime from '../utils/formatActivitiesTime';
import sortByTime from '../utils/sortByTime';

function DependencyActivities({ dependencySchedule, whatsapp }) {
  const scheduleTuples = Object.entries(dependencySchedule);
  const activitesWithTimeFormated = formatActivitiesTime(scheduleTuples);
  const sortedActivites = [...activitesWithTimeFormated.sort(sortByTime)];
  const dependencyName = scheduleTuples[0][1];

  return (
    <li>
      <br />
      <p className='font-bold'>
        <strong className='underline'>
          {whatsapp && '*'}
          {dependencyName}:{whatsapp && '*'}
        </strong>
      </p>
      <br />
      {sortedActivites.map(([time, activity]) => {
        if (activity !== dependencyName) {
          return (
            <div key={activity}>
              <p>
                <strong>
                  {whatsapp && time && '*'}
                  {time}
                  {time ? ':' : ''}
                  {whatsapp && time && '*'}
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

DependencyActivities.propTypes = {
  dependencySchedule: PropTypes.object.isRequired,
  whatsapp: PropTypes.bool.isRequired,
};

export default DependencyActivities;
