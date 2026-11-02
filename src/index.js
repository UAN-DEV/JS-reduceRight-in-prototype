"use strict";

const reduceRight = function (callback, initialValue) {
  const array = []; // Create array of values !== 'undefined
  for (let i = 0; i < this.length; i++) {
    if (typeof this[i] !== "undefined") array[array.length] = this[i];
  }
  const length = array.length;
  if (length === 0 && !initialValue) {
    throw new TypeError(
      "Reduce of empty array with no initial value is not imposible",
    );
  }
  if (length === 0 && initialValue) return initialValue;
  if (length === 1 && !initialValue) return array[0];

  let previousValue, index;

  initialValue
    ? ((previousValue = initialValue), (index = length - 1))
    : ((previousValue = array[length - 1]), (index = length - 2));

  for (; index >= 0; index--) {
    previousValue = callback(previousValue, array[index], index, array);
  }
  return previousValue;
};

const callBack = (a, b) => a + b;
// native .reduceRight
const MY_ARRAY1 = [, , , null, , false, , , true, , , 1, ,];
const MY_ARRAY2 = [, , "a", "b", "c", , false, , true, "d", , , "e", 55, ,];
const nativeReduceRight1 = MY_ARRAY1.reduceRight(callBack, 10);
const nativeReduceRight2 = MY_ARRAY2.reduceRight(callBack, 10);

console.log(nativeReduceRight1);
console.log(nativeReduceRight2);

// customer .reduceRight
Array.prototype.reduceRight = reduceRight;

const MY_ARRAY11 = [, , , null, , false, , , true, , , 1, ,];
const MY_ARRAY12 = [, , "a", "b", "c", , false, , true, "d", , , "e", 55, ,];
const customeReduceRight1 = MY_ARRAY11.reduceRight(callBack, 10);
const customeReduceRight2 = MY_ARRAY12.reduceRight(callBack, 10);

console.log(nativeReduceRight1);
console.log(nativeReduceRight2);

console.log(customeReduceRight1 === nativeReduceRight1)
console.log(customeReduceRight2 === nativeReduceRight2)