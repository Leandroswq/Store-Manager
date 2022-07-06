const errorMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;

  switch (name) {
    case 'NotFound': return res.status(404).json({ message });
    case 'BadRequest': return res.status(400).json({ message });
    case 'UnprocessableEntity': return res.status(422).json({ message });
    default:console.log(message); return res.status(500).send();
  }
};

module.exports = errorMiddleware;