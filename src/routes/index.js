import express from 'express'
import users from './user.route'
import admin from './admin.route'

const routes = express()

routes.use('/api/v1/users', users, admin)

export default routes
