import sequelize from '../db/database.js'
import Sequelize from 'sequelize'
import { Movies } from './Movies.js'

const Genre = sequelize.define('Genres', {
  _id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true
  },
  image: Sequelize.DataTypes.STRING,
  name: Sequelize.DataTypes.STRING,
  movies_fk: {
    type: Sequelize.DataTypes.UUID,
    references: {
      model: 'Movies',
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
  },
  createdBy: {
    type: Sequelize.DataTypes.UUID
  },
  updatedBy: {
    type: Sequelize.DataTypes.UUID
  }
})
// Genre.hasMany(Movies)
export { Genre }
