"use strict";

const reduceRightOnlyOneType = function (callback, initialValue) {
  let typeValue = initialValue ? typeof initialValue : typeof this[0];
  const array = [];
  for (let i = 0; i < this.length; i++) {
    if (typeof this[i] === "undefined") continue;
    if (typeValue === "undefined") typeValue = typeof this[i];
    if (typeof this[i] !== typeValue) {
      throw new Error(
        initialValue
          ? "Array includes types of values different of initialValue"
          : "Array includes different types of values",
      );
    }
    array[array.length] = this[i];
  }

  if (array.length === 0) {
    if (initialValue) {
      return initialValue;
    } else {
      return console.log(
        "Reduce of empty array with no initial value is not imposible",
      );
    }
  }
  if (array.length === 1 && !initialValue) return array[0];

  let previousValue, index;
  initialValue
    ? ((previousValue = initialValue), (index = array.length - 1))
    : ((previousValue = array[array.length - 1]), (index = array.length - 2));

  for (; index >= 0; index--) {
    previousValue = callback(previousValue, array[index], index, array);
  }
  return previousValue;
};

const callBack = (a, b) => a + b;

// native .reduceRight
const MY_ARRAY1 = [1, 2, 3, 5, 6];
const nativeReduceRight1 = MY_ARRAY1.reduceRight(callBack, 10);
const MY_ARRAY2 = [1, 2, 3, '5', 6];
const nativeReduceRight2 = MY_ARRAY2.reduceRight(callBack,10);
const MY_ARRAY3 = [1, 2, '3', 5, 6];
const nativeReduceRight3 = MY_ARRAY3.reduceRight(callBack);
const MY_ARRAY4 = [, , "a", "b", "c", , false, , true, "d", , , "e", 55, ,];
const nativeReduceRight4 = MY_ARRAY4.reduceRight(callBack, 10);

console.log(nativeReduceRight1);
console.log(nativeReduceRight2);
console.log(nativeReduceRight3);
console.log(nativeReduceRight4);

// customer .reduceRight
Array.prototype.reduceRight = reduceRightOnlyOneType;
const MY_ARRAY11 = [1, 2, 3, 5, 6];
const customeReduceRight1 = MY_ARRAY11.reduceRight(callBack, 10);
const MY_ARRAY12 = [1, 2, 3, '5', 6]
const customeReduceRight2 = MY_ARRAY12.reduceRight(callBack, 10);
const MY_ARRAY13 = [1, 2, '3', 5, 6];
const customeReduceRight3 = MY_ARRAY13.reduceRight(callBack);
const MY_ARRAY14 = [, , "a", "b", "c", , false, , true, "d", , , "e", 55, ,];
const customeReduceRight4 = MY_ARRAY14.reduceRight(callBack, "10");

console.log(customeReduceRight1);
console.log(customeReduceRight2);
console.log(customeReduceRight3);
console.log(customeReduceRight4);

console.log(customeReduceRight1 === nativeReduceRight1);
console.log(customeReduceRight2 === nativeReduceRight2);
console.log(customeReduceRight3 === nativeReduceRight3);
console.log(customeReduceRight4 === nativeReduceRight4);
