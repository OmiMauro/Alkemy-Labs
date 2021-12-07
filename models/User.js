import sequelize from '../db/database.js'
import Sequelize from 'sequelize'

const User = sequelize.define('Users', {
  _id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  username: Sequelize.DataTypes.STRING,
  name: Sequelize.DataTypes.STRING,
  email: Sequelize.DataTypes.STRING,
  password: Sequelize.DataTypes.STRING,
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
