import { Complex } from './src/Complex';
import * as repl from 'repl';

const server = repl.start('> ');

server.context.Complex = Complex;
server.context.C = Complex;
