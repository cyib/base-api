'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.createTable("User", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true
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
      queryInterface.dropTable("User")
    ]);
  }
};