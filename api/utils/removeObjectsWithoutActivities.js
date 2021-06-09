function removeObjectsWithoutActivities(dependencyObject) {
  return Object.keys(dependencyObject).length > 1;
}

export default removeObjectsWithoutActivities;
