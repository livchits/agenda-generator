import * as React from 'react';
import PropTypes from 'prop-types';

function Schedule({ data }) {
  return (
    <section>
      <ul>
        {data.map((dependencySchedule) => {
          const scheduleTuples = Object.entries(dependencySchedule);
          const dependencyName = scheduleTuples[0][1];
          return (
            <li key={dependencyName}>
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
        })}
      </ul>
    </section>
  );
}

Schedule.propTypes = { data: PropTypes.array.isRequired };

export default Schedule;
