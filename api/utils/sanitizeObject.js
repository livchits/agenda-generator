function sanitizeObject(object) {
  const sanitizedObject = {};

  Object.entries(object).forEach(([prop, value]) => {
    if (value) {
      sanitizedObject[prop] = value;
    }
  });

  return sanitizedObject;
}

export default sanitizeObject;
