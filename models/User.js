import sequelize from '../db/database.js'
import Sequelize from 'sequelize'
import { hash } from 'bcrypt'
import { Movies } from './Movies.js'
import { Genre } from './Genre.js'
import { Character } from './Character.js'
const User = sequelize.define('Users', {
  _id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true
  },
  username: Sequelize.DataTypes.STRING,
  name: Sequelize.DataTypes.STRING,
  email: {
    type: Sequelize.DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  hashedPassword: {
    type: Sequelize.DataTypes.STRING,
    validate: {},
    set (pwd) {
      this.setDataValue('password', hash(pwd, 9))
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
User.hasMany(Movies, { foreignKey: 'createdBy' })
User.hasMany(Genre)
User.hasMany(Character)

export { User }
