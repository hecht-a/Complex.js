import { Complex } from "../src/Complex";

describe(Complex, () => {
	describe("#mul", () => {
		it("should multiply a complex by a other or by a scalar", () => {
			expect(Complex.I.mul(new Complex(Math.PI).exp()).toString()).toStrictEqual("23.140692632779267i");
			expect(new Complex(1, 4).mul(3).toString()).toStrictEqual("3 + 12i");
			expect(Complex.INFINITY.mul("i").toString()).toStrictEqual("Infinity");
			expect(new Complex("4i").mul("-5i").toString()).toStrictEqual("20");
			expect(new Complex("3 - 6i").mul("i").toString()).toStrictEqual("6 + 3i");
			expect(new Complex(Infinity).mul("0").toString()).toStrictEqual("NaN");
			expect(new Complex(Infinity).mul(3).toString()).toStrictEqual("Infinity");
			expect(new Complex("i").mul("i").toString()).toStrictEqual("-1");
			expect(new Complex("++++--+1 + 4i").mul("3 + 2i").toString()).toStrictEqual("-5 + 14i");
			expect(new Complex("2 + 3i").mul("4 + 5i").toString()).toStrictEqual("-7 + 22i");
			expect(new Complex("3 + 4i").mul("2 - 5i").toString()).toStrictEqual("26 - 7i");
			expect(new Complex(1, 1).mul({ abs: 1, arg: Math.PI / 2 }).toString()).toStrictEqual(
				"-0.9999999999999999 + i",
			);
		});
	});

	describe("#add", () => {
		it("should add a complex to an other", () => {
			expect(new Complex("4 + 3i").add("-3 - 2i").toString()).toStrictEqual("1 + i");
			expect(new Complex("3i").add("-2i").toString()).toStrictEqual("i");
			expect(new Complex("4").add("-3").toString()).toStrictEqual("1");
			expect(new Complex("3 + 4i").add("5 - 7i").toString()).toStrictEqual("8 - 3i");
			expect(new Complex(Infinity).add(Infinity).toString()).toStrictEqual("NaN");
			expect(new Complex("3 + 4i").add("5 - i").toString()).toStrictEqual("8 + 3i");
			expect(new Complex({ re: 1, im: 2 }).add("4 + 6i").toString()).toStrictEqual("5 + 8i");
			expect(new Complex("1e3i").add("3e-3 + 1e2i").toString()).toStrictEqual("0.003 + 1100i");
			expect(
				new Complex(1, 1)
					.sub(0, 1)
					.mul({ abs: 1, arg: Math.PI / 2 })
					.add("i")
					.toString(),
			).toStrictEqual("6.123233995736766e-17 + 2i");
		});
	});

	describe("#sqrt", () => {
		it("should calculate the square root of a scalar or a complex", () => {
			expect(new Complex("9").sqrt().toString()).toStrictEqual("3");
			expect(new Complex("-9").sqrt().toString()).toStrictEqual("3i");
			expect(new Complex("-36").sqrt().toString()).toStrictEqual("6i");
			expect(new Complex("36i").sqrt().toString()).toStrictEqual("4.242640687119285 + 4.242640687119285i");
			expect(new Complex("-36i").sqrt().toString()).toStrictEqual("4.242640687119285 - 4.242640687119285i");
			expect(new Complex("36 + 36i").sqrt().toString()).toStrictEqual("6.59210468080686 + 2.730539163373364i");
			expect(new Complex("36 - 36i").sqrt().toString()).toStrictEqual("6.59210468080686 - 2.730539163373364i");
			expect(new Complex("-36 + 36i").sqrt().toString()).toStrictEqual("2.730539163373364 + 6.59210468080686i");
			expect(new Complex("-36 - 36i").sqrt().toString()).toStrictEqual("2.730539163373364 - 6.59210468080686i");
			expect(new Complex("0").sqrt().toString()).toStrictEqual("0");
		});
		expect(new Complex("1 + 4i").sqrt().toString()).toStrictEqual("1.600485180440241 + 1.2496210676876531i");
		expect(new Complex({ re: -3, im: 4 }).sqrt().toString()).toStrictEqual("1 + 2i");
		expect(new Complex({ re: 3, im: -4 }).sqrt().toString()).toStrictEqual("2 - i");
		expect(new Complex({ re: -3, im: -4 }).sqrt().toString()).toStrictEqual("1 - 2i");
		expect(new Complex("1 - 2i").sqrt().toString()).toStrictEqual("1.272019649514069 - 0.7861513777574233i");
	});

	describe("#div", () => {
		it("should divide a complex by an other complex or by a scalar", () => {
			expect(new Complex("4 + 2i").div("0").toString()).toStrictEqual("Infinity");
			expect(new Complex("0").div(Infinity).toString()).toStrictEqual("0");
			expect(new Complex(-Infinity).div("0").toString()).toStrictEqual("Infinity");
			expect(Complex.INFINITY.div(Infinity).toString()).toStrictEqual("NaN");
			expect(new Complex("4 + 2i").div("1 + i").toString()).toStrictEqual("3 - i");
			expect(new Complex("25").div("3 - 4i").toString()).toStrictEqual("3 + 4i");
			expect(new Complex("3 - 2i").div("i").toString()).toStrictEqual("-2 - 3i");
			expect(new Complex("6i").div("3 - 12i").toString()).toStrictEqual(
				"-0.47058823529411764 + 0.11764705882352941i",
			);
			expect(new Complex("4 + 16i").div("4.0000").toString()).toStrictEqual("1 + 4i");
			expect(new Complex({ re: 1, im: 1 }).div({ re: 3, im: 4 }).toString()).toStrictEqual(
				`${7 / 25} - ${1 / 25}i`,
			);
			expect(new Complex("2 + 8i").div(new Complex(1, 2)).toString()).toStrictEqual("3.6 + 0.8i");
			expect(new Complex("2 + 8i").div("2 + 8i").toString()).toStrictEqual("1");
			expect(new Complex(-Infinity).div("3").toString()).toStrictEqual("Infinity");
		});
	});

	describe("#sub", () => {
		it("should subtract a complex or a scalar to an other complex", () => {
			expect(new Complex(-Infinity).sub(-Infinity).toString()).toStrictEqual("NaN");
			expect(new Complex({ re: 5, im: 8 }).sub("4 + 6i").toString()).toStrictEqual("1 + 2i");
			expect(new Complex("3 + 4i").sub("2 - 5i").toString()).toStrictEqual("1 + 9i");
		});
	});

	describe("#log", () => {
		it("should calculte the logarithm of a complex or a scalar", () => {
			expect(new Complex(Math.E).log().toString()).toStrictEqual("1");
			// expect(new Complex("0").log().toString()).toStrictEqual("Infinity");
			expect(new Complex("-1").log().toString()).toStrictEqual(`${Math.PI}i`);
			expect(new Complex("i").log().toString()).toStrictEqual(`${Math.PI / 2}i`);
			expect(new Complex("3 + 2i").log().toString()).toStrictEqual(`${Math.log(13) / 2} + ${Math.atan2(2, 3)}i`);
			expect(new Complex("3 - 2i").log().toString()).toStrictEqual(`${Math.log(13) / 2} - ${Math.atan2(2, 3)}i`);
			expect(new Complex(-Complex.E.pow(2)).log().toString()).toStrictEqual("2 + 3.141592653589793i");
			expect(new Complex("4 + 3i").log().toString()).toStrictEqual("1.6094379124341003 + 0.6435011087932844i");
		});
	});

	describe("#exp", () => {
		it("should calculate exp of a complex or a scalar", () => {
			expect(new Complex("1").exp().toString()).toStrictEqual(`${Math.E}`);
			expect(new Complex("i").exp().toString()).toStrictEqual(`${Math.cos(1)} + ${Math.sin(1)}i`);
			expect(new Complex("3 - 2i").exp().toString()).toStrictEqual("-8.358532650935372 - 18.263727040666765i");
			expect(new Complex("4 + 3i").exp().toString()).toStrictEqual("-54.051758861078156 + 7.704891372731154i");
		});
	});

	describe("#expm1", () => {
		it("should calculate expm1 of a complex or a scalar", () => {
			expect(new Complex("3 - 2i").expm1().toString()).toStrictEqual("-9.358532650935372 - 18.263727040666765i");
			expect(new Complex("0").expm1().toString()).toStrictEqual("0");
			expect(new Complex("1e-6").expm1().toString()).toStrictEqual("0.0000010000005000001665");
			expect(new Complex("1e-5 + 5i").expm1().toString()).toStrictEqual(
				"-0.716334977900736 - 0.9589338639538314i",
			);
			expect(new Complex("1.2e-7 - 2e-6i").expm1().toString()).toStrictEqual(
				"1.1999800719976027e-7 - 0.000002000000239998681i",
			);
		});
	});

	describe("#pow", () => {
		it("should calculate pow of a complex or a scalar by an other complex or an other scalar", () => {
			expect(new Complex("3").pow("3").toString()).toStrictEqual("27");
			expect(new Complex("0").pow("1 + i").toString()).toStrictEqual("0");
			expect(new Complex("i").pow("0").toString()).toStrictEqual("1");
			expect(new Complex("87").pow("3").toString()).toStrictEqual("658503");
			expect(new Complex("i").pow("1").toString()).toStrictEqual("i");
			expect(new Complex("i").pow("2").toString()).toStrictEqual("-1");
			expect(new Complex("i").pow("3").toString()).toStrictEqual("-i");
			expect(new Complex("i").pow("4").toString()).toStrictEqual("1");
			expect(new Complex("i").pow("5").toString()).toStrictEqual("i");
			expect(new Complex("7").pow("2").toString()).toStrictEqual("49");
			expect(new Complex("0").pow("2").toString()).toStrictEqual("0");
			expect(new Complex("3i").pow("3i").toString()).toStrictEqual(
				"-0.008876640735623678 - 0.0013801328997494863i",
			);
			expect(new Complex("1 + 2i").pow(2).toString()).toStrictEqual("-2.999999999999999 + 4.000000000000001i");
			expect(new Complex("1 + 2i").pow("1 + 2i").toString()).toStrictEqual(
				"-0.22251715680177267 + 0.10070913113607541i",
			);
			expect(new Complex({ re: 1, im: 2 }).pow(new Complex(3, 4)).toString()).toStrictEqual(
				"0.1290095940744669 + 0.03392409290517001i",
			);
			expect(new Complex(1, 2).pow(2).toString()).toStrictEqual("-2.999999999999999 + 4.000000000000001i");
			expect(new Complex("i").pow(7).toString()).toStrictEqual("-i");
			expect(new Complex("0 - 0i").pow("2").toString()).toStrictEqual("0");
			expect(new Complex("0 - 0i").pow("0").toString()).toStrictEqual("1");
			expect(new Complex([-2, 0]).pow(2).toString()).toStrictEqual("4");
		});
	});

	describe("#abs", () => {
		it("should expect the absolute value of a complex or a scalar", () => {
			expect(new Complex({ re: 3, im: 4 }).abs().toString()).toStrictEqual("5");
			expect(new Complex({ re: 10, im: 24 }).abs().toString()).toStrictEqual("26");
			expect(new Complex(3, 4).abs().toString()).toStrictEqual("5");
			expect(new Complex(1, 1).sub(0, 1).abs().toString()).toStrictEqual("1");
		});
	});

	describe("#neg", () => {
		it("should expect the negative value of a complex or a scalar", () => {
			expect(new Complex({ re: -7.1, im: 2.5 }).neg().toString()).toStrictEqual("7.1 - 2.5i");
			expect(new Complex(-7.1, 2.5).neg().toString()).toStrictEqual("7.1 - 2.5i");
		});
	});

	describe("#arg", () => {
		expect(new Complex({ re: 1, im: 1 }).arg().toString()).toStrictEqual(`${Math.PI / 4}`);
		expect(new Complex({ re: -1, im: -1 }).arg().toString()).toStrictEqual(`${(-3 * Math.PI) / 4}`);
		expect(new Complex({ re: 0, im: 1 }).arg().toString()).toStrictEqual(`${Math.PI / 2}`);
		expect(new Complex({ re: 1, im: 0.5 * Math.sqrt(4 / 3) }).arg().toString()).toStrictEqual(`${Math.PI / 6}`);
	});

	describe("#conjugate", () => {
		it("should expect the conjugate value of a complex or a scalar", () => {
			expect(new Complex("3 + 4i").conjugate().toString()).toStrictEqual("3 - 4i");
			expect(new Complex({ re: 99, im: 50 }).conjugate().toString()).toStrictEqual("99 - 50i");
			expect(new Complex({ re: 0, im: 0 }).conjugate().toString()).toStrictEqual("0");
			expect(new Complex({ re: 1, im: 23 }).conjugate().toString()).toStrictEqual("1 - 23i");
		});
	});

	describe("#equals", () => {
		it("should expect if two complex or scalar are equals", () => {
			expect(new Complex({ abs: 1, arg: 0 }).equals({ re: 1, im: 0 })).toBeTruthy();
			expect(new Complex(Complex.EPSILON).equals(1e-16)).toBeTruthy();
			expect(new Complex("0").equals("5i")).toBeFalsy();
			expect(new Complex("5").equals("5i")).toBeFalsy();
			expect(new Complex("5").equals("5")).toBeTruthy();
			expect(new Complex("10i").equals("10i")).toBeTruthy();
			expect(new Complex("2 + 3i").equals("5i")).toBeFalsy();
		});
	});

	describe("#sin", () => {
		it("should expect the sinus of a complex or a scalar", () => {
			expect(new Complex({ re: 1, im: 2 }).sin().toString()).toStrictEqual(
				"3.165778513216168 + 1.9596010414216063i",
			);
		});
	});

	describe("#sinh", () => {
		it("should expect the sinh of a complex or a scalar", () => {
			expect(new Complex({ re: 1, im: 3 }).sinh().toString()).toStrictEqual(
				"-1.1634403637032504 + 0.21775955162215221i",
			);
		});
	});

	describe("#cos", () => {
		it("should expect the cos of a complex or a scalar", () => {
			expect(new Complex("i").cos().toString()).toStrictEqual("1.5430806348152437");
			expect(new Complex({ re: 1, im: 2 }).cos().toString()).toStrictEqual(
				"2.0327230070196656 - 3.0518977991518i",
			);
		});
	});

	describe("#cosh", () => {
		it("should expect the cosh of a complex or a scalar", () => {
			expect(new Complex({ re: 1, im: 3 }).cosh().toString()).toStrictEqual(
				"-1.5276382501165433 + 0.1658444019189788i",
			);
		});
	});

	describe("#coth", () => {
		it("should expect the coth of a complex or a scalar", () => {
			expect(new Complex("3.14 - 4i").coth().toString()).toStrictEqual(
				"0.9994481238383576 + 0.0037048958915019857i",
			);
		});
	});

	describe("#cot", () => {
		it("should expect the cot of a complex or a scalar", () => {
			expect(new Complex("8i - 31").cot().toString()).toStrictEqual(
				"1.6636768291213935e-7 - 1.0000001515864902i",
			);
		});
	});

	describe("#acos", () => {
		it("should expect the acos of a complex or a scalar", () => {
			expect(new Complex("i").acos().toString()).toStrictEqual("1.5707963267948966 - 0.8813735870195428i");
		});
	});

	describe("#tan", () => {
		it("should expect the tan of a complex or a scalar", () => {
			expect(new Complex({ re: 1, im: 2 }).tan().toString()).toStrictEqual(
				"0.03381282607989669 + 1.0147936161466335i",
			);
		});
	});

	describe("#tanh", () => {
		it("should expect the tanh of a complex or a scalar", () => {
			expect(new Complex({ re: 1, im: 3 }).tanh().toString()).toStrictEqual(
				"0.7680176472869112 - 0.059168539566050726i",
			);
		});
	});

	describe("#inverse", () => {
		it("should expect the inverse of a complex or a scalar", () => {
			expect(new Complex({ re: 1, im: 3 }).inverse().toString()).toStrictEqual("0.1 - 0.3i");
			expect(new Complex("3 + 4i").inverse().toString()).toStrictEqual("0.12 - 0.16i");
			expect(new Complex({ re: 0.5, im: -0.5 }).inverse().toString()).toStrictEqual("1 + i");
			expect(new Complex("1 + i").inverse().toString()).toStrictEqual("0.5 - 0.5i");
			expect(new Complex("0").inverse().toString()).toStrictEqual("Infinity");
			expect(new Complex(Infinity).inverse().toString()).toStrictEqual("0");
		});
	});

	describe("#round", () => {
		it("should round the complex or the scalar", () => {
			expect(new Complex("2 + 3i").round(0).toString()).toStrictEqual("2 + 3i");
			expect(new Complex("2.5 + 3.5i").round(1).toString()).toStrictEqual("2.5 + 3.5i");
		});
	});

	describe("#sign", () => {
		it("should sign the complex or the scalar", () => {
			expect(new Complex("2.5 + 3.5i").sign().toString()).toStrictEqual(
				"0.5812381937190965 + 0.813733471206735i",
			);
			expect(new Complex("10 + 24i").sign().toString()).toStrictEqual(
				"0.38461538461538464 + 0.9230769230769231i",
			);
		});
	});
});
