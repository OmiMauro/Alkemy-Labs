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
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    keepAlive: true
  },
  ssl: true,
  define: {
    timestamps: false
  }
})
export default sequelize
