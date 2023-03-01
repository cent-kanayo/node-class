const authorizeUser = (request, response, next) => {
  const query = request?.query;
  if (!query.apiKey) {
    return response.json({ message: 'No api key provided' });
  }
  if (query.apiKey !== 'my-api-key') {
    return response.json({ message: 'Invalid api key' });
  }
  if (query.apiKey === 'my-api-key') {
    return next();
  }
};

module.exports = authorizeUser;
