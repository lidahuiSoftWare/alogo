/**
 * 归并排序： 核心思想和分治。如果要排序一个数组，先把数组从中间分成前后2个部分，
 *           然后对每个部分分别进行排序，再将已排好序的俩部分合并在一起，这样的数组就有序了。
 * 
 * 1.由于归并排序的时间复杂度与 原数组的有序度无关，最好/最差/平均时间复杂度是一样的
 * 最好时间复杂度： nlog^n 
 * 最差时间复杂度： nlog^n 
 * 平均时间复杂度： nlog^n
 * 
 * 2.空间复杂度为 O(n)
 * 
 */

/** 归并并数组 */
function mergeArr(arr, leftStart, leftEnd, rightStart, rightEnd ) {
    const temp = [];
    let leftIndex = leftStart, 
        rightIndex = rightStart,
        index = 0;
    
    while(leftIndex < leftEnd && rightIndex < rightEnd ) {
        if (arr[leftIndex] < arr[rightIndex]) {
            temp[index++] = left[leftIndex++];
        } else if (arr[leftIndex] === arr[rightIndex]) {
            temp[index++] =arr[leftIndex++];
        } else {
            temp[index++] = arr[rightIndex++];
        }
    }

    while (leftIndex < leftEnd )  {
        temp[index++] = arr[leftIndex++];
    }

    while(rightIndex < rightEnd ) {
        temp[index++] = arr[rightIndex++];
    }

    // 拷贝temp 到 arr 数组中
    temp.forEach ((val, index) => {
        arr[left + index] = val
    }); 
    return arr;
}

/** 归并排序 */
function mergeSort(arr = [], start = 0, end = arr.length) {
    if (start >= end - 1 ) {
        return start ;
    }
    const middle = Math.floor( (end + start ) / 2);
    mergeSort(arr, start, middle);
    mergeSort(arr, middle, end);

    const leftStart = start, // left 数组开始
          leftEnd = middle, //  left 数组结束索引，left数组不包含leftEnd
          rightStart = middle, // right 数组开始索引
          rightEnd = end; // right 数组结束索引，right 数组不包含rightEnd

    return mergeArr( 
        arr, 
        leftStart,
        leftEnd,
        rightStart,
        rightEnd,
    );
}

/** 合并left 和 right 进而生成新数组  */
function mergeArrSimple(left, right) {
    let leftIndex = 0,
        leftEnd = left.length,
        rightIndex = 0,
        rightEnd = right.length;
    let temp =  [];

    while(leftIndex < leftEnd && rightIndex < rightEnd) {
        if (left[leftIndex] < right[rightIndex]) {
           temp.push(left[leftIndex++]);
        } else if (left[leftIndex] === right[rightIndex]) {
            temp.push(left[leftIndex++]);
        } else {
            temp.push(right[rightIndex++]);
        }
    }

    temp =  leftIndex  < leftEnd ? temp.concat(left.slice(leftIndex)) :
            rightIndex < rightEnd ? temp.concat(right.slice(rightIndex)) :
            temp;

    return temp;        

}

/** 归并排序简单版本, 时间复杂度是一样的，但是 空间复杂度 nlog^n */

function mergeSortSimple(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return mergeArrSimple(mergeSortSimple(left) , mergeSortSimple(right));
}


/** 测试归并排除 */
(() => {
    const testArrary = [10, 9, 8 ];
    //console.log(mergeSort(testArrary))
    console.log(mergeSortSimple(testArrary))
}) ();