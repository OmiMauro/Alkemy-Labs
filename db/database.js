import Sequelize from 'sequelize'
const { DATABASE_URL, URI_DB_TEST, NODE_ENV, URI_DB_DEV } = process.env
const conecctionString =
  NODE_ENV === 'production'
    ? DATABASE_URL
    : NODE_ENV === 'development'
    ? URI_DB_DEV
    : URI_DB_TEST

const sequelize = new Sequelize(conecctionString, {
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  ssl: { rejectUnauthorized: false }
})
export default sequelize
