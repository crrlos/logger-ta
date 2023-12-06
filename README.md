This library extends the default `ConsoleLogger` class from NestJS to allow
writing the logs to console and log file. One file per logger instance is created.

**Usage:**

**Import in app.module.ts:**

```
@Module({
  imports: [
    LoggerTaModule.register({
      path: './logs',
    })
  ],
})
export class AppModule {}
```

**Create instance in services or components:**

```
export class AuthService {

   logger = new LoggerTaService(AuthService.name)

    constructor() {
        this.logger.debug(`Service started!`);
        this.logger.error(`Service started!`);
        this.logger.warn(`Service started!`);
        this.logger.log(`Service started!`);
    }
}
```

**Log levels hierarchy:**

```
'debug': ['debug', 'log', 'warn', 'error']
'info': ['log', 'warn', 'error']
'warn': ['warn', 'error']
'error': ['error']
```

To set log level an environment variable must be declared: `LOG_LEVEL=DEBUG`, if not declared default is `ERROR`

**Compatibility**

| Version | NestJS support |
| ------- | -------------- |
| 1.0.5   | 10             |
| 1.0.4   | 8,9            |
