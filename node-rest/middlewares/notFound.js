const notFound = (req, res) => {
  return res.json({ msg: 'Could not find the resource you are looking for' });
};
module.exports = notFound;
