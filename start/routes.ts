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
});

Route.get('/signup', async ({ view }) => {
  return view.render('auth/signup')
}).middleware('guest');

Route.post('/signup', async (ctx) => {
  const { default: AuthController } = await import(
    'App/Controllers/Http/AuthController'
  )

  return new AuthController().signup(ctx);
});

Route.get('/login', async ({ view }) => {
  return view.render('auth/login')
}).middleware('guest');

Route.post('/login', async (ctx) => {
  const { default: AuthController } = await import(
    'App/Controllers/Http/AuthController'
  )

  return new AuthController().login(ctx);
});

Route.post('/logout', async (ctx) => {
  const { default: AuthController } = await import(
    'App/Controllers/Http/AuthController'
  )

  return new AuthController().logout(ctx);
});

Route.get('/profile', async ({ view }) => {
  return view.render('user/profile');
}).middleware('auth');

Route.post('/confirmation-email', async (ctx) => {
  const { default: EmailVerifyController } = await import(
    'App/Controllers/Http/EmailVerifiesController'
  )

  return new EmailVerifyController().index(ctx);
}).middleware('auth');

Route.get('/verify-email/:email', async (ctx) => {
  const { default: EmailVerifyController } = await import(
    'App/Controllers/Http/EmailVerifiesController'
  )

  return new EmailVerifyController().verify(ctx);
}).as('verifyEmail');