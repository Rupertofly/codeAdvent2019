import data02 from './02data';

enum OPCODES {
  ADD = 1,
  MULT = 2,
  HALT = 99,
}

export function intCodeProgram(inputMemory: number[]) {
  const memory = inputMemory.slice(0);
  let InstructionPointer = -1;
  const step = () => {
    InstructionPointer++;
    return memory[InstructionPointer];
  };
  const read = (i: number) => memory[i];
  const write = (i: number, v: number) => {
    memory[i] = v;
  };
  const add = () => {
    const aLoc = step();
    const bLoc = step();
    const oLoc = step();
    write(oLoc, read(aLoc) + read(bLoc));
  };
  const mult = () => {
    const aLoc = step();
    const bLoc = step();
    const oLoc = step();
    write(oLoc, read(aLoc) * read(bLoc));
  };
  // program loop
  let programHalted = false;
  while (!programHalted) {
    const inCode = step();
    switch (inCode) {
      case OPCODES.ADD:
        add();
        break;
      case OPCODES.MULT:
        mult();
        break;
      case OPCODES.HALT:
        programHalted = true;
        break;
      default:
        throw new Error(
          `unknown opcode received, OP Code was ${inCode} at position ${InstructionPointer}`
        );
    }
    if (InstructionPointer > memory.length) {
      throw new Error(
        `out of memory at ${InstructionPointer}`
      );
    }
  }
  return memory;
}

export function part02(
  desiredOutput: number,
  program: number[]
) {
  const [nounLoc, verbLoc, outputLoc] = [1, 2, 0];
  let noun = -1;
  let verb = 0;
  let output = -1;
  while (output !== desiredOutput) {
    noun++;
    if (noun > 99) {
      noun = 0;
      verb++;
    }
    const inputMemory = program.map((d, i) =>
      i === nounLoc ? noun : i === verbLoc ? verb : d
    );
    const outputMemory = intCodeProgram(inputMemory);
    output = outputMemory[outputLoc];
    if (verb > 99)
      throw new Error(`desiredOutput impossible with data`);
  }
  return {
    noun,
    verb,
    output,
    result: 100 * noun + verb,
  };
}
export default intCodeProgram;
