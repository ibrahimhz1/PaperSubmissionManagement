export function notFoundHandler(req, res, next) {
  res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
}
