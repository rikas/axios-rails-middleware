const addFormDataValue = (formData, currentKey, value) => {
  if (value === null || value === undefined) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((element) => (addFormDataValue(formData, `${currentKey}[]`, element)));
  } else if (!(value instanceof File) && typeof value === 'object') {
    Object.entries(value).forEach(([key, innerValue]) => {
      addFormDataValue(formData, `${currentKey}[${key}]`, innerValue);
    });
  } else {
    formData.append(currentKey, value);
  }
};

/**
 * Converts standart Javascript objects to form data.
 * Example:
 * user: {
 *   name: 'smartapp',
 *   avatar: File(...),
 *   tags: [1, 2, 3],
 *   roles: [
 *     { id: 1, name: 'admin' },
 *     { id: 2, name: 'owner' }
 *   ],
 *   country: { prefix: 351, name: 'Portugal' }
 * }
 *
 * will be converted to:
 * user[name]=smartapp
 * user[avatar]=File(...)
 * user[tags][]=1
 * user[tags][]=2
 * user[tags][]=3
 * user[roles][][id]=1
 * user[roles][][name]=admin
 * user[roles][][id]=2
 * user[roles][][name]=owner
 * user[country][prefix]=351
 * user[country][name]=Portugal
 */
const objectToFormData = (params) => {
  const formData = new FormData();

  Object.entries(params).forEach(([key, value]) => {
    addFormDataValue(formData, key, value);
  });

  return formData;
};

// hasFiles(data)
const hasFiles = (params) => {
  const result = [];

  Object.values(params).forEach((value) => {
    // if the value is an array, checks if has file for every entry
    if (Array.isArray(value)) {
      const arr = value.map((element) => hasFiles(element));
      result.push(arr.indexOf(true) >= 0);
    // if the value is an instance of file, push true
    } else if (value instanceof File) {
      result.push(true);
    // if the value is empty, push false
    } else if (!value) {
      result.push(false);
    // if the value is an object, call `hasFiles` for that object
    } else if (typeof value === 'object') {
      result.push(hasFiles(value));
    }

    result.push(false);
  });

  return result.indexOf(true) >= 0;
};

export default {
  objectToFormData,
  hasFiles
};
