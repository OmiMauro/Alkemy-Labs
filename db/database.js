import Sequelize from 'sequelize'
const URI_DB = process.env.URI_DB

const sequelize = new Sequelize(URI_DB, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

export default sequelize
