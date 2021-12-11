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
    type: Sequelize.DataTypes.INTEGER,
    validate: {
      isIn: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]
    }
  },
  createdBy: {
    type: Sequelize.DataTypes.UUID
  },
  updatedBy: {
    type: Sequelize.DataTypes.UUID
  },
  /* characters_fk: {
    type: Sequelize.DataTypes.UUIDV4,
    references: {
      model: 'Characters',
      key: '_id'
    }
  } */
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
