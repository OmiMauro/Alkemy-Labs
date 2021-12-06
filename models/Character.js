import sequelize from '../db/database.js'
import Sequelize from 'sequelize'

const Character = sequelize.define('Characters', {
  _id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
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
  },
  movies: Sequelize.DataTypes.STRING
})
export { Character }
