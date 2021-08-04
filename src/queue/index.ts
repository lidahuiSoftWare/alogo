/** 1. 移零
 *  https://leetcode-cn.com/problems/move-zeroes/
 */
function moveZeroes (nums: Array<number>): void {
    if (nums === null) {
        return;
    }
    let j = 0; // 假设可能出现0最早位置
    // 正向过程
    for (let i = 0; i < nums.length; i++ ) {
        if (nums[i] !== 0 ) {
            let tmp = nums[i];
            nums[i] = nums[j];
            nums[j++] = tmp;
        }
    }
}

/** 1.1 移零 解法2
 * https://leetcode-cn.com/problems/move-zeroes/
 */
function moveZeroes2 (nums: Array<number>): void { 
    if (nums === null) {
        return;
    }
    let index = 0; // 标记 0出现的位置
    let length = nums.length;
    // 采用逆向过程
    for (let i = 0; i < length; i++) {
        if (nums[i] !== 0) {
            nums[index++] = nums[i];
        }
    }
    while ( index < length) {
        nums[index++] = 0;
    }
}


