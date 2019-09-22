import { ComplexType, Complex, Complex as C } from './Complex';
import { expect } from 'chai';
import 'mocha';

interface TestInfo {
  p: ComplexType[];
  e: ComplexType;
}

describe('abs', () => {
  const tests = [{
    z: C.from(3, 4),
    e: 5,
  }, {
    z: C.from(10, 24),
    e: 26,
  }, {
    z: C.from(1, 1).sub(C.from(0, 1)),
    e: 1,
  }];
  const name = 'abs';
  const op = C.abs;

  for (const test of tests) {
    const result = op(test.z);
    const description = testDescription(
      name, [C.from(test.z)], test.e, result
    );
    it(description, () => {
      expect(result === test.e).eq(true);
    });
  }
});

describe('arg', () => {
  const tests = [{
    z: C.from({ re: 1, im: 1 }),
    e: Math.PI / 4,
  }, {
    z: C.from({ re: -1, im: -1 }),
    e: -3 * Math.PI / 4,
  }, {
    z: C.from({ re: 0, im: 1 }),
    e: Math.PI / 2,
  }, {
    z: C.from({ re: 1, im: 0.5 * Math.sqrt(4 / 3) }),
    e: Math.PI / 6,
  }];
  const name = 'arg';
  const op = C.arg;

  for (const test of tests) {
    const result = op(test.z);
    const description = testDescription(
      name, [C.from(test.z)], test.e, result
    );
    it(description, () => {
      expect(result === test.e).eq(true);
    });
  }
});

describe('sign', () => {
  const tests: TestInfo[] = [{
    p: [C.from(2.5, 3.5)],
    e: C.from(0.5812381937190965, 0.813733471206735),
  }, {
    p: [C.from(10, 24)],
    e: C.from(0.38461538461538464, 0.9230769230769231),
  }];
  runTests('sign', C.sign, tests);
});

describe('conj', () => {
  const tests: TestInfo[] = [{
    p: [C.from({ re: 99, im: 50 })],
    e: C.from(99, -50),
  }, {
    p: [C.from({ re: 0, im: 0 })],
    e: 0,
  }, {
    p: [C.from({ re: 1, im: 23 })],
    e: C.from(1, -23),
  }];
  runTests('conj', C.conj, tests);
});

describe('neg', () => {
  const tests: TestInfo[] = [{
    p: [C.from(-7.1, 2.5)],
    e: C.from(7.1, -2.5),
  }];
  runTests('neg', C.neg, tests);
});

describe('inv', () => {
  const tests: TestInfo[] = [{
    p: [C.from({ re: 0.5, im: -0.5 })],
    e: C.from(1, 1),
  }, {
    p: [C.from(1, 1)],
    e: C.from(0.5, -0.5),
  }, {
    p: [C.from(0)],
    e: C.from(Infinity),
  }, {
    p: [C.from(Infinity)],
    e: C.from(0),
  }, {
    p: [C.from(-0)],
    e: C.from(Infinity),
  }, {
    p: [C.from(Infinity, Infinity)],
    e: C.from(NaN, NaN),
  }];
  runTests('inv', C.inv, tests);
});

describe('add', () => {
  const tests: TestInfo[] = [{
    p: [C.from(4, 3), C.from(-3, -2)],
    e: C.from(1, 1),
  }, {
    p: [C.from(0, 3), C.from(0, -2)],
    e: C.from(0, 1),
  }, {
    p: [C.from(4), C.from(-3)],
    e: C.from(1),
  }, {
    p: [[3, 4], [5, -7]],
    e: C.from(8, -3),
  }, {
    p: [Infinity, Infinity],
    e: Infinity
  }, {
    p: [Infinity, -Infinity],
    e: NaN,
  }, {
    p: [-Infinity, -Infinity],
    e: -Infinity
  }, {
    p: [{ re: 1, im: 2 }, C.from(4, 6)],
    e: [5, 8],
  }, {
    p: [C.from(0, 1e3), C.from(3e-3, 1e2)],
    e: C.from(0.003, 1100),
  }, {
    p: [C.from(1, 1).sub([0, 1]).mul({ r: 1, phi: Math.PI / 2 }), C.i],
    e: C.from(6.123233995736766e-17, 2),
  }];
  runTests('add', C.add, tests);
});

describe('sub', () => {
  const tests: TestInfo[] = [{
    p: [-Infinity, -Infinity],
    e: NaN,
  }, {
    p: [{ re: 5, im: 8 }, [4, 6]],
    e: [1, 2],
  }];
  runTests('sub', C.sub, tests);
});

describe('mul', () => {
  const tests: TestInfo[] = [{
    p: [-Infinity, -Infinity],
    e: Infinity,
  }, {
    p: [C.i, C.from(Math.PI).exp()],
    e: C.from(0, 23.140692632779267),
  }, {
    p: [C.from(1, 4), 3],
    e: [3, 12],
  }, {
    p: [Infinity, C.i],
    e: NaN,
  }, {
    p: [[3, -6], C.i],
    e: [6, 3],
  }, {
    p: [Infinity, 0],
    e: NaN,
  }, {
    p: [[0, 4], [0, -5]],
    e: 20,
  }, {
    p: [Infinity, 3],
    e: Infinity,
  }, {
    p: [C.i, C.i],
    e: -1,
  }, {
    p: [[1, 4], [3, 2]],
    e: [-5, 14],
  }, {
    p: [[2, 3], [4, 5]],
    e: [-7, 22]
  }, {
    p: [C.from(1, 1), { r: 1, phi: Math.PI / 2 }],
    e: [-0.9999999999999999, 1],
  }];
  runTests('mul', C.mul, tests);
});

describe('div', () => {
  const tests: TestInfo[] = [{
    p: [C.from(4, 2), 0],
    e: C.from(Infinity, Infinity),
  }, {
    p: [0, Infinity],
    e: 0,
  }, {
    p: [-Infinity, 0],
    e: -Infinity,
  }, {
    p: [Infinity, Infinity],
    e: NaN,
  }, {
    p: [0, 0],
    e: NaN,
  }, {
    p: [C.from(4, 2), C.from(1, 1)],
    e: C.from(3, -1),
  }, {
    p: [25, C.from(3, -4)],
    e: C.from(3, 4),
  }, {
    p: [C.from(3, -2), C.i],
    e: C.from(-2, -3),
  }, {
    p: [C.from(0, 6), C.from(3, -12)],
    e: C.from(-0.47058823529411764, 0.11764705882352941),
  }, {
    p: [C.from(4, +16), 4],
    e: C.from(1, 4),
  }, {
    p: [{ re: 1, im: 1 }, { re: 3, im: 4 }],
    e: C.from(7 / 25, -1 / 25),
  }, {
    p: [C.from(2, 8), C.from(1, 2)],
    e: C.from(3.6, 0.8),
  }, {
    p: [-Infinity, 3],
    e: -Infinity
  }];
  runTests('div', C.div, tests);
});

describe('exp', () => {
  const tests: TestInfo[] = [{
    p: [C.from(4, 3)],
    e: C.from(-54.051758861078156, 7.704891372731154),
  }, {
    p: [1],
    e: Math.E,
  }, {
    p: [C.i],
    e: C.from(Math.cos(1), Math.sin(1)),
  }, {
    p: [C.from(3, 2)],
    e: C.from(-8.358532650935372, 18.263727040666765),
  }, {
    p: [C.from(3, -2)],
    e: C.from(-8.358532650935372, -18.263727040666765),
  }];
  runTests('exp', C.exp, tests);
});

describe('log', () => {
  const tests: TestInfo[] = [{
    p: [Math.E],
    e: 1,
  }, {
    p: [0],
    e: -Infinity,
  }, {
    p: [-1],
    e: C.from(0, Math.PI),
  }, {
    p: [C.i],
    e: C.from(0, (Math.PI / 2)),
  }, {
    p: [C.from(3, 2)],
    e: C.from(Math.log(13) / 2, Math.atan2(2, 3)),
  }, {
    p: [C.from(3, -2)],
    e: C.from(Math.log(13) / 2, -Math.atan2(2, 3)),
  }, {
    p: [C.from(Math.E, 0).pow(2).neg()],
    e: C.from(2, 3.141592653589793)
  }, {
    p: [C.from(4, 3)],
    e: C.from(1.6094379124341003, 0.6435011087932844),
  }];
  runTests('log', C.log, tests);
});

describe('log2', () => {
  const tests: TestInfo[] = [
  ];
  runTests('log2', C.log2, tests);
});

describe('log10', () => {
  const tests: TestInfo[] = [
  ];
  runTests('log10', C.log10, tests);
});

describe('pow', () => {
  const tests: TestInfo[] = [{
    p: [3, 3],
    e: 27,
  }, {
    p: [ 0, [1, 1] ],
    e: 0,
  }, {
    p: [ C.i, 0 ],
    e: 1,
  }, {
    p: [ 87, 3],
    e: 658503,
  }, {
    p: [ C.i, 1 ],
    e: C.i,
  }, {
    p: [ C.i, 2 ],
    e: -1,
  }, {
    p: [ C.i, 3 ],
    e: C.i.neg(),
  }, {
    p: [ C.i, 4 ],
    e: 1,
  }, {
    p: [ C.i, 5 ],
    e: C.i,
  }, {
    p: [ 7, 2 ],
    e: 49,
  }, {
    p: [ 0, 2 ],
    e: 0,
  }, {
    p: [ [ 1, 2 ], 2 ],
    e: [-2.999999999999999, 4.000000000000001],
  }, {
    p: [ [1, 2], [1, 2] ],
    e: [-0.22251715680177267, 0.10070913113607541]
  }, {
    p: [ {re: 1, im: 2}, C.from(3, 4) ],
    e: [0.1290095940744669, 0.03392409290517001]
  }, {
    p: [ C.i, 7 ],
    e: C.i.neg()
  }, {
    p: [ C.i, 4 ],
    e: 1
  }, {
    p: [ C.i, 5 ],
    e: C.i
  }, {
    p: [ C.i.mul(5), 5 ],
    e: C.i.mul(3125)
  }, {
    p: [ 0, 2 ],
    e: 0
  }, {
    p: [ 0, 0 ],
    e: 1
  }, {
    p: [C.i.mul(3), C.i.mul(3)],
    e: C.from(-0.008876640735623678, -0.0013801328997494863)
  }, {
    p: [0, [1, 1]],
    e: C.from(0, 0)
  }, {
    p: [0, [0, 1]],
    e: C.from(NaN, NaN)
  }, {
    p: [0, [-1, 1]],
    e: C.from(NaN, NaN)
  }, {
    p: [0, [-2]],
    e: Infinity
  }];
  runTests('pow', C.pow, tests);
});

describe('sqrt', () => {
  const tests: TestInfo[] = [{
      p: [ 9 ],
      e: [ 3 ],
    }, {
      p: [ -9 ],
      e: C.i.mul(3),
    }, {
      p: [ -36 ],
      e: C.i.mul(6),
    }, {
      p: [ C.from(0, 36) ],
      e: [ 4.242640687119285, 4.242640687119285 ],
    }, {
      p: [ C.i.mul(-36) ],
      e: [ 4.242640687119285, -4.242640687119285 ],
    }, {
      p: [ [36, 36] ],
      e: [ 6.59210468080686, 2.730539163373364 ],
    }, {
      p: [ [36, -36] ],
      e: [ 6.59210468080686, -2.730539163373364 ],
    }, {
      p: [ [-36, 36] ],
      e: [ 2.730539163373364, 6.59210468080686 ],
    }, {
      p: [ [-36, -36] ],
      e: [ 2.730539163373364, -6.59210468080686 ],
    }, {
      p: [ 0 ],
      e: [ 0 ],
    }, {
      p: [ [1, 4] ],
      e: [ 1.600485180440241, 1.2496210676876531 ],
    }, {
      p: [{re: -3, im: 4}],
      e: [ 1, 2 ],
    }, {
      p: [{re: 3, im: -4}],
      e: [ 2, -1 ],
    }, {
      p: [{re: -3, im: -4}],
      e: [ 1, -2 ],
    }, {
      p: [ [1, -2] ],
      e: [ 1.272019649514069, -0.7861513777574233 ],
    },
  ];

  runTests('sqrt', C.sqrt, tests);
});

type F1 = (z1: ComplexType) => Complex;
type F2 = (z1: ComplexType, z2: ComplexType) => Complex;

function isF1(_: F1|F2, tests: TestInfo): _ is F1 {
  return tests.p.length === 1;
}

function runTests(name: string, op: F1|F2, tests: TestInfo[]) {
  for (const test of tests) {
    const e = C.from(test.e);
    const result = isF1(op, test) ? op(test.p[0]) : op(test.p[0], test.p[1]);
    const description = testDescription(
      name, test.p.map((z) => C.from(z)), e, result
    );
    it(description, () => {
      if (e.isNaN()) {
        expect(result.isNaN()).eq(true);
        return;
      }
      if (e.isInfinite()) {
        expect(result.isInfinite()).eq(true);
      }

      expect(result.equals(test.e)).eq(true);
    });
  }
}

function testDescription(op: string, params: C[], exp: C|number, res: C|number): string {
  return `Complex.${op}(${params}) = ${exp} (${res})`;
}
