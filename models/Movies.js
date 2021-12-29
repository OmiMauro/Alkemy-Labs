import sequelize from '../db/database.js'
import Sequelize from 'sequelize'

const Movies = sequelize.define('Movies', {
  _id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true
  },
  image: { type: Sequelize.DataTypes.STRING },
  title: { type: Sequelize.DataTypes.STRING },
  dateCreated: { type: Sequelize.DataTypes.DATE },
  rating: {
    type: Sequelize.DataTypes.ENUM,
    values: ['1', '2', '3', '4', '5'],
    defaultValue: '4'
  },
  createdBy: {
    type: Sequelize.DataTypes.UUID
  },
  updatedBy: {
    type: Sequelize.DataTypes.UUID
  },
  genres_fk: {
    type: Sequelize.DataTypes.UUID
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
