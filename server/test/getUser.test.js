const addUsers = require('../db/queries/addUsers');
const getUser = require('../db/queries/getUser');

describe('getUser', () => {
  beforeAll(async () => {
    await addUsers.createUser('testuser', 'testpassword');
  });

  it('gets a user by username', async () => {
    const username = 'testuser';
    const result = await getUser.getUser(username);
    expect(result).toEqual({
      success: true,
      message: 'User found',
      data: [{
        username,
        password: 'testpassword',
      }],
    });
  });

  it('fails to get a user with a non-existent username', async () => {
    const username = 'nonexistentuser';
    const result = await getUser.getUser(username);
    expect(result).toEqual({
      success: false,
      message: 'User not found',
    });
  });
});
