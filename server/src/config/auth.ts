export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default-key',
    expiresIn: '1d',
  },
};
