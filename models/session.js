module.exports = function (sequelize, DataTypes) {
  let Session = sequelize.define('Session', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    tokensession: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Token sessão não preenchido'
        }
      }
    },
    tokenpush: {
      type: DataTypes.STRING,
      allowNull: true
    },
    typedevicepush: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: {
          msg: 'Tipo do aparelho não preenchido'
        }
      }
    },
    badge: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    freezeTableName: true
  });
  Session.associate = function (models) {
    Session.belongsTo(models.User, {
      onDelete: 'CASCADE',
    })
  }
  return Session;
};
