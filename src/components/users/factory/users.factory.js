
// const Users = require('../models/users');

const getUsers = (req, res) => {
  console.log('REQ QUERY => ', req.query);
  // let a, b, c;
  // a = Users.find();
  // b = Users.find();
  // c = a + b;
  // console.log('RESULT ==> ', c);
  res.status(200).json({ message: 'Products Connected!' });
};

module.exports = {
  getUsers,
}
