import { ConsoleLogger, DynamicModule, Module } from '@nestjs/common'

const loglevels = {
    'debug': ['debug', 'log', 'warn', 'error'],
    'info': ['log', 'warn', 'error'],
    'warn': ['warn', 'error'],
    'error': ['error']
}

export class LoggerTaService extends ConsoleLogger {

    static path = ''
    constructor(context: string) {
        super(context,
            {
                logLevels: loglevels[process.env.LOG_LEVEL?.toLowerCase() ?? 'error']
            })
    }

    error(message: string) {
        if (!this.isLevelEnabled('error')) return
        super.error(message)
        this.writeToFile(message, 'ERROR')
    }

    log(message: string) {
        if (!this.isLevelEnabled('log')) return
        super.log(message)
        this.writeToFile(message, 'INFO')
    }

    warn(message: string) {
        if (!this.isLevelEnabled('warn')) return
        super.warn(message)
        this.writeToFile(message, 'WARN')

    }
    debug(message: string) {
        if (!this.isLevelEnabled('debug')) return
        super.debug(message)
        this.writeToFile(message, 'DEBUG')
    }

    private writeToFile(message: string, level: string) {
        const fs = require('fs')
        const dir = LoggerTaService.path;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.appendFile(`${LoggerTaService.path}/${this.context}.log`,
            `${new Date().toISOString()} ${level} ${this.context} ${message}\n`, () => 0);
    }
}

@Module({
    providers: [LoggerTaService],
    exports: [LoggerTaService]
})
export class LoggerTaModule {
    static register(options: { path: string }): DynamicModule {
        LoggerTaService.path = options.path
        return {
            module: LoggerTaModule,
            exports: [LoggerTaService],
        };
    }
}