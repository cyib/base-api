'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.createTable("Session", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        tokensession: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        tokenpush: {
          type: DataTypes.STRING,
          allowNull: true
        },
        typedevicepush: {
          type: DataTypes.INTEGER(1),
          allowNull: true,
        },
        badge: {
          type: DataTypes.INTEGER(3),
          allowNull: false,
          defaultValue: 0
        },
        UserId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.fn('now')
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.fn('now')
        }
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable("Session")
    ]);
  }
};