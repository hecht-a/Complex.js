export interface ParserOptions {
	re?: number;
	im?: number;
	abs?: number;
	arg?: number;
	r?: number;
	phi?: number;
}

export type ParserParams = string | number | number[];

export interface IComplex {
	re: number;
	im: number;
}
