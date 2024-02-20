import express from 'express'
import users from './user.route'
import draws from './draw.route'
import players from './player.route'

const routes = express()

routes.use('/api/v1/users', users)
routes.use('/api/v1/draws', draws)
routes.use('/api/v1/players', players)

export default routes
