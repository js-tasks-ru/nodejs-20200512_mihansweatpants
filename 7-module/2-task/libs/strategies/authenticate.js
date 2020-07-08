const User = require('../../models/User');

module.exports = function authenticate(strategy, email, displayName, done) {
  if (!email) {
    done(null, false, 'Не указан email');
  }

  User.findOne({email})
      .then((user) => {
        if (!user) {
          return User.create({email, displayName}).then((newUser) => done(null, newUser));
        }

        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
};
