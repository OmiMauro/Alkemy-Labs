import sequelize from '../db/database.js'
import Sequelize from 'sequelize'
import moment from 'moment'
const Character = sequelize.define('Characters', {
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV1,
    primaryKey: true
  },
  image: Sequelize.DataTypes.STRING,
  name: Sequelize.DataTypes.STRING,
  dateBirth: {
    type: Sequelize.DataTypes.DATE
  },
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
    type: Sequelize.DataTypes.UUID,
    references: {
      model: 'Users',
      key: '_id'
    }
  },
  updatedBy: {
    type: Sequelize.DataTypes.UUID,
    references: {
      model: 'Users',
      key: '_id'
    }
  },
  movies_fk: {
    type: Sequelize.DataTypes.UUID,
    references: {
      model: 'Movies',
      key: '_id'
    }
  }
})
export { Character }
