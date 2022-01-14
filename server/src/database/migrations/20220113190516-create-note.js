export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Note", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      authorId: {
        type: Sequelize.INTEGER,

        references: {
          model: "User",
          key: "id",
        },
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(256),
      },

      detail: {
        type: Sequelize.STRING(512),
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Note");
  },
};
