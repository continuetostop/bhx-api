const sendRespone = (res, code, message, httpCode, errors, data) => {
  if (!res) {
    return;
  }

  let status = httpCode;
  res.status(status);
  res.contentType('json');

  // if (process.env.NODE_ENV === 'production') {
  //   return res.json(data);
  // }

  let out = {};
  out.code = code;
  out.message = message;
  out.data = data;
  out.errors = errors;

  return res.json(out);
};

module.exports = {
  sendRespone,
};
