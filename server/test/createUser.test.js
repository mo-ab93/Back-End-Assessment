const addUsers = require('../db/queries/addUsers');

describe('createUser', () => {
  it('creates a new user', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const result = await addUsers.createUser(username, password);
    expect(result).toEqual({
      success: true,
      message: 'User created successfully',
      data: [{
        username,
        password,
      }],
    });
  });

  it('fails to create a user with a duplicate username', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    await addUsers.createUser(username, password);
    const result = await addUsers.createUser(username, password);
    expect(result).toEqual({
      success: false,
      message: 'username already exists',
    });
  });
});
