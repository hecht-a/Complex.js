import { Complex } from "../Complex";

export interface ParserOptions {
	re?: number;
	im?: number;
	abs?: number;
	arg?: number;
	r?: number;
	phi?: number;
}

export type ParserParams = string | number | number[] | Complex;

export interface IComplex {
	re: number;
	im: number;
}
