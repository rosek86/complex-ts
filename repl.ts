import { Complex } from './Complex';
import * as repl from 'repl';
import * as ComplexJS from 'complex.js';

const server = repl.start('> ');
server.context.Complex = Complex;
server.context.C = Complex;
server.context.ComplexJS = ComplexJS;
server.context.Cjs = ComplexJS;

