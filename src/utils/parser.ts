import { Complex } from "../Complex";
import { ParserExit } from "../Exceptions/ParserExit";
import { IComplex, ParserOptions, ParserParams } from "../types";

export function parser(a: ParserOptions | ParserParams, b?: ParserOptions | ParserParams): IComplex | Complex {
	const z = { re: 0, im: 0 };

	if (String(a).match(/\d+/) && String(b).match(/\d+/)) {
		z.re = <number>a;
		z.im = <number>b;
		return z;
	}
	if (a === undefined || a === null) {
		z.re = 0;
		z.im = 0;
	} else if (b !== undefined) {
		z.re = (<ParserOptions>a).re!;
		z.im = (<ParserOptions>b).im!;
	} else {
		switch (typeof a) {
			case "object":
				if (Array.isArray(a)) {
					if (a.length === 2) {
						// Quick array check
						// eslint-disable-next-line prefer-destructuring
						z.re = a[0];
						// eslint-disable-next-line prefer-destructuring
						z.im = a[1];
					} else {
						throw new ParserExit("Invalid Parameter");
					}
				} else if (a.im && a.re) {
					z.re = a.re;
					z.im = a.im;
				} else if (a.abs && a.arg) {
					if (!Number.isFinite(a.abs) && Number.isFinite(a.arg)) {
						return new Complex(Infinity, Infinity);
					}
					z.re = a.abs * Math.cos(a.arg);
					z.im = a.abs * Math.sin(a.arg);
				} else if (a.r && a.phi) {
					if (!Number.isFinite(a.r) && Number.isFinite(a.phi)) {
						return new Complex(Infinity, Infinity);
					}
					z.re = a.r * Math.cos(a.phi);
					z.im = a.r * Math.sin(a.phi);
				} else {
					throw new ParserExit("Invalid Parameter");
				}
				break;

			case "string":
				z.im = 0;
				z.re = 0;

				// eslint-disable-next-line no-case-declarations
				const tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
				// eslint-disable-next-line no-case-declarations
				let plus = 1;
				// eslint-disable-next-line no-case-declarations
				let minus = 0;

				if (tokens === null) {
					throw new ParserExit("Invalid Parameter");
				}

				for (let i = 0; i < tokens.length; i++) {
					const c = tokens[i];

					if (c === " " || c === "\t" || c === "\n") {
						/* void */
					} else if (c === "+") {
						plus++;
					} else if (c === "-") {
						minus++;
					} else if (c === "i" || c === "I") {
						if (plus + minus === 0) {
							throw new ParserExit("Invalid Parameter");
						}

						if (tokens[i + 1] !== " " && !Number.isNaN(tokens[i + 1])) {
							z.im += parseFloat((minus % 2 ? "-" : "") + tokens[i + 1]);
							i++;
						} else {
							z.im += parseFloat(`${minus % 2 ? "-" : ""}1`);
						}
						plus = 0;
						minus = 0;
					} else {
						if (plus + minus === 0 || Number.isNaN(c)) {
							throw new ParserExit("Invalid Parameter");
						}

						if (tokens[i + 1] === "i" || tokens[i + 1] === "I") {
							z.im += parseFloat((minus % 2 ? "-" : "") + c);
							i++;
						} else {
							z.re += parseFloat((minus % 2 ? "-" : "") + c);
						}
						plus = 0;
						minus = 0;
					}
				}

				// Still something on the stack
				if (plus + minus > 0) {
					throw new ParserExit("Invalid Parameter");
				}
				break;

			case "number":
				z.im = 0;
				z.re = a;
				break;

			default:
				throw new ParserExit("Invalid Parameter");
		}
	}

	if (Number.isNaN(z.re) || Number.isNaN(z.im)) {
		// If a calculation is NaN, we treat it as NaN and don't throw
		// parser_exit();
	}
	if (z.re === undefined && [Infinity, NaN].includes(<number>a)) {
		z.re = <number>a;
	}
	if (z.im === undefined && [Infinity, NaN].includes(<number>b)) {
		z.im = <number>b;
	}
	return z;
}
