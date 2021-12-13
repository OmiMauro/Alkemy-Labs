import Sequelize from 'sequelize'
const { URI_DB, URI_DB_TEST, NODE_ENV, URI_DB_DEV } = process.env
const conecctionString =
  NODE_ENV === 'production'
    ? URI_DB
    : NODE_ENV === 'development'
    ? URI_DB_DEV
    : URI_DB_TEST

const sequelize = new Sequelize(conecctionString, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

export default sequelize
