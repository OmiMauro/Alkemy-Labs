import { Character } from './Character.js'
import { Genre } from './Genre.js'
import { Movies } from './Movies.js'
import { User } from './User.js'

Movies.belongsToMany(Character, { through: 'Character_Movies' })
Character.belongsToMany(Movies, { through: 'Character_Movies' })

Genre.hasMany(Movies, { foreignKey: 'genres_fk' })
Movies.belongsTo(Genre)

User.hasMany(Movies, { foreignKey: 'createdBy' })
Movies.belongsTo(User)

User.hasMany(Genre, { foreignKey: 'createdBy' })
Genre.belongsTo(User)

User.hasMany(Character, { foreignKey: 'createdBy' })
Character.belongsTo(User)
