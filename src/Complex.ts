import { IComplex } from "./types";
import { EPSILON } from "./utils/constants";
import { cosh } from "./utils/cosh";
import { cosm1 } from "./utils/cosm1";
import { hypot } from "./utils/hypot";
import { logHypot } from "./utils/logHypot";
import { parser } from "./utils/parser";
import { sinh } from "./utils/sinh";

export class Complex {
	re: number;

	im: number;

	constructor(a: number, b?: number) {
		const z = <IComplex>parser(a, b);
		this.re = z.re;
		this.im = z.im;
	}

	public abs(): number {
		return hypot(this.re, this.im);
	}

	public sign(): Complex {
		return new Complex(this.re / this.abs(), this.im / this.abs());
	}

	public isNaN(): boolean {
		return !(String(this.re).match(/\d+/) && String(this.im).match(/\d+/));
	}

	public isFinite(): boolean {
		return Number.isFinite(this.re) && Number.isFinite(this.im);
	}

	public isInfinite(): boolean {
		return !(this.isNaN() || this.isFinite());
	}

	public add(a: number, b: number): Complex {
		const z = new Complex(a, b);
		if (this.isInfinite() && z.isInfinite) {
			return new Complex(NaN, NaN);
		}

		if (this.isInfinite() || z.isInfinite()) {
			return new Complex(Infinity, Infinity);
		}

		return new Complex(this.re + z.re, this.im + z.im);
	}

	public sub(a: number, b: number): Complex {
		const z = new Complex(a, b);
		if (this.isInfinite() && z.isInfinite) {
			return new Complex(NaN, NaN);
		}

		if (this.isInfinite() || z.isInfinite()) {
			return new Complex(Infinity, Infinity);
		}

		return new Complex(this.re - z.re, this.im - z.im);
	}

	public isZero(): boolean {
		return this.re === 0 && this.im === 0;
	}

	public mul(a: number, b: number): Complex {
		const z = new Complex(a, b);
		if ((this.isInfinite() && z.isZero) || (this.isZero() && z.isInfinite())) {
			return new Complex(NaN, NaN);
		}
		if (this.isInfinite() || z.isInfinite()) {
			return new Complex(Infinity, Infinity);
		}

		if (z.im === 0 && this.im === 0) {
			return new Complex(this.re * z.re, 0);
		}

		return new Complex(this.re * z.re - this.im * z.im, this.re * z.im + this.im * z.re);
	}

	public div(a: number, b: number): Complex {
		const z = new Complex(a, b);
		if ((this.isZero() && z.isZero) || (this.isInfinite() && z.isInfinite())) {
			return new Complex(NaN, NaN);
		}

		if (this.isInfinite() || z.isInfinite()) {
			return new Complex(Infinity, Infinity);
		}

		if (this.isZero() || z.isInfinite()) {
			return new Complex(0, 0);
		}
		let t;
		let x;

		if (z.re === 0) {
			return new Complex(this.re / z.re, this.im / z.re);
		}
		if (Math.abs(z.re) < Math.abs(z.im)) {
			x = z.re / z.im;
			t = z.re * x + z.im;
			return new Complex((this.re * x + this.im) / t, (this.im * x - this.re) / t);
		}
		x = z.im / z.re;
		t = z.im * x + z.re;
		return new Complex((this.re + this.im * x) / t, (this.im - this.re * x) / t);
	}

	public pow(a: number, b: number): Complex {
		const z = new Complex(a, b);
		if (z.isZero()) {
			return new Complex(1, 0);
		}

		if (z.im === 0) {
			if (this.im === 0) {
				return new Complex(this.re ** z.re, 0);
			}
			if (this.re === 0) {
				// eslint-disable-next-line default-case
				switch (((z.re % 4) + 4) % 4) {
					case 0:
						return new Complex(this.im ** z.re, 0);
					case 1:
						return new Complex(0, this.im ** z.re);
					case 2:
						return new Complex(-(this.im ** z.re), 0);
					case 3:
						return new Complex(0, -(this.im ** z.re));
				}
			}
		}

		if (this.re === 0 && this.im === 0 && z.re > 0 && z.im >= 0) {
			return new Complex(0, 0);
		}

		const arg = Math.atan2(this.im, this.re);
		const loh = logHypot(this.re, this.im);
		const aa = Math.exp(z.re * loh - z.im * arg);
		const bb = z.im * loh + z.re * arg;
		return new Complex(aa * Math.cos(bb), aa * Math.sin(bb));
	}

	public sqrt(): Complex {
		let re;
		let im;

		if (this.re >= 0) {
			if (this.im === 0) {
				return new Complex(Math.sqrt(this.re), 0);
			}
			re = 0.5 * Math.sqrt(2 * (this.abs() + this.re));
		} else {
			re = Math.abs(this.im) / Math.sqrt(2 * (this.abs() - this.re));
		}

		if (this.re <= 0) {
			im = 0.5 * Math.sqrt(2 * (this.abs() - this.re));
		} else {
			im = Math.abs(this.im) / Math.sqrt(2 * (this.abs() + this.re));
		}
		return new Complex(re, this.im < 0 ? -im : im);
	}

	public exp(): Complex {
		const tmp = Math.exp(this.re);
		if (this.im === 0) {
			return new Complex(tmp, 0);
		}
		return new Complex(tmp * Math.cos(this.im), tmp * Math.sin(this.im));
	}

	public expm1(): Complex {
		return new Complex(
			Math.expm1(this.re) * Math.cos(this.im) + cosm1(this.im),
			Math.exp(this.re) * Math.sin(this.im),
		);
	}

	public log(): Complex {
		if (this.re === 0 && this.im === 0) {
			return new Complex(Math.log(this.re), 0);
		}
		return new Complex(logHypot(this.re, this.im), Math.atan2(this.im, this.re));
	}

	public arg(): number {
		return Math.atan2(this.im, this.re);
	}

	public sin(): Complex {
		return new Complex(Math.sin(this.re) * cosh(this.im), Math.cos(this.re) * sinh(this.im));
	}

	public cos(): Complex {
		return new Complex(Math.cos(this.re) * cosh(this.im), -Math.sin(this.re) * sinh(this.im));
	}

	public tan(): Complex {
		const a = 2 * this.re;
		const b = 2 * this.im;
		const d = Math.cos(a) + cosh(b);
		return new Complex(Math.sign(a) / d, sinh(b) / d);
	}

	public cot(): Complex {
		const a = 2 * this.re;
		const b = 2 * this.im;
		const d = Math.cos(a) - cosh(b);
		return new Complex(-Math.sin(a) / d, sinh(b) / d);
	}

	public sec(): Complex {
		const a = this.re;
		const b = this.im;
		const d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a);
		return new Complex((Math.cos(a) * cosh(b)) / d, (Math.sin(a) * sinh(b)) / d);
	}

	public csc(): Complex {
		const a = this.re;
		const b = this.im;
		const d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);
		return new Complex((Math.sin(a) * cosh(b)) / d, (-Math.cos(a) * sinh(b)) / d);
	}

	public asin(): Complex {
		const t1 = new Complex(this.im ** 2 - this.re ** 2 + 1, -2 * this.re * this.im).sqrt();
		const t2 = new Complex(t1.re - this.im, t1.im + this.re).log();
		return new Complex(t2.im, -t2.re);
	}

	public acos(): Complex {
		const t1 = new Complex(this.im ** 2 - this.re ** 2 + 1, -2 * this.re * this.im).sqrt();
		const t2 = new Complex(t1.re - this.im, t1.im + this.re).log();
		return new Complex(Math.PI / 2 - t2.im, t2.re);
	}

	public atan(): Complex {
		if (this.re === 0) {
			if (this.im === 1) {
				return new Complex(0, Infinity);
			}
			if (this.im === -1) {
				return new Complex(0, -Infinity);
			}
		}
		const d = this.re ** 2 + (1.0 - this.im) ** 2;
		const t1 = new Complex((1 - this.im ** 2 - this.re ** 2) / d, (-2 * this.re) / d).log();
		return new Complex(-0.5 * t1.im, 0.5 * t1.re);
	}

	public acot(): Complex {
		if (this.im === 0) {
			return new Complex(Math.atan2(1, this.re), 0);
		}
		const d = this.re ** 2 + this.im ** 2;
		return d !== 0
			? new Complex(this.re / d, -this.im / d).atan()
			: new Complex(this.re !== 0 ? this.re / 0 : 0, this.im !== 0 ? -this.im / 0 : 0).atan();
	}

	public asec(): Complex {
		if (this.isZero()) {
			return new Complex(0, Infinity);
		}
		const d = this.re ** 2 + this.im ** 2;
		return d !== 0
			? new Complex(this.re / d, -this.im / d).acos()
			: new Complex(this.re !== 0 ? this.re / 0 : 0, this.im !== 0 ? -this.im / 0 : 0).acos();
	}

	public acsc(): Complex {
		if (this.isZero()) {
			return new Complex(Math.PI / 2, Infinity);
		}

		const d = this.re ** 2 + this.im ** 2;
		return d !== 0
			? new Complex(this.re / d, -this.im / d).asin()
			: new Complex(this.re !== 0 ? this.re / 0 : 0, this.im !== 0 ? -this.im / 0 : 0).asin();
	}

	public sinh(): Complex {
		return new Complex(sinh(this.re) * Math.cos(this.im), cosh(this.re) * Math.sin(this.im));
	}

	public cosh(): Complex {
		return new Complex(cosh(this.re) * Math.cos(this.im), sinh(this.re) * Math.sin(this.im));
	}

	public tanh(): Complex {
		return new Complex(
			sinh(this.re) / (cosh(this.re) + Math.cos(this.im)),
			Math.sin(this.im) / (cosh(this.re) + Math.cos(this.im)),
		);
	}

	public coth(): Complex {
		return new Complex(
			sinh(this.re) / (cosh(this.re) - Math.cos(this.im)),
			-Math.sin(this.im) / (cosh(this.re) - Math.cos(this.im)),
		);
	}

	public csch(): Complex {
		return new Complex(
			(-2 * sinh(this.re) * Math.cos(this.im)) / (Math.cos(2 * this.im) - cosh(2 * this.re)),
			(2 * cosh(this.re) * Math.sin(this.im)) / (Math.cos(2 * this.im) - cosh(2 * this.re)),
		);
	}

	public sech(): Complex {
		return new Complex(
			(2 * cosh(this.re) * Math.cos(this.im)) / (Math.cos(2 * this.im) + cosh(2 * this.re)),
			(-2 * sinh(this.re) * Math.sin(this.im)) / (Math.cos(2 * this.im) + cosh(2 * this.re)),
		);
	}

	public asinh(): Complex {
		let tmp = this.im;
		this.im = -this.re;
		this.re = tmp;
		const res = this.asin();

		this.re = -this.im;
		this.im = tmp;
		tmp = res.re;

		res.re = -res.im;
		res.im = tmp;
		return res;
	}

	public acosh(): Complex {
		const res = this.acos();
		if (res.im <= 0) {
			const tmp = res.re;
			res.re = -res.im;
			res.im = tmp;
		} else {
			const tmp = res.im;
			res.im = -res.re;
			res.re = tmp;
		}
		return res;
	}

	public atanh(): Complex {
		const noIM = this.re > 1 && this.im === 0;
		const oneMinus = 1 - this.re;
		const onePlus = 1 + this.re;
		const d = oneMinus * oneMinus + this.im ** 2;

		const x =
			d !== 0
				? new Complex((onePlus * oneMinus - this.im ** 2) / d, (this.im * oneMinus + onePlus * this.im) / d)
				: new Complex(this.re !== -1 ? this.re / 0 : 0, this.im !== 0 ? this.im / 0 : 0);

		const temp = x.re;
		x.re = logHypot(x.re, x.im) / 2;
		x.im = Math.atan2(x.im, temp) / 2;
		if (noIM) {
			x.im = -x.im;
		}
		return x;
	}

	public acoth(): Complex {
		if (this.isZero()) {
			return new Complex(0, Math.PI / 2);
		}

		const d = this.re ** 2 + this.im ** 2;
		return d !== 0
			? new Complex(this.re / d, -this.im / d).atanh()
			: new Complex(this.re !== 0 ? this.re / 0 : 0, this.im !== 0 ? -this.im / 0 : 0).atanh();
	}

	public acsch(): Complex {
		if (this.im === 0) {
			return new Complex(this.re !== 0 ? Math.log(this.re + Math.sqrt(this.re ** 2 + 1)) : Infinity, 0);
		}
		const d = this.re ** 2 + this.im ** 2;
		return d !== 0
			? new Complex(this.re / d, -this.im / d).asinh()
			: new Complex(this.re !== 0 ? this.re / 0 : 0, this.im !== 0 ? -this.im / 0 : 0).asinh();
	}

	public asech(): Complex {
		if (this.isZero()) {
			return new Complex(Infinity, Infinity);
		}
		const d = this.re ** 2 + this.im ** 2;
		return d !== 0
			? new Complex(this.re / d, -this.im / d).acosh()
			: new Complex(this.re !== 0 ? this.re / 0 : 0, this.im !== 0 ? -this.im / 0 : 0).acosh();
	}

	public inverse(): Complex {
		if (this.isZero()) {
			return new Complex(Infinity, Infinity);
		}
		if (this.isInfinite()) {
			return new Complex(0, 0);
		}
		const d = this.re ** 2 + this.im ** 2;
		return new Complex(this.re / d, -this.im / d);
	}

	public conjugate(): Complex {
		return new Complex(this.re, -this.im);
	}

	public neg(): Complex {
		return new Complex(-this.re, -this.im);
	}

	public ceil(places?: number): Complex {
		const pl = 10 ** (places || 0);
		return new Complex(Math.ceil(this.re * pl) / pl, Math.ceil(this.im * pl) / pl);
	}

	public floor(places?: number): Complex {
		const pl = 10 ** (places || 0);
		return new Complex(Math.floor(this.re * pl) / pl, Math.floor(this.im * pl) / pl);
	}

	public round(places?: number): Complex {
		const pl = 10 ** (places || 0);
		return new Complex(Math.round(this.re * pl) / pl, Math.round(this.im * pl) / pl);
	}

	public equals(a: number, b: number): boolean {
		const z = new Complex(a, b);

		return Math.abs(z.re - this.re) <= EPSILON && Math.abs(z.im - this.im) <= EPSILON;
	}

	public clone(): Complex {
		return new Complex(this.re, this.im);
	}

	public toString(): string {
		let ret = "";
		if (this.isNaN()) {
			return "NaN";
		}
		if (this.isInfinite()) {
			return "Infinity";
		}
		// If is real number
		if (this.im === 0) {
			return ret + this.re;
		}
		if (this.re !== 0) {
			ret += this.re;
			ret += " ";
			if (this.im < 0) {
				this.im = -this.im;
				ret += "-";
			} else {
				ret += "+";
			}
			ret += " ";
		} else if (this.im < 0) {
			this.im = -this.im;
			ret += "-";
		}
		if (this.im !== 1) {
			// b is the absolute imaginary part
			ret += this.im;
		}
		return `${ret}i`;
	}

	public toVector(): number[] {
		return [this.re, this.im];
	}

	public valueOf(): number | null {
		return this.im === 0 ? this.re : null;
	}
}
