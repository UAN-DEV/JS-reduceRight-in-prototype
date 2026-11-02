"use strict";

const reduceRight = function (callback, initialValue) {
  const array = [];
  for (let i = 0; i < this.length; i++) {
    if (this[i]) array[array.length] = this[i]
  }
  if (array.length === 0 && !initialValue) {
   throw new TypeError('Reduce of empty array with no initial value is not imposible');
  }
  if (array.length === 0 && initialValue) return initialValue
  if (array.length === 1 && !initialValue) return array[0]

  let previousValue, index;
  if (initialValue) {
    previousValue = initialValue;
    index = array.length - 1;
  } else{
    previousValue = array[array.length-1]
    index = array.length-2
  }

  for (; index >= 0; index--) {
    previousValue = callback(previousValue, array[index], index, array);
  }
  return previousValue;
};
const callBack = (a, b) => a + b;
const MY_ARRAY1 = [, , , null, ,false , , ,true , , ,1 , ,];
const MY_ARRAY2 = [, , 'a', 'b', 'c', ,false, ,true , 'd', , , 'e', 55, ,]
MY_ARRAY1.reduceRight = reduceRight;
MY_ARRAY2.reduceRight = reduceRight;
console.log(MY_ARRAY1.reduceRight(callBack,10));
console.log(MY_ARRAY2.reduceRight(callBack,10));
console.log([, , 1, 4, 6, , , , , 7, , , 12, , ,].reduceRight(callBack, 10));

console.log([, ,true , 6, ,].reduceRight(callBack, 10));
console.log([].length);
