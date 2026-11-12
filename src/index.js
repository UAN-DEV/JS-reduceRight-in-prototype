"use strict";

function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) this[this.length++] = args[i];
}

MyArray.prototype.reduceRight = function (fn, init) {
    if (this.length === 0 && !init) throw new TypeError("Reduce of empty array with no initial value");
    if (this.length === 0 && init) return init;

    let result = init;
    let index = this.length - 1;
    if (!result) result = this[index--];
    for (; index >= 0; index--) if (this[index] !== undefined) result = fn(result, this[index], index, this);
    return result;
  };


// Test of custom reduceRight vs native reduceRight method
const callBack = (a, b) => a + b;

const arr1 = [,,, 1, 4, 6, null,, false, true,,, 9, 20,]
const myArray1 = new MyArray(...arr1);
console.log(myArray1.reduceRight(callBack, 10));
console.log(arr1.reduceRight(callBack, 10));

const arr2 = [, , 1,, Symbol, 4, 6, 'null', , true, ,[2,7, 9], 20,]
const myArray2 = new MyArray(...arr2);
console.log(myArray2.reduceRight(callBack, 1));
console.log(arr2.reduceRight(callBack, 1));

const myArray3 = new MyArray();
try {
console.log(myArray3.reduceRight(callBack));
} catch (error) {console.log(error)}
try {
console.log([].reduceRight(callBack));
} catch (error) {console.log(error)}

const arr4 = [,,, 1, 4, 6, null,,false, true, Symbol(), , 9, 20,]
const myArray4 = new MyArray(...arr4);
try {
  console.log(myArray4.reduceRight(callBack, 10));
} catch (error) {console.log(error)}
try {
  console.log(arr4.reduceRight(callBack, 10)); 
} catch (error) {console.log(error)}