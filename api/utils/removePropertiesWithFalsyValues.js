function removePropertiesWithFalsyValues(object) {
  const sanitizedObject = {};

  for (const prop in object) {
    if (object[prop]) {
      sanitizedObject[prop] = object[prop];
    }
  }

  return sanitizedObject;
}

export default removePropertiesWithFalsyValues;
