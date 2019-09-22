// tslint:disable:variable-name
// tslint:disable:member-ordering
// tslint:disable:unified-signatures

export type ComplexType = Complex                    |
                          number                     |
                          { re: number, im: number } |
                          { r: number, phi: number } |
                          [number, number] |
                          number[];

export class Complex {
  private _re: number;
  private _im: number;
  private _epsilon = 1e-15;

  private constructor(re: number, im: number) {
    // NOTE: fix negative 0
    this._re = re === 0 ? 0 : re;
    this._im = im === 0 ? 0 : im;
  }

  public static from(c: ComplexType): Complex;
  public static from(re: number, im: number): Complex;

  public static from(): Complex {
    if (arguments.length === 1) {
      const arg = arguments[0];

      if (arg instanceof Complex) {
        return new Complex(arg.re, arg.im);
      }

      if (typeof arg === 'number') {
        return new Complex(arg, 0);
      }

      if (typeof arg.re === 'number' && typeof arg.im === 'number') {
        return new Complex(arg.re, arg.im);
      }

      if (typeof arg.r === 'number' && typeof arg.phi === 'number') {
        return Complex.fromPolar(arg.r, arg.phi);
      }

      if (Array.isArray(arg)) {
        if (arg.length === 1) {
          return new Complex(arg[0], 0);
        }
        if (arg.length === 2) {
          return new Complex(arg[0], arg[1]);
        }
      }
    }

    if (arguments.length === 2) {
      const arg0 = arguments[0];
      const arg1 = arguments[1];

      if (typeof arg0 === 'number' && typeof arg1 === 'number') {
        return new Complex(arg0, arg1);
      }
    }

    throw new Error('Cannot create complex number, invalid arguments.');
  }

  private static fromPolar(r: number, phi: number): Complex {
    return new Complex(r * Math.cos(phi), r * Math.sin(phi));
  }

  public static get one(): Complex {
    return new Complex(1, 0);
  }

  public static get zero(): Complex {
    return new Complex(0, 0);
  }

  public static get i(): Complex {
    return new Complex(0, 1);
  }

  public get real(): number {
    return this.re;
  }

  public get imag(): number {
    return this.im;
  }

  public get re(): number {
    return this._re;
  }

  public get im(): number {
    return this._im;
  }

  public get epsilon(): number {
    return this._epsilon;
  }

  public set epsilon(e: number) {
    this._epsilon = e;
  }

  public isZero(): boolean {
    return Complex.isZero(this);
  }

  public isInfinite(): boolean {
    return Complex.isInfinite(this);
  }

  public isNaN(): boolean {
    return Complex.isNaN(this);
  }

  public abs(): number {
    return Complex.abs(this);
  }

  public arg(): number {
    return Complex.arg(this);
  }

  public sign(): Complex {
    return Complex.sign(this);
  }

  public conj(): Complex {
    return Complex.conj(this);
  }

  public neg(): Complex {
    return Complex.neg(this);
  }

  public inv(): Complex {
    return Complex.inv(this);
  }

  public add(v: ComplexType): Complex {
    return Complex.add(this, v);
  }

  public sub(v: ComplexType): Complex {
    return Complex.sub(this, v);
  }

  public mul(v: ComplexType): Complex {
    return Complex.mul(this, v);
  }

  public div(v: ComplexType): Complex {
    return Complex.div(this, v);
  }

  public exp(): Complex {
    return Complex.exp(this);
  }

  public log(): Complex {
    return Complex.log(this);
  }

  public log2(): Complex {
    return Complex.log2(this);
  }

  public log10(): Complex {
    return Complex.log10(this);
  }

  public pow(exponent: number): Complex {
    return Complex.pow(this, exponent);
  }

  public sqrt(): Complex {
    return Complex.sqrt(this);
  }

  public sin()   { return Complex.sin(this);   }
  public asin()  { return Complex.asin(this);  }
  public sinh()  { return Complex.sinh(this);  }
  public asinh() { return Complex.asinh(this); }

  public cos()   { return Complex.cos(this);   }
  public acos()  { return Complex.acos(this);  }
  public cosh()  { return Complex.cosh(this);  }
  public acosh() { return Complex.acosh(this); }

  public tan()   { return Complex.tan(this);   }
  public atan()  { return Complex.atan(this);  }
  public tanh()  { return Complex.tanh(this);  }
  public atanh() { return Complex.atanh(this); }

  public cot()   { return Complex.cot(this);   }
  public acot()  { return Complex.acot(this);  }
  public coth()  { return Complex.coth(this);  }
  public acoth() { return Complex.acoth(this); }

  public sec()   { return Complex.sec(this);   }
  public asec()  { return Complex.asec(this);  }
  public sech()  { return Complex.sech(this);  }
  public asech() { return Complex.asech(this); }

  public csc()   { return Complex.csc(this);   }
  public acsc()  { return Complex.acsc(this);  }
  public csch()  { return Complex.csch(this);  }
  public acsch() { return Complex.acsch(this); }

  public equals(v: ComplexType): boolean {
    return Complex.equals(this, v, this.epsilon);
  }

  public toPolar(): [number, number] {
    return Complex.toPolar(this);
  }

  public toVector(): [number, number] {
    return Complex.toVector(this);
  }

  public toString(): string {
    return Complex.toString(this);
  }

  public static isZero(v: ComplexType): boolean {
    const z = Complex.from(v);
    return z.re === 0 && z.im === 0;
  }

  public static isInfinite(v: ComplexType): boolean {
    const z = Complex.from(v);
    return Number.isFinite(z.re) === false ||
           Number.isFinite(z.im) === false;
  }

  public static isNaN(v: ComplexType): boolean {
    const z = Complex.from(v);
    return Number.isNaN(z.re) || Number.isNaN(z.im);
  }

  public static abs(v: ComplexType): number {
    const z = Complex.from(v);
    return Math.hypot(z.re, z.im);
  }

  public static arg(v: ComplexType): number {
    const z = Complex.from(v);
    return Math.atan2(z.im, z.re);
  }

  public static sign(v: ComplexType): Complex {
    const z = Complex.from(v);
    const abs = z.abs();
    return Complex.from(
      z.re / abs,
      z.im / abs,
    );
  }

  public static conj(v: ComplexType): Complex {
    const z = Complex.from(v);
    return Complex.from(z.re, -z.im);
  }

  public static neg(v: ComplexType): Complex {
    const z = Complex.from(v);
    return Complex.from(-z.re, -z.im);
  }

  public static inv(v: ComplexType): Complex {
    // (1 / (a + bi)) * ((a - bi) / (a - bi))
    // (a + bi) * (a - bi) = a^2 - abi + abi - bi * bi = a^2 + b^2
    // (a - bi) / (a^2 + b^2)
    const z = Complex.from(v);

    if (z.im === 0) {
      return Complex.from(1 / z.re, 0);
    }

    const abs2 = Math.hypot(z.re, z.im) ** 2;
    return Complex.from(
       z.re / abs2,
      -z.im / abs2
    );
  }

  public static add(v1: ComplexType, v2: ComplexType): Complex {
    const z1 = Complex.from(v1);
    const z2 = Complex.from(v2);
    return Complex.from(
      z1.re + z2.re,
      z1.im + z2.im
    );
  }

  public static sub(v1: ComplexType, v2: ComplexType): Complex {
    const z1 = Complex.from(v1);
    const z2 = Complex.from(v2);
    return Complex.from(
      z1.re - z2.re,
      z1.im - z2.im
    );
  }

  public static mul(v1: ComplexType, v2: ComplexType): Complex {
    // (a + bi)(c + di) = (ac - bd) + (ad + bc)i
    const z1 = Complex.from(v1);
    const z2 = Complex.from(v2);

    if (z1.re === 0 && z2.re === 0) {
      return Complex.from(-z1.im * z2.im, 0);
    }
    if (z1.im === 0 && z2.im === 0) {
      return Complex.from(z1.re * z2.re, 0);
    }

    return Complex.from(
      z1.re * z2.re - z1.im * z2.im,
      z1.re * z2.im + z1.im * z2.re
    );
  }

  public static div(v1: ComplexType, v2: ComplexType): Complex {
    const z1 = Complex.from(v1);
    const z2 = Complex.from(v2);

    if (z1.re === 0 && z2.re === 0) {
      return Complex.from(z1.im / z2.im, 0);
    }
    if (z1.im === 0 && z2.im === 0) {
      return Complex.from(z1.re / z2.re, 0);
    }
    if (z2.im === 0) {
      return Complex.from(z1.re / z2.re, z1.im / z2.re);
    }

    const d = Math.hypot(z2.re, z2.im) ** 2;
    return Complex.from(
      (z1.re * z2.re + z1.im * z2.im) / d,
      (z1.im * z2.re - z1.re * z2.im) / d
    );
  }

  public static exp(v: ComplexType): Complex {
    // e^(a + bi) = e^a * e^bi = e^a * (cos(b) + i sin(b))
    const z = Complex.from(v);
    const eRe = Math.exp(z.re);
    return Complex.from(
      eRe * Math.cos(z.im),
      eRe * Math.sin(z.im),
    );
  }

  public static log(v: ComplexType): Complex {
    const [r, phi] = Complex.toPolar(v);
    return Complex.from(
      Math.log(r),
      phi
    );
  }

  public static log2(v: ComplexType): Complex {
    const [r, phi] = Complex.toPolar(v);
    return Complex.from(
      Math.log2(r),
      Math.LOG2E * phi,
    );
  }

  public static log10(v: ComplexType): Complex {
    const [r, phi] = Complex.toPolar(v);
    return Complex.from(
      Math.log10(r),
      Math.LOG10E * phi,
    );
  }

  public static pow(v: ComplexType, e: ComplexType): Complex {
    const z1 = Complex.from(v);
    const z2 = Complex.from(e);

    const [ a, b ] = [ z1.re, z1.im ];
    const [ c, d ] = [ z2.re, z2.im ];

    if (z2.isZero()) {
      return Complex.one;
    }

    if (z1.isZero() && c > 0 && d !== 0) {
      return Complex.from(0);
    }

    if (z1.re >= 0 && b === 0 && d === 0) {
      return Complex.from(z1.re ** z2.re);
    }

    if (a === 0 && Number.isInteger(c) && d === 0) {
      // i^n - purely imaginary number
      const ipow = b ** c;
      switch (Math.abs(c) % 4) {
        case 0: return Complex.from(ipow, 0);
        case 1: return Complex.from(0, ipow);
        case 2: return Complex.from(-ipow, 0);
        case 3: return Complex.from(0, -ipow);
      }
    }

    // sqrt
    if (c === 0.5 && d === 0) {
      if (a < 0 && b === 0) {
        return Complex.from(0, Math.sqrt(-a));
      }
    }

    const z1Abs2 = Math.hypot(z1.re, z1.im) ** 2;
    const z1Arg = Math.atan2(z1.im, z1.re);
    const zoAbs = z1Abs2 ** (z2.re / 2) * Math.exp(-z2.im * z1Arg);
    const zoArg = z2.re * z1Arg + z2.im / 2 * Math.log(z1Abs2);

    return Complex.from(
      zoAbs * Math.cos(zoArg),
      zoAbs * Math.sin(zoArg)
    );
  }

  public static sqrt(v: ComplexType): Complex {
    return Complex.pow(v, 0.5);
  }

  public static sin(v: ComplexType): Complex {
    // sin(a+bi) = sin(a)cosh(b) + icos(a)sinh(b)
    // https://proofwiki.org/wiki/Sine_of_Complex_Number
    const z = Complex.from(v);
    return Complex.from(
      Math.sin(z.re) * Math.cosh(z.im),
      Math.cos(z.re) * Math.sinh(z.im)
    );
  }

  public static asin(v: ComplexType): Complex {
    // asin(z) = -i * ln(zi + sqrt(1 - z^2))
    // ref. https://en.wikipedia.org/wiki/Inverse_trigonometric_functions#Logarithmic_forms
    const z = Complex.from(v);

    const C = Complex;
    const i = C.i;

    return i.neg().mul(
      C.log(
        z.mul(i).add(
          C.sqrt(
            C.one.sub(z.pow(2))
          )
        )
      )
    );
  }

  public static sinh(v: ComplexType): Complex {
    // sinh(a + bi) = sinh(x)cos(y) + i cosh(x)sin(y)
    // ref. https://en.wikipedia.org/wiki/Hyperbolic_function#Hyperbolic_functions_for_complex_numbers
    const z = Complex.from(v);
    return Complex.from(
      Math.sinh(z.re) * Math.cos(z.im),
      Math.cosh(z.re) * Math.sin(z.im)
    );
  }

  public static asinh(v: ComplexType): Complex {
    // arcsinh z = i * arcsin(−iz),
    const z = Complex.from(v);
    const C = Complex;
    const i = C.i;
    return i.mul(C.asin(i.neg().mul(z)));
  }

  public static cos(v: ComplexType): Complex {
    // cos(a+bi) = cos(a)cosh(b) + isin(a)sinh(b)
    // https://proofwiki.org/wiki/Cosine_of_Complex_Number
    const z = Complex.from(v);
    return Complex.from(
       Math.cos(z.re) * Math.cosh(z.im),
      -Math.sin(z.re) * Math.sinh(z.im)
    );
  }

  public static acos(v: ComplexType): Complex {
    // acos(z) = -i * ln(z + sqrt(z^2 - 1))
    //         = pi/2 + i * ln(zi + sqrt(1 - z^2))
    //         = pi/2 - asin(z)
    // ref. https://en.wikipedia.org/wiki/Inverse_trigonometric_functions#Logarithmic_forms
    const z = Complex.from(v);
    return Complex.from(Math.PI / 2).sub(z.asin());
  }

  public static cosh(v: ComplexType): Complex {
    // cosh(a + bi) = cosh(x)cos(y) + i sinh(x)sin(y)
    // ref. https://en.wikipedia.org/wiki/Hyperbolic_function#Hyperbolic_functions_for_complex_numbers
    const z = Complex.from(v);
    return Complex.from(
      Math.cosh(z.re) * Math.cos(z.im),
      Math.sinh(z.re) * Math.sin(z.im)
    );
  }

  public static acosh(v: ComplexType): Complex {
    // arccosh(z) = ln(z + sqrt(z + 1) * sqrt(z − 1))
    const z = Complex.from(v);
    const C = Complex;
    return C.log(
      z.add(
        C.sqrt(z.add(1)).mul(
          C.sqrt(z.sub(1))
        )
      )
    );
  }

  public static tan(v: ComplexType): Complex {
    const z = Complex.from(v);
    return z.sin().div(z.cos());
  }

  public static atan(v: ComplexType): Complex {
    // atan(z) = i / 2 * ln((i + z) / (i - z))
    //         = i / 2 * [ln(1 - iz) - ln(1 + iz)]
    // ref. https://en.wikipedia.org/wiki/Inverse_trigonometric_functions#Logarithmic_forms
    const z = Complex.from(v);
    const C = Complex;
    const i = C.i;
    const z1 = C.log(C.one.sub(i.mul(z)));
    const z2 = C.log(C.one.add(i.mul(z)));
    return i.div(2).mul(z1.sub(z2));
  }

  public static tanh(v: ComplexType): Complex {
    // tanh(z) = sinh(z) / cosh(z)
    const z = Complex.from(v);
    const C = Complex;
    return C.sinh(z).div(C.cosh(z));
  }

  public static atanh(v: ComplexType): Complex {
    // atanh(z) = 1 / 2 * (ln(1 + z) - ln(1 - z))
    const z = Complex.from(v);
    const C = Complex;
    return C.one.div(2).mul(
      C.sub(
        C.log(C.one.add(z)),
        C.log(C.one.sub(z))
      )
    );
  }

  public static cot(v: ComplexType): Complex {
    const z = Complex.from(v);
    return z.cos().div(z.sin());
  }

  public static acot(v: ComplexType): Complex {
    // atan(z) = i / 2 * ln((i - z) / (i + z))
    //         = i / 2 * [ln(1 - i/z) - ln(1 + i/z)]
    // ref. https://en.wikipedia.org/wiki/Inverse_trigonometric_functions#Logarithmic_forms
    const z = Complex.from(v);
    const C = Complex;
    const i = C.i;
    return i.div(2).mul(
      C.sub(
        C.log(C.one.sub(i.div(z))),
        C.log(C.one.add(i.div(z)))
      )
    );
  }

  public static coth(v: ComplexType): Complex {
    // tanh(z) = cosh(z) / sinh(z)
    const z = Complex.from(v);
    const C = Complex;
    return C.cosh(z).div(C.sinh(z));
  }

  public static acoth(v: ComplexType): Complex {
    // acoth(z) = 1 / 2 * (ln(1 + 1 / z) - ln(1 - 1 /z))
    const z = Complex.from(v);
    const C = Complex;
    return C.one.div(2).mul(
      C.sub(
        C.log(C.one.add(C.one.div(z))),
        C.log(C.one.sub(C.one.div(z)))
      )
    );
  }

  public static sec(v: ComplexType): Complex {
    const z = Complex.from(v);
    const C = Complex;
    return C.one.div(C.cos(z));
  }

  public static asec(v: ComplexType): Complex {
    // asec(z) = -i * ln(sqrt(1 / z^2 - 1) + 1 / z))
    // ref. https://en.wikipedia.org/wiki/Inverse_trigonometric_functions#Logarithmic_forms
    const z = Complex.from(v);
    const C = Complex;
    const i = C.i;

    return i.neg().mul(
      C.log(
        C.sqrt(
          C.one.div(z.pow(2)).sub(1)
        ).add(
          z.inv()
        )
      )
    );
  }

  public static sech(v: ComplexType): Complex {
    // sech(z) = 1 / cosh(z)
    const z = Complex.from(v);
    const C = Complex;
    return C.one.div(C.cosh(z));
  }

  public static asech(v: ComplexType): Complex {
    // http://mathworld.wolfram.com/InverseHyperbolicFunctions.html
    const z = Complex.from(v);
    const C = Complex;
    return C.log(
      C.mul(
        C.sqrt(C.one.div(z).sub(1)),
        C.sqrt(C.one.div(z).add(1))
      ).add(
        C.one.div(z)
      )
    );
  }

  public static csc(v: ComplexType): Complex {
    // csc(z) = 1 / sin(z)
    const z = Complex.from(v);
    const C = Complex;
    return C.one.div(C.sin(z));
  }

  public static acsc(v: ComplexType): Complex {
    // acsc(z) = -i * ln(sqrt(1 - 1 / z^2) + i / z))
    // ref. https://en.wikipedia.org/wiki/Inverse_trigonometric_functions#Logarithmic_forms
    const z = Complex.from(v);
    const C = Complex;
    const i = C.i;

    return i.neg().mul(
      C.log(
        C.sqrt(
          C.one.sub(
            C.one.div(z.pow(2))
          )
        ).add(
          i.div(z)
        )
      )
    );
  }

  public static csch(v: ComplexType): Complex {
    // sech(z) = 1 / sinh(z)
    const z = Complex.from(v);
    const C = Complex;
    return C.one.div(C.sinh(z));
  }

  public static acsch(v: ComplexType): Complex {
    // acsch(z) = ln(sqrt(1 + 1 / z^2) + 1 / z)
    const z = Complex.from(v);
    const C = Complex;
    return C.log(
      C.sqrt(
        C.one.add(
          C.one.div(z.pow(2))
        )
      ).add(
        C.one.div(z)
      )
    );
  }

  public static equals(v1: ComplexType, v2: ComplexType, epsilon = Number.EPSILON): boolean {
    const z1 = Complex.from(v1);
    const z2 = Complex.from(v2);

    const reEq = z1.re === z2.re || Math.abs(z1.re - z2.re) < epsilon;
    const imEq = z1.im === z2.im || Math.abs(z1.im - z2.im) < epsilon;

    return reEq && imEq;
  }

  public static toPolar(v: ComplexType): [number, number] {
    const z = Complex.from(v);
    return [ z.abs(), z.arg() ];
  }

  public static toVector(v: ComplexType): [number, number] {
    const z = Complex.from(v);
    return [ z.re, z.im ];
  }

  // TODO: format

  public static toString(v: ComplexType): string {
    const z = Complex.from(v);

    if (z.re === 0 && z.im === 0) {
      return '0';
    } else if (z.im === 0) {
      return `${z.re}`;
    } else if (z.re === 0) {
      return `${z.im}i`;
    } else {
      const im = Math.abs(z.im);
      const imsign = z.im < 0 ? '-' : '+';
      return `${z.re} ${imsign} ${im}i`;
    }
  }
}
