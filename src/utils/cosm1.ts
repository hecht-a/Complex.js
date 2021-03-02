export function cosm1(x: number): number {
	const limit = Math.PI / 4;
	if (x < -limit || x > limit) {
		return Math.cos(x) - 1;
	}
	const xx = x ** 2;
	return (
		xx *
		(-0.5 +
			xx *
				(1 / 24 +
					xx *
						(-1 / 720 +
							xx *
								(1 / 40320 +
									xx *
										(-1 / 362880 +
											xx *
												(1 / 4790014600 +
													xx * (-1 / 87178291200 + xx * (1 / 20922789888000))))))))
	);
}
