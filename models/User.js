import sequelize from '../db/database.js'
import Sequelize from 'sequelize'
import { hash } from 'bcrypt'
const User = sequelize.define('Users', {
  _id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUID,
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
    set (value) {
      this.setDataValue('password', hash(value, process.env.SALT_ROUNDS))
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
export { User }
