const client = require('../../configs/db.config');

const getUser = async (username) => {
  const query = `
    SELECT * FROM users
    WHERE username = $1;
  `;
  try {
    const { rows } = await client.query(query, [username]);
    return { success: true, message: 'User retrieved successfully', data: rows };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  getUser,
};
