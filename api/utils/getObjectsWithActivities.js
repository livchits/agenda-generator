function getObjectsWithActivities(dependencyObject) {
  return Object.keys(dependencyObject).length > 1;
}

export default getObjectsWithActivities;
