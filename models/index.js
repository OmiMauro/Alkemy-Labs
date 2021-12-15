import { Character } from './Character.js'
import { Genre } from './Genre.js'
import { Movies } from './Movies.js'
import { User } from './User.js'

Movies.belongsToMany(Character, { through: 'Character_Movies' })
Character.belongsToMany(Movies, { through: 'Character_Movies' })

Genre.hasMany(Movies, { foreignKey: 'genres_fk', as: 'Genres' })
Movies.belongsTo(Genre, { foreignKey: 'genres_fk', as: 'Genres' })

User.hasMany(Movies, { foreignKey: 'createdBy' })
Movies.belongsTo(User, { foreignKey: 'createdBy' })

User.hasMany(Genre, { foreignKey: 'createdBy' })
Genre.belongsTo(User, { foreignKey: 'createdBy' })

User.hasMany(Character, { foreignKey: 'createdBy' })
Character.belongsTo(User, { foreignKey: 'createdBy' })
export { Character, Genre, Movies, User }
