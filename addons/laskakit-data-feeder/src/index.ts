import { $log } from '@tsed/logger';
import { ConfigProvider, ConfigProviderOptions } from '@radoslavirha/tsed-configuration';
import { Platform, ServerConfiguration } from '@radoslavirha/tsed-platform';
import { Server } from './Server.js';
import { ConfigModel } from './models/index.js';

const SIG_EVENTS = [
    'beforeExit',
    'SIGHUP',
    'SIGINT',
    'SIGQUIT',
    'SIGILL',
    'SIGTRAP',
    'SIGABRT',
    'SIGBUS',
    'SIGFPE',
    'SIGUSR1',
    'SIGSEGV',
    'SIGUSR2',
    'SIGTERM'
];

try {
    const config = new ConfigProvider(<ConfigProviderOptions>{
        service: 'LaslaKit Data Feeder',
        fallbackPort: 4000,
        configModel: ConfigModel
    });

    const configuration: ServerConfiguration = {
        ...config.server,
        api: config.api
    };

    const platform = await Platform.bootstrap(Server, configuration);
    await platform.listen();

    SIG_EVENTS.forEach((evt) => process.on(evt, () => platform.stop()));

    ['uncaughtException', 'unhandledRejection'].forEach((evt) =>
        process.on(evt, async (error) => {
            $log.error({ event: 'SERVER_' + evt.toUpperCase(), message: error.message, stack: error.stack });
            await platform.stop();
        })
    );
} catch (error) {
    $log.error({ event: 'SERVER_BOOTSTRAP_ERROR', message: error.message, stack: error.stack });
}

