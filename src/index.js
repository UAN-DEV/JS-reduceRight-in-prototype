"use strict";

function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) this[this.length++] = args[i];
}

MyArray.prototype = new MyArrayProto();

function MyArrayProto() {
  this.reduceRight = function (fn, init) {
    if (this.length === 0 && !init)
      throw new TypeError(
        "Reduce of empty array with no initial value is not imposible",
      );
    if (this.length === 0 && init) return init;

    let result = init;
    let index = this.length - 1;
    if (!result) result = this[index--];
    for (; index >= 0; index--)
      if (this[index]) result = fn(result, this[index], index, this);
    return result;
  };
  this.reduceRightOnlyOneType = function (fn, init) {
    if (this.length === 0 && !init)
      throw new TypeError(
        "Reduce of empty array with no initial value is not imposible",
      );
    if (this.length === 0 && init) return init;

    let result = init;
    let index = this.length - 1;
    const onlyOneType = init ? typeof init : typeof this[0];
    if (!result) result = this[index--];
    for (; index >= 0; index--) {
      if (typeof this[index] !== onlyOneType) {
        throw new TypeError(
          init
            ? "Array includes types of values different of initialValue"
            : "Array includes different types of values",
        );
      }
      result = fn(result, this[index], index, this);
    }
    return result;
  };
}

const callBack = (a, b) => a + b;
// Test of custom reduceRight method
const arr1 = [, , 1, 4, 6, null, , true, , 9, 20];
const myArray1 = new MyArray(...arr1);
console.log(myArray1.reduceRight(callBack, 10));
console.log(arr1.reduceRight(callBack, 10));

const arr2 = [, , 1, 4, 6, "null", , true, , [2, 7, 9], 20];
const myArray2 = new MyArray(...arr2);
console.log(myArray2.reduceRight(callBack, 1));
console.log(arr2.reduceRight(callBack, 1));

// Test of custom reduceRightOnlyOneType method
const arr3 = [0, 1, '2', 3, 4, 5, 6];
const myArray3 = new MyArray(...arr3);
try {
  console.log(myArray3.reduceRightOnlyOneType(callBack, 10));
} catch (error) {console.error(error)}

const arr4 = [0, 1, 2, 3, 4, 5, 6];
const myArray4 = new MyArray(...arr4);
try {
  console.log(myArray4.reduceRightOnlyOneType(callBack, '10'));
} catch (error) {console.error(error)}

const arr5 = [0, 1, 2, 3, , 5, 6];
const myArray5 = new MyArray(...arr5);
try {
  console.log(myArray5.reduceRightOnlyOneType(callBack));
} catch (error) {console.error(error)}

const arr6 = [0, 1, 2, 3, 4, 5, 6];
const myArray6 = new MyArray(...arr6);
try {
  console.log(myArray6.reduceRightOnlyOneType(callBack));
} catch (error) {console.error(error)}
