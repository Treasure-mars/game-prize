import express from 'express'
import users from './user.route'
import admin from './admin.route'
import rolepermission from './rolepermission.route'
import products from './product.route'
import payments from './payment.route'
import tokens from './token.route'
import draws from './draw.route'
import players from './player.route'

const routes = express()

routes.use('/api/v1/users', users)
routes.use('/api/v1/users', rolepermission)
routes.use('/api/v1/users', admin)
routes.use('/api/v1/products', products)
routes.use('/api/v1/payments', payments)
routes.use('/api/v1/tokens', tokens)
routes.use('/api/v1/draws', draws)
routes.use('/api/v1/players', players)

export default routes
