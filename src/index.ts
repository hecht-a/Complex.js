import { Complex } from "./Complex";

console.log(new Complex(1, 2).sub(3, 4).toString());
console.log(new Complex(Infinity, Infinity));
console.log(new Complex(NaN, NaN));
console.log(new Complex(0, 0));
console.log(new Complex(1, 0));
console.log(new Complex(0, 1));
console.log(new Complex(Math.PI));
console.log(new Complex(Math.E));
