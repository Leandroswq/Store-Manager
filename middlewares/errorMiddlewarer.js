const errorMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'NotFound': return res.status(404).json(message);
    default: return res.status(500).send();
  }
};

module.exports = errorMiddleware;