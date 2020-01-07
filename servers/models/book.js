export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the title for your book'
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter an author'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Pease input a description'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Pease input a quantity'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    }
  }, {});
  Book.associate = (models) => {
    // associations can be defined here
    Book.belongsTo(models.Users,{
      foreignKey:'userId',
      onDelete :'CASCADE'
    });
  };
  return Book;
};
