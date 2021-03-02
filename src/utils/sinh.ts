export function sinh(x: number): number {
	return (Math.exp(x) - Math.exp(-x)) * 0.5;
}
