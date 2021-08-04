/**
 * 快速排序思想：使用堆空间的手动来实现递归
 */
class Stack {
    constructor(initSize = 100) {
        this.arr = new Array(initSize).fill(null);
        this.length = 0;
    }

    push(ele) {
        this.length++;
        return this.arr.push(ele);
    }

    pop() {
        if (this.length > 0) {
            this.length--;
            return this.arr.pop();
        }
    }

    getLength() {
        return this.length;
    }
}

function quickSort( arr = [], start = 0, end = arr.length -1) {

    const stack = new Stack(100); // 初步给予堆长度为100
    stack.push( { startIndex : start, endIndex: end,});
    
    while(stack.getLength () > 0) {
        const { startIndex, endIndex  } = stack.pop();
        if (startIndex > endIndex) {
            continue;
        }
        const pivotIndex = partition(arr, startIndex, endIndex);
        stack.push({
            startIndex,
            endIndex: pivotIndex -1
        });
        stack.push({
            startIndex: pivotIndex + 1,
            endIndex
        });
    }

    return arr;
}

/**  数组以pivot 作为分割点进行排列，大于等于pivot 元素在右边，小于pivot的 元素在左边.
 *   本方法采用单边循环
 */
function partition(arr, startIndex, endIndex){
        
    // 选择选择startIndex 索引对应数组元素，作为分隔点 privivot. 当然也可以随机选择
    const pivot = arr[startIndex];
    // mark 标注小于pivot 的边界
    let mark = startIndex;

    for (let index = startIndex + 1; index <= endIndex; index++) {
        if (pivot > arr[index]) {
            mark++;
            swap(arr, mark, index);
        }
    }
    // 将pivot 送到边界位置，从而
    swap(arr, startIndex, mark)
    return mark;
}

function swap (arr, i, j) {
    if (i == j) {
        return;
    }
    const temp = arr [i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/** 测试归并排除 */
(() => {
    const testArrary = [26, 27, 28, 10, 30];
    console.log(quickSort(testArrary))
}) ();