const client = require('../../configs/db.config');


const createTweet = async (content) => {
  const query = `
    INSERT INTO tweets (content)
    VALUES ($1)
    RETURNING *;
  `;
  try {
    const { rows } = await client.query(query, [content]);
    return { success: true, message: 'Tweet created successfully', data: rows };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getAllTweets = async () => {
  const query = `
    SELECT *
    FROM tweets;
  `;
  try {
    const { rows } = await client.query(query);
    return { success: true, data: rows };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const updateTweet = async (id, content) => {
  const query = `
    UPDATE tweets
    SET content = $2
    WHERE id = $1
    RETURNING *;
  `;
  try {
    const { rows } = await client.query(query, [id, content]);
    return { success: true, message: 'Tweet updated successfully', data: rows };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const deleteTweet = async (id) => {
  const query = `
    DELETE FROM tweets
    WHERE id = $1;
  `;
  try {
    await client.query(query, [id]);
    return { success: true, message: 'Tweet deleted successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  createTweet,
  getAllTweets,
  updateTweet,
  deleteTweet,
};
