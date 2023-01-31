const client = require('../../configs/db.config');

const createUser = async (username, password) => {
  const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *;
  `;
  try {
    const { rows } = await client.query(query, [username, password]);
    return { success: true, message: 'User created successfully', data: rows };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  createUser,
};