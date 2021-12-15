import sequelize from '../db/database.js'
import Sequelize from 'sequelize'

const Movies = sequelize.define('Movies', {
  _id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true
  },
  image: Sequelize.DataTypes.STRING,
  title: Sequelize.DataTypes.STRING,
  dateCreated: Sequelize.DataTypes.DATE,
  rating: {
    type: Sequelize.DataTypes.ENUM,
    values: ['1', '2', '3', '4', '5'],
    defaultValue: '4'
  },
  createdBy: {
    type: Sequelize.DataTypes.UUID,
    references: {
      model: 'Users',
      key: '_id'
    }
  },
  updatedBy: {
    type: Sequelize.DataTypes.UUID,
    references: {
      model: 'Users',
      key: '_id'
    }
  },
  /* characters_fk: {
    type: Sequelize.DataTypes.UUID,
    references: {
      model: 'Characters',
      key: '_id'
    }
  }, */
  genres_fk: {
    type: Sequelize.DataTypes.UUID,
    references: {
      model: 'Genres',
      key: '_id'
    }
  },
  createdAt: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW
  },
  updatedAt: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW
  }
})
export { Movies }
