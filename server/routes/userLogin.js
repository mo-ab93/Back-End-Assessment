const router = require('express').Router();
const getUser = require('../db/queries/getUser');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const { success, message, data } = await getUser.getUser(username);
  if (!success) {
    res.status(400).json({ message });
    return;
  }
  const [user] = data;
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(400).json({ message: 'Incorrect username or password' });
    return;
  }
  req.session.user = user;
  res.status(200).json({ message: 'Login successful' });
});

module.exports = router;
