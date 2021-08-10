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

Route.get('/', async (ctx) => {
  const { default: HomeController } = await import(
    'App/Controllers/Http/HomeController'
  )

  return new HomeController().index(ctx);
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

Route.get('/accounts/edit', async (ctx) => {
  const { default: ProfilesController } = await import(
    'App/Controllers/Http/ProfilesController'
  )

  return new ProfilesController().edit(ctx);
}).middleware('auth');

Route.post('/accounts/edit', async (ctx) => {
  const { default: ProfilesController } = await import(
    'App/Controllers/Http/ProfilesController'
  )

  return new ProfilesController().update(ctx);
}).middleware('auth');

Route.get('/posts/create', async (ctx) => {
  const { default: PostsController } = await import(
    'App/Controllers/Http/PostsController'
  )

  return new PostsController().create(ctx);
}).middleware('auth');

Route.post('/posts/create', async (ctx) => {
  const { default: PostsController } = await import(
    'App/Controllers/Http/PostsController'
  )

  return new PostsController().store(ctx);
}).middleware('auth');

Route.post('/follow/:userId', async (ctx) => {
  const { default: FollowsController } = await import(
    'App/Controllers/Http/FollowsController'
  )

  return new FollowsController().store(ctx);
});

Route.delete('/follow/:userId', async (ctx) => {
  const { default: FollowsController } = await import(
    'App/Controllers/Http/FollowsController'
  )

  return new FollowsController().destroy(ctx);
});

// Important - dynamic route is put last as it will discard the other routes after it
Route.get('/:username', async (ctx) => {
  const { default: ProfilesController } = await import(
    'App/Controllers/Http/ProfilesController'
  )

  return new ProfilesController().index(ctx);
}).middleware('auth');