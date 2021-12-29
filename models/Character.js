import sequelize from '../db/database.js'
import Sequelize from 'sequelize'
import moment from 'moment'
const Character = sequelize.define('Characters', {
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV1,
    primaryKey: true
  },
  image: { type: Sequelize.DataTypes.STRING },
  name: { type: Sequelize.DataTypes.STRING },
  dateBirth: {
    type: Sequelize.DataTypes.DATE
  },
  weigth: { type: Sequelize.DataTypes.FLOAT },
  history: { type: Sequelize.DataTypes.STRING },
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
export { Character }
