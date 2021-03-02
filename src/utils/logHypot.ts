export function logHypot(x: number, y: number): number {
	if (x === 0) {
		return Math.log(Math.abs(y));
	}
	if (y === 0) {
		return Math.log(Math.abs(x));
	}

	if (Math.abs(x) < 3000 && Math.abs(y) < 3000) {
		return Math.log(x ** 2 + y ** 2) * 0.5;
	}

	return Math.log(x / Math.cos(Math.atan2(y, x)));
}
