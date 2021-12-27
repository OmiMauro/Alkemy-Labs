import sequelize from '../db/database.js'
import Sequelize from 'sequelize'
import { hash } from 'bcrypt'

const User = sequelize.define('Users', {
  _id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true
  },
  username: { type: Sequelize.DataTypes.STRING, allowNull: false },
  name: { type: Sequelize.DataTypes.STRING, allowNull: false },
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    },
    allowNull: false
  },
  hashedPassword: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
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

export { User }
