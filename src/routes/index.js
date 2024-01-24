import express from 'express'
import users from './user.route'
import admin from './admin.route'
import role from './role.route'
import rolepermission from './rolepermission.route'

const routes = express()

routes.use('/api/v1/users', users)
routes.use('/api/v1/users', role)
routes.use('/api/v1/users', admin)
routes.use('/api/v1/users', rolepermission)

export default routes
