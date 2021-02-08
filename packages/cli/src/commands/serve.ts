import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export const serverCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('--p, --port <number>', 'port to run server on', '5005')
  .action((filename = 'code-runner.js', options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(+options.port, path.basename(filename), dir);
  });