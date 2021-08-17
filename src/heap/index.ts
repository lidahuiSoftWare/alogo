import Heap from './dataStructer';

/**1. 数组中的第K个最大元素 
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/ 
 * 思路： 构建一个K个元素的最小堆
 * */
 function findKthLargest(nums: number[], k: number): number {
     if (!nums || nums.length < k) {
        return -1;
     }
     const hp = new Heap<number>();
     nums.forEach ((num) => {
        hp.insert(num);
        if (hp.getSize() > k ) {
            hp.pop();
        }
     });
     return hp.peek(); 
};

/**2. 前 K 个高频元素
 * https://leetcode-cn.com/problems/top-k-frequent-elements/
 */
function topKFrequent(nums: number[], k: number): number[] {
    if (!nums || !nums.length) {
        return nums;
    }
    const map: Map<number, number> = new Map();
    const hp = new Heap<Array<number>>((a: Array<number>, b: Array<number>): boolean => {
      return a[1] > b[1];
    });
    nums.forEach(num => {
        if (map.has(num)) {
            map.set(num, map.get(num) + 1);
        } else {
            map.set(num, 1);
        }
    });
    const arr = Array.from(map);
    arr.forEach((ele) => {
        hp.insert(ele);
        if (hp.getSize() > k) {
            hp.pop();
        }
    })
    const res: Array<number> = hp.getAllElements().map(ele => {
        return ele[0];
    })
    return res;
};


