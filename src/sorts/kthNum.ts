/** 求数组中的第K大元素*/
/**
 * 
 * @param arr 无序数组
 * @param k 第K大的编号
 */
 export function getMaxKNum(arr: Array<number>, k: number): number {
    if (!(arr && arr.length >= k)) {
        return null;
    }
    return kthNum(arr, arr.length - k, 0, arr.length -1);
}

function kthNum(arr: Array<number>, k: number, startIndex: number, endIndex: number): number {
    const pivotIndex = partion(arr, startIndex, endIndex);
    if (pivotIndex === k) {
        return arr[pivotIndex];
    } else if (pivotIndex > k) {
        return kthNum(arr, k, startIndex, pivotIndex - 1);
    } else {
        return kthNum(arr, k , pivotIndex + 1, endIndex);
    }
}

function partion(arr: number[], startIndex: number, endIndex: number): number {
    const randomIndx = Math.floor(Math.random() * (endIndex - startIndex) ) + startIndex;
    swap(arr, startIndex, randomIndx); 
    const pivot = arr[startIndex];
    let mark = startIndex;

    for (let index = startIndex + 1; index <= endIndex; index++) {
        if (pivot > arr[index]) {
            mark++;
            swap(arr, mark, index);
        }
    }
    if (mark !== startIndex) {
        swap(arr, startIndex, mark);
    }
    return mark;
} 

function swap(arr: number[], i: number, j: number) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

(() => {
    const arr = [50,39,41,54,57,63,69,69,71,82];
    // let count = 10;
    // while(count--) {
    //     arr.push(Math.floor(Math.random() * 100));
    // }
    console.log(arr.toString());
    console.log(getMaxKNum(arr, 1));
})();
