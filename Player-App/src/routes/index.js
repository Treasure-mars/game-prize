import express from 'express'
import users from './user.route'
import players from './player.route'
import notifications from './notification.route'

const routes = express()

routes.use('/api/v1/users', users)
routes.use('/api/v1/players', players)
routes.use('/api/v1/notifications', notifications)

export default routes
