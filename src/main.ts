import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import chalk from 'chalk';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('🏆 **Fitness Center API** 🏋️‍♂️')
    .setDescription(
      `
🔥 **Welcome to the ultimate Fitness Center API!** 🔥

This API empowers you to manage:

- 💪 **Users & Roles** — Handle member profiles, authentication, and access control  
- 🏢 **Centers & Locations** — Manage fitness centers, regions, and districts  
- 📅 **Classes & Bookings** — Schedule classes, manage instructors, and track attendance  
- 💳 **Memberships & Payments** — Process subscriptions and payments seamlessly  
- 🏋️ **Equipment** — Track gym equipment, availability, and maintenance  
- 🏅 **Achievements & Goals** — Monitor member progress and milestones  
- 🔔 **Notifications** — Send timely updates to users  

✨ Designed for **scalability**, **security**, and **ease of use** — perfect for gym owners and developers alike.
Explore the endpoints below and unleash the power of fitness management! 🚀
`,
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, documentFactory);

  await app.listen(PORT ?? 3030, () => {
    console.log(`
    ${chalk.magentaBright.magentaBright('✨ Fitness System Online! ')}
    🔗 URL: ${chalk.cyan.underline(`http://localhost:${PORT}`)}
    🕓 Time: ${chalk.gray(new Date().toLocaleTimeString())}
    `);
  });
}
bootstrap();
