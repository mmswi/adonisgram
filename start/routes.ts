/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/signup', async ({ view }) => {
  return view.render('auth/signup')
})

Route.post('/signup', async (ctx) => {
  const { default: SignUpController } = await import(
    'App/Controllers/Http/SignUpController'
  )

  return new SignUpController().index(ctx);
})

Route.get('/login', async ({ view }) => {
  return view.render('auth/login')
})

Route.post('/login', async (ctx) => {
  const { default: LoginController } = await import(
    'App/Controllers/Http/LoginController'
  )

  return new LoginController().index(ctx);
})

Route.get('/profile', async ({ view }) => {
  return view.render('user/profile');
}).middleware('auth');
