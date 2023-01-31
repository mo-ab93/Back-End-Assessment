const router = require('express').Router();

const { createTweet, getAllTweets, updateTweet, deleteTweet } = require('../db/queries/tweets');

router.get('/', async (req, res) => {
  const { success, data, message } = await getAllTweets();
  if (success) {
    res.send(data);
  } else {
    res.status(400).send({ message });
  }
});

router.post('/', async (req, res) => {
  const { content } = req.body;
  const { success, data, message } = await createTweet(content);
  if (success) {
    res.send(data[0]);
  } else {
    res.status(400).send({ message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const { success, data, message } = await updateTweet(id, content);
  if (success) {
    res.send(data[0]);
  } else {
    res.status(400).send({ message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { success, message } = await deleteTweet(id);
  if (success) {
    res.sendStatus(204);
  } else {
    res.status(400).send({ message });
  }
});

module.exports = router;
