/** 
 * 计数排序，计数排序其实是桶排序的一种特殊情况， 属于线性排序。
 * 当要排序的 n 个数据，所处的范围并不大的时候，比如最大值是 k，我们就可以把数据划分成 k 个桶。每个桶内的数据值都是相同的，省掉了桶内排序的时间。
 * 
 * 计数排序核心操作：
 *  1.利用了中间数组来计数，中间数组的长度为的是原待排序数组的元素最大值+1
 *  2.中间数组每个索引对应待排序数组中每个数值，中间数组每个索引对应的数组元素值为：小于等于当前索引累计总个数，
 *  3.最后再对待排序数组进行从后往前进行遍历，从而保证稳定排序特点，每遍历一个数后，中间数组下标对应的值-1。
 * 
 * 计数排序时间复杂度： O(n)
 * 计数排序空间复杂度： O(n)
 * 
 * 计数排序限制： 
 *  1.计数排序只能用在数据范围不大的场景中，
 *    如果数据范围 k 比要排序的数据 n 大很多，就不适合用计数排序了。
 *  
 *  2.计数排序只能给非负整数排序，
 *    如果要排序的数据是其他类型的，要将其在不改变相对大小的情况下，转化为非负整数。
 */

function countingSort( arr = []) {

    const length =  arr.length;
    if ( length <= 1) {
        return arr;
     }
     /** 找到数组中最大值 */
     let max = arr[0];
     arr.forEach(val => {
         if (val > max) {
            max = val;
         }
     });
     /** 申请 max + 1 个 桶 */
     const buckets = new Array(max + 1).fill(0);
     /** 统计arr中索引值代表的总数 */
     arr.forEach( val => {
         buckets[val]++;
     });
    /** 统计小于等于索引值的累加总数 */
     for (let i = 1; i < buckets.length; i++) {
        buckets[i] = buckets[i -1] +  buckets[i];
     }
    // 申请临时数组,用来存储排序数组
     const temp = new Array(length);
     /** 倒序扫描数组，将数组元素存入到对应的索引位置  */
     for (let i = length -1; i >= 0 ; i--) {
        const bIndex = arr[i]; 
        const tempIndex = buckets[bIndex] - 1; // 索引值：value值统计总数 -1 
        temp[tempIndex] = arr[i];
        buckets[bIndex]--;
     }
     //将temp 值赋值给 arr
     for(let i = 0; i< length; i++) {
        arr[i] = temp[i];
     }
     return arr;
}

// 测试计数排序
(() => {
        const testArrary = [2,5,3,0,2,3,0,3];
        console.log(countingSort(testArrary))
    }
)();
