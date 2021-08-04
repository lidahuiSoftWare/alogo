/**
 * 1.归并排序思想：
 *      核心思想是分治。如果要排序一个数组，先把数组从中间分成前后2个部分，
 *      然后对每个部分分别进行排序，再将已排好序的俩部分合并在一起，这样的数组就有序了。
 * 
 * 2.归并排序递推公式： 
 *      merge_sort(p...r) = merge_arr( merge_sort(p...q), merge_sort(q+1 ...r))
 *      其中 p为数组开始索引位置， r为数组的结束位置， q 为 p 和 q 的中间位置 （p + r） / 2
 *  终止条件：
 *      p >= r 
 *  递推公式解释：
 *      merge_sort(p...r) 表示，给数组索从 p 到 q 之间数组元素进行排序。
 *      我们这个排序问题分解为 2个子问题, merge_sort(p...q) 和 merge_sort(q+1...r), 
 *      其中索引引 q 为 p和r 的中间位置,也就是 ( p + r) / 2.
 *      当索引从 p 到 q 和 q + 1 到 r 这俩个子数组排好序之后，我们再将俩个有序的子数组合并在一起，这样索引从 p 到 r 之间的数据也就排好序。 
 * 
 * 3.由于归并排序的时间复杂度与 原数组的有序度无关，最好/最差/平均时间复杂度是一样的
 * 最好时间复杂度： nlog^n 
 * 最差时间复杂度： nlog^n 
 * 平均时间复杂度： nlog^n
 * 
 * 4.空间复杂度为 O(n)
 * 
 * 5.归并排序为稳定的排序
 */

/** 归并排序 */

function mergeSort(arr) {
    if (arr === null || arr.length === 1) {
        return arr;
    }
    return mergeSortProcess(arr, 0 , arr.length -1);
}

function mergeSortProcess(arr = [], start = 0, end = arr.length - 1 ) {
    if (start >= end ) {
        return arr ;
    }

    const middle = start +  Math.floor( (end - start ) / 2); 
    // left 子数组
    const leftStart = start, // left 数组开始
          leftEnd = middle;//  left 数组结束索引, 包含leftEnd
    // right 子数组
    const rightStart = middle + 1, // right 数组开始索引
          rightEnd = end; // right 数组结束索引，right 数组包含rightEnd

    // 排序left 子数组
    mergeSortProcess(arr, leftStart, leftEnd);
    // 排序 right 子数组
    mergeSortProcess(arr, rightStart, rightEnd);
    // 将排序好 left 和 right 进行合并
    return mergeArr( arr, leftStart, leftEnd, rightStart,rightEnd );
}

/** 合并数组 */
function mergeArr(arr, leftStart, leftEnd, rightStart, rightEnd ) {
    const temp = new Array(rightEnd - leftStart + 1);
    let leftIndex = leftStart, 
        rightIndex = rightStart,
        index = 0;
    
    while(leftIndex <= leftEnd && rightIndex <= rightEnd ) {
        if (arr[leftIndex] <= arr[rightIndex]) {
            temp[index++] = arr[leftIndex++];
        } else {
            temp[index++] = arr[rightIndex++];
        }
    }

    while (leftIndex <=leftEnd )  {
        temp[index++] = arr[leftIndex++];
    }

    while(rightIndex <= rightEnd ) {
        temp[index++] = arr[rightIndex++];
    }

    // 拷贝temp 到 arr 数组中
    temp.forEach ((val, index) => {
        arr[leftStart + index] = val
    }); 
    return arr;
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


/** 测试归并排除 */
(() => {
    const testArrary = [10, 9, 8, 7, 6 ];
    console.log(mergeSort(testArrary))
    // console.log(mergeSortSimple(testArrary))
}) ();