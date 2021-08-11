/** 桶排序 */
function bucketSort(arr: Array<number>): Array<number> {
    if (arr === null || arr.length === 0) {
      return arr;
    }
    let min = arr[0];
    let max = arr[0];
    let bList: Array<Array<number>> = []; // 桶容器数组
    // 找出最大值与最小值
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
          min = arr[i];                // 输入数据的最小值
      } else if (arr[i] > max) {
          max = arr[i];                // 输入数据的最大值
      }
    }
    let n = arr.length; // 分桶总数
    let d = Math.floor((max - min) / n); // 确定每个桶装载数据的范围差 range
    let len =  arr.length;
   
    // 创建 n + 1 ge桶，其本质是 
    for (let i = 0; i <= n ; i++) {
      bList[i] = [];
    }
    // 将数据入桶
    for ( let i = 0; i < len; i++) {
      let bln = Math.floor((arr[i]- min) / d);
      bList[bln].push(arr[i]);
    }

    for (let i = 0; i<= n; i++) {
      (bList[i]).sort((a, b) => a - b);
    }
    let k = 0;
    for (let i = 0; i<= n; i++) {
      let ele = bList[i];
      let eleLen = ele.length;
      for (let j = 0; j < eleLen; j++) {
        arr[k++] = ele[j];
      }
    }
    return arr;
}

// console.log((bucketSort([0, 100, 20, 19, 80, 11, 89, 90, 45, 66, 44])).toString())

