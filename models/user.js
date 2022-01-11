module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Nome deve ser preenchido'
        }
      }
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
      unique: {
        args: true,
        msg: 'Email já cadastrado em nossa base de dados'
      },
      validate: {
        notEmpty: {
          msg: 'Email deve ser preenchido'
        },
        isEmail: {
          msg: 'Digite um email válido'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [7, 25],
          msg: 'Senha deve conter entre 7 a 25 caracteres'
        }
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true
  });

  User.associate = function (models) {
    User.hasMany(models.Session, {
      as: 'Sessions',
      foreignKey: {
        allowNull: false
      }
    });

  }
  return User;
};
