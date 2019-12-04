import intCodeProgram, { part02 } from './02';
import data02 from './02data';
import { coordToPoint, walkWire } from './03';
import { line01 } from './03data';

console.log(coordToPoint('L366'));
console.log(walkWire(line01.map(coordToPoint)));
