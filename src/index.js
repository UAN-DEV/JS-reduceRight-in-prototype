"use strict";

function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) this[this.length++] = args[i];
}

MyArray.prototype = new MyArrayProto();

function MyArrayProto() {
  this.reduceRight = function (fn, init) {
    if (this.length === 0 && !init) throw new TypeError("Reduce of empty array with no initial value is not imposible");
    if (this.length === 0 && init) return init;

    let result = init;
    let index = this.length - 1;
    if (!result) result = this[index--];
    for (; index >= 0; index--) if (this[index]) result = fn(result, this[index], index, this);
    return result;
  };
}

const callBack = (a, b) => a + b;

const arr1 = [, , 1, 4, 6, null, , true, , 9, 20,]
const myArray1 = new MyArray(...arr1);
console.log(myArray1.reduceRight(callBack, 10));
console.log(arr1.reduceRight(callBack, 10));

const arr2 = [, , 1, 4, 6, 'null', , true, ,[2,7, 9], 20,]
const myArray2 = new MyArray(...arr2);
console.log(myArray2.reduceRight(callBack, 1));
console.log(arr2.reduceRight(callBack, 1));
