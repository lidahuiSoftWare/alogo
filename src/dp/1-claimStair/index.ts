/**
 * 题目：
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。
 * 你有多少种不同的方法可以爬到楼顶呢? 注意:给定 n 是一个正整数。
 */
/**解题*/
/**
 * 1. 确定dp数组以及下标的含义 dp[i]的定义为:第i个数的斐波那契数值是dp[i]
 * 2. 确定递推公式: dp[i] = dp[i - 1] + dp[i - 2];
 * 3. dp数组初始化
 *      dp[0] = 0; 
 *      dp[1] = 1;
 * 4. 确定遍历顺序: 从递归公式dp[i] = dp[i - 1] + dp[i - 2];中可以看出，
 *    dp[i]是依赖 dp[i - 1] 和 dp[i - 2]，那么遍历的顺序一定是从前到后遍历的
 * 5. 举例推导dp数组
 */

/** 迭代优化版本： 时间复杂度O(n), 空间复杂度O(1) */
export function solution(n: number): number {
    if ( n <= 2 ) {
        return n;
    }
    let dp1 = 1;
    let dp2 = 2;
    for (let i = 3; i <= n; i++ ) {
        let sum = dp1 + dp2;
        dp1 = dp2;
        dp2 = sum;  
    }
    return dp2;
}

/** 迭代解法: 时间复杂度O(n), 空间复杂度O(n)  */
export function solution2(n: number): number {
    if ( n <= 2 ) {
        return n;
    }
    const dp: Array<number> = [];
    dp[1] = 1;
    dp[2] = 2;
    for (let i= 3; i <= n; i++ ) {
      dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}

/** 存递归解法:  迭代优化版本： 时间复杂度O(2^n), 空间复杂度O(1) */
export function solution3(n: number): number {
    if (n <= 2) {
        return n;
    }
    return solution3(n-1) + solution3(n-2);
}

/** 存递归解法 +  字典优化算法: 时间复杂度为 O(n) ,空间复杂度O(n) */
export function solution4(n: number, map ?: Map<number, number>): number {
    if (n <= 2) {
        return n;
    }
    if (!map) {
        map = new Map();
    }
    if (map.has(n)) {
        return map.get(n);
    }
    const result = solution4(n-1, map) + solution4(n-2, map);
    map.set(n, result);
    return result;
}