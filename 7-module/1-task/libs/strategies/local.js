const LocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User');

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    function(email, password, done) {
      User.findOne({email})
          .then((user) => {
            if (!user) {
              return done(null, false, 'Нет такого пользователя');
            }

            user.checkPassword(password)
                .then((isValidPassword) => {
                  if (!isValidPassword) {
                    return done(null, false, 'Неверный пароль');
                  }

                  return done(null, user);
                });
          })
          .catch((err) => {
            done(err);
          });
    }
);
