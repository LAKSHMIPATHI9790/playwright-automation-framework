// Public demo credentials published on https://www.saucedemo.com
const PASSWORD = process.env.SAUCE_PASSWORD || 'secret_sauce';

const users = {
  standard: { username: 'standard_user', password: PASSWORD },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  problem: { username: 'problem_user', password: PASSWORD },
  performanceGlitch: { username: 'performance_glitch_user', password: PASSWORD },
};

const invalidLogins = [
  {
    title: 'locked out user',
    username: users.lockedOut.username,
    password: PASSWORD,
    error: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    title: 'wrong password',
    username: users.standard.username,
    password: 'wrong_password',
    error: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    title: 'empty username',
    username: '',
    password: PASSWORD,
    error: 'Epic sadface: Username is required',
  },
  {
    title: 'empty password',
    username: users.standard.username,
    password: '',
    error: 'Epic sadface: Password is required',
  },
];

module.exports = { users, invalidLogins };
