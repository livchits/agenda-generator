const originalKeyNameIsAString = (key) => Number.isNaN(parseInt(key));

function getDependencyName(dependencySchedule) {
  const dependencyKey = Object.keys(dependencySchedule).filter(originalKeyNameIsAString);
  const dependencyName = dependencySchedule[dependencyKey];
  return dependencyName;
}

export default getDependencyName;
