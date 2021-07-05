/** 
 * 求第k大的数据
 * 平均复杂度： O(n)
 */
function kthNum(arr = [], k = 0, startIndex =0, endIndex = arr.length -1){ 
    
    if (arr && arr.lenth < k) {
        throw 'the lenth of array less then k';
    }
    const pivotIndex = partition(arr, 0, arr.length - 1);
    if (pivotIndex + 1 === k) {
        return arr[pivotIndex];
    } else if (pivotIndex + 1 < k ) {
        return kthNum(arr,startIndex, pivotIndex - 1);
    } else  {
        return kthNum(arr, pivotIndex + 1, endIndex);
    }
}

function partition(arr, startIndex, endIndex){
    
    const pivot = arr[startIndex];
    let mark = startIndex;
    
    for (let i = startIndex + 1; i<= endIndex; i++ ) {
        if (arr[i] < pivot) {
            mark++;
            swap(arr, mark, i);
        }
    }
    swap(arr, startIndex, mark);
    return mark;
}


function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] =  arr[j];
    arr[j] = temp;
}