import sequelize from '../db/database.js'
import Sequelize from 'sequelize'
import { Movies } from './Movies.js'

const Character = sequelize.define('Characters', {
  _id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUID,
    allowNull: false,
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
