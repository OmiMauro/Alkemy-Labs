import sequelize from '../db/database.js'
import Sequelize from 'sequelize'
import { Movies } from './Movies.js'

const Character = sequelize.define('Characters', {
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV1,
    primaryKey: true
  },
  image: Sequelize.DataTypes.STRING,
  name: Sequelize.DataTypes.STRING,
  dateBirth: Sequelize.DataTypes.DATE,
  weigth: Sequelize.DataTypes.FLOAT,
  history: Sequelize.DataTypes.STRING,
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
  /* movies_fk: {
    type: Sequelize.DataTypes.UUIDV4,
    references: {
      model: 'Movies',
      key: '_id'
    }
  } */
})
Character.belongsToMany(Movies, { through: 'Character_Movies' })
Movies.belongsToMany(Character, { through: 'Character_Movies' })

export { Character }
