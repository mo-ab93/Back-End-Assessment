const router = require('express').Router();
const addUsers = require('../db/queries/addUsers');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const { success, message } = await addUsers.createUser(username, password);
  if (success) {
    res.status(201).json({ message });
  } else {
    res.status(400).json({ message });
  }
});

module.exports = router;