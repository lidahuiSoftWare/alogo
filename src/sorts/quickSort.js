/**
 * 1.快速排序思想：
 *   核心思想是分治。如果排序的数组索引从 p 到 r 之间的一组数据，
 *   我们选择从p到 r 任意一个数据作为pivot(分割点)。我们遍历p到r之间的数据
 *   将让其他比pivot大的元素移动到数列一边，比pivot 小的元素移动到数列的另一边，
 *   从而将数组拆解为2部分
 *      
 * 2.快速排序迭的递推公式：
 *   quick_sort(p...r) =  quick_sort(p...q) + quick_sort(q+1...r)
 *   终止条件： p >= r 
 *   其中 p为数组开始索引位置， r为数组的结束位置，q 为 pivot 元素最终的位置
 *   递推公式解释：
 *      quick_sort(p...r) 表示，给数组索从 p 到 q 之间数组元素进行排序。
 *      选择在索引 p 和 r 任意一个索引的数组元素作为priviot，将数组分成2个子数组。 
 *      quick_sort(p...q)   中元素值都小于 pivot 
 *      quick_sort(q+1..r)  中元素值都大于等于 pivot
 *   
 *   这样我们将 quick_sort(p..r)的排序分解为2个子问题。

 * 3.时间复杂度
 *      平均时间复杂度是 O(nlog^n)
 *      最好时间复杂度是 O(nlog^n)
 *      最差时间复杂度是 O(n^2)
 * 
 * 4.空间复杂度：O(1) 就地排序
 * 
 * 5.快速排序为不稳定排序
 * 
 * 6.为避免快速排序最差时间复杂度 O(n^2),方法如下
 *   6.1 三数取中法。 我们从区间的 首，尾，中间，粉笔取一个数，然后对比，取3个数的中间值作为分区点。
 *       如果要排序的数组比较大，那三数取中就不用用了，可能需要 ”五数取中“ 或者 ”十数取中“
 * 
 *   6.2 随机法
 *   
 */

function quickSort( arr = [], startIndex = 0, endIndex = arr.length -1) {
    
    // 递归结束条件
    if (startIndex >= endIndex) {
        return arr;
    }
    // 得到pivot 对应的索引
    // const pivotIndex = partition(arr, startIndex, endIndex);
    const pivotIndex = partitionSingleLoop(arr, startIndex, endIndex);
    // 对左数组进行递归排序
    quickSort(arr, startIndex, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1 , endIndex);
    return arr;
}

/** 数组以pivot 作为分割点进行排列，大于等于pivot 元素在右边，小于pivot的 元素在左边 
 *  主流方法采用双向循环
 */
function partition(arr, startIndex, endIndex) {
    
    // 选择选择startIndex 索引对应数组元素，作为分隔点 privivot. 当然也可以随机选择
    const pivot = arr[startIndex];
    let leftIndex = startIndex + 1,
        rightIndex = endIndex;
    
    while(leftIndex < rightIndex) {
        while (pivot < arr[rightIndex] & leftIndex < rightIndex) {
            rightIndex--;
        }

        while(pivot >= arr[leftIndex] & leftIndex < rightIndex) {
            leftIndex++ ;
        }

        if (leftIndex < rightIndex) {
            swap(arr,leftIndex, rightIndex);
        }
    }

    swap(arr,startIndex, leftIndex);
    // 选好推出后 leftIndex 和 rightIndex 
    return leftIndex;
}

/**  数组以pivot 作为分割点进行排列，大于等于pivot 元素在右边，小于pivot的 元素在左边.
 *   本方法采用单边循环
 */
function partitionSingleLoop(arr, startIndex, endIndex){
        
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