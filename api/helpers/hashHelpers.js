const bcrypt = require('bcryptjs');

const createHash = pass => {
  return new Promise(resolve => {
    bcrypt.genSalt(10, async (err, salt) => {
      if (!err) {
        bcrypt.hash(pass, salt, async (err, hash) => {
          if (!err) {
            resolve(hash);
          }
        });
      }
    });
  });
};

const validPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  createHash,
  validPassword,
};
