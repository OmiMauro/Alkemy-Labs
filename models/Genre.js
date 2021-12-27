import sequelize from '../db/database.js'
import Sequelize from 'sequelize'
const Genre = sequelize.define('Genres', {
  _id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true
  },
  image: { type: Sequelize.DataTypes.STRING },
  name: { type: Sequelize.DataTypes.STRING },
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
    /*  references: {
      model: 'Users',
      key: '_id'
    } */
  } /* ,
  updatedBy: {
    type: Sequelize.DataTypes.UUID,
    references: {
      model: 'Users',
      key: '_id'
    }
  } */
})
export { Genre }
