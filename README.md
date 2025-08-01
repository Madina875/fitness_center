# Fitness Center API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/badge/circleci-build-brightgreen.svg" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/badge/Follow%20us-Twitter-1DA1F2.svg" alt="Follow us on Twitter"></a>
</p>

## Description

🏆 **Fitness Center Management System** - A comprehensive NestJS API for managing fitness centers, users, classes, payments, and more.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fitness_center"

# JWT Configuration - Role-based secrets
# User Role
OWNER_ACCESS_TOKEN_KEY="owner-access-secret"
OWNER_ACCESS_TOKEN_TIME="15m"
OWNER_REFRESH_TOKEN_KEY="owner-refresh-secret"
OWNER_REFRESH_TOKEN_TIME="7d"

# Instructor Role
CLIENT_ACCESS_TOKEN_KEY="client-access-secret"
CLIENT_ACCESS_TOKEN_TIME="15m"
CLIENT_REFRESH_TOKEN_KEY="client-refresh-secret"
CLIENT_REFRESH_TOKEN_TIME="7d"

# Manager Role
WORKER_ACCESS_TOKEN_KEY="worker-access-secret"
WORKER_ACCESS_TOKEN_TIME="15m"
WORKER_REFRESH_TOKEN_KEY="worker-refresh-secret"
WORKER_REFRESH_TOKEN_TIME="7d"

# Admin JWT (separate system)
ADMIN_ACCESS_TOKEN_KEY="admin-access-secret"
ADMIN_ACCESS_TOKEN_TIME="15m"
ADMIN_REFRESH_TOKEN_KEY="admin-refresh-secret"
ADMIN_REFRESH_TOKEN_TIME="7d"

# Cookie Configuration
COOKIE_TIME="604800000" # 7 days in milliseconds

# Email Configuration
MAIL_HOST="smtp.gmail.com"
MAIL_USER="your-email@gmail.com"
MAIL_PASSWORD="your-app-password"
MAIL_FROM="your-email@gmail.com"

# API Configuration
api_url="http://localhost:3030"
PORT=3030
```

## Project setup

```bash
$ npm install
```

## Database Setup

```bash
# Generate Prisma client
$ npx prisma generate

# Run migrations
$ npx prisma migrate dev

# Open Prisma Studio (optional)
$ npx prisma studio
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:3030/docs
- **API Base URL**: http://localhost:3030

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
