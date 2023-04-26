const sendRespone = (res, code, message, httpCode, errors, data) => {
  if (!res) {
    return;
  }

  let out = {};
  out.code = code;
  out.message = message;
  out.data = data;
  out.errors = errors;

  let status = httpCode;
  res.status(status);
  res.contentType('json');
  return res.json(out);
};

module.exports = {
  sendRespone,
};
