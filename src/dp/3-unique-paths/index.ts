/**
 * 题目链接:https://leetcode-cn.com/problems/unique-paths/
一个机器人位于一个 m x n 网格的左上⻆ (起始点在下图中标记为 “Start” )。 
机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下⻆(在下图中标记为 “Finish” )。 问总共有多少条不同的路径?
 * 示例 1: 
 *   输入:m = 3, n = 7 输出:28
 * 示例 2:
 *   输入:m = 2, n = 3
 *   输出:3
 *   解释:
 *     从左上⻆开始，总共有 3 条路径可以到达右下⻆。
 *     1. 向右->向右->向下 2. 向右->向下->向右 3. 向下->向右->向右
 * 示例 3:
 *   输入:m = 7, n = 3 输出:28
 * 示例 4:
 *   输入:m = 3, n = 3 输出:6
 *   提示:
 * 1 <= m, n <= 100 题目数据保证答案小于等于 2 * 10^9
 */
/** 题解 */
/**
 * 
 * 按照动规五部曲来分析:
1. 确定dp数组(dp table)以及下标的含义
    dp[i][j] :表示从(0 ，0)出发，到(i, j) 有dp[i][j]条不同的路径。
2. 确定递推公式
    想要求dp[i][j]，只能有两个方向来推导出来，即dp[i - 1][j] 和 dp[i][j - 1]。
    此时在回顾一下 dp[i - 1][j] 表示啥，是从(0, 0)的位置到(i - 1, j)有几条路径， dp[i][j - 1]同理。
    那么很自然，dp[i][j] = dp[i - 1][j] + dp[i][j - 1]，因为dp[i][j]只有这两个方向过来。
3. dp数组的初始化
    如何初始化呢，首先dp[i][0]一定都是1，因为从(0, 0)的位置到(i, 0)的路径只有一条，那么dp[0][j]也同
    理。 所以初始化代码为:
    for (int i = 0; i < m; i++) dp[i][0] = 1;
    for (int j = 0; j < n; j++) dp[0][j] = 1;
4. 确定遍历顺序
    这里要看一下递归公式dp[i][j] = dp[i - 1][j] + dp[i][j - 1]，dp[i][j]都是从其上方和左方推导而来，那么从
    左到右一层一层遍历就可以了。
    这样就可以保证推导dp[i][j]的时候，dp[i - 1][j] 和 dp[i][j - 1]一定是有数值的。
5. 举例推导dp数组
 */
export function solution(m: number, n: number): number {
    const dp: Array<Array<number>> = [];
    
    /** 初始化二维数组 */
    for (let i = 0; i < m; i++ ) {
        dp[i] = new Array(n);
        dp[i][0] = 1;
    }
    dp[0].fill(1);
    for (let i = 1; i < m; i++ ) {
        for (let j = 1; j < n; j++) {
           dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
}

export function solution2(m: number, n: number): number {
    const dp: Array<number> = new Array(n).fill(1);

    for (let j = 1; j < m; j++ ) {
        for (let i = 1; i < n; i++) {
            dp[i] += dp[i-1]
        }
    }
    return dp[n-1]
}




