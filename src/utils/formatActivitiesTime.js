const replaceTwoDots = (hourString) => hourString.replace(':', '.');

function formatActivitiesTime(scheduleTuplesArray) {
  const formatedActivities = scheduleTuplesArray.map(([time, activity], index) => {
    return index ? [replaceTwoDots(time), activity] : [time, activity];
  });

  return formatedActivities;
}

export default formatActivitiesTime;
