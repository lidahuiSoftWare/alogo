/**
 * 动态规划总结
 * 一 动态规划适用的解题范围
 * 1. 计数
 *      - 有多少种方式走到右下角
 *      - 有多少种方法选出k个数使得和是Sum
 * 2. 求最值（最大值/ 最小值）
 *      - 从左上角走到右下角路径的最大数字和
 *      - 最长上升子序列长度
 *      - 最长回文
 * 3.求存在性
 *      - 取石子游戏，先手是否必胜
 *      - 能不能选出k个数使得和是Sum
 * 
 * 二 动态规划解题步骤
 * 1. 确定状态
 *    - 简单的说，解动态规划的时候需要开一个数组，数组的每个元素f[i]或者f[i][j]代表什么
 *    - 确定状态需要有2个意识
 *      - 最后一步
 *      - 子问题
 * 2. 转移方程
 *    -  核心目标是将大问题拆解为一系列小问题
 *    -  在一系列小问题中取最优值
 * 3. 初始条件和边界情况
 * 4. 计算顺序
 */


/** 1.零钱兑换
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 * https://leetcode-cn.com/problems/coin-change/
 * 解法：
 * (1) 确定状态: f(n) 代表凑齐钱总数为n，所需要的最小硬币总数 
 * (2 )状态转移方程：f(n) = min{[f(n - coins[j])]) + 1}  , 其中 j 属于 coins数组[conins[0] ~ conins[coins.lenth -1]]
 * (3) 初始条件和边界情况： 
 *     - f(all) = -1
 *     - f(0) = 0
 *     - f(n) 可以计算的前提是： n > coins[j] && f(n - conis) !== -1 ,其中 j 属于[0 , coins.length -1 ]
 * (4)遍历顺序：从左到右
 */
export function coinChange(coins: number[], amount: number): number {
    if (!coins || coins.length < 1) {
        return 0;
    }
    const dp: Array<number> = new Array<number>(amount + 1);
    // 初始化
    dp.fill(-1);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++ ) {
            /** 拆解条件：需要兑换的钱 i > 硬币值coins[j] , 并且 i - conis[j] 的钱也可以兑换 */
            if (coins[j] <= i && dp[i - coins[j]] !== -1 ) {
                dp[i] = dp[i] === -1 ? 
                    (dp[i - coins[j]] + 1) :  // 如果未计算，直接赋值 
                    Math.min(dp[i], dp[i - coins[j]] + 1);  // 取最小值
            }
        }
    }
    return dp[amount];
};

/** 2.最大子序和
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * https://leetcode-cn.com/problems/maximum-subarray/
 * 
 *  解法：
 * (1) 确定状态: f(n) 代表当前数组索引n对应的最大的子序列和 
 * (2 )状态转移方程： f(n) = max (f(n - 1) + nums[n], nums[n]);
 * (3) 初始条件和边界情况： 
 *     - f(0) = nums[0]
 * (4)遍历顺序：从左到右 
 */
 export function maxSubArray(nums: number[]): number {
    let currentSum = Number.MIN_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < nums.length; i++) {
       currentSum = Math.max(currentSum + nums[i], nums[i]);
       if (max < currentSum) {
           max = currentSum;
       }
    }
    return max;
};

/** 3.最小路径和
 * 给定一个包含非负整数的 m x n 网格 grid ，
 * 请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * https://leetcode-cn.com/problems/minimum-path-sum/
 * 
 *  解法：
 * (1) 确定状态: f(i)(j) 代表：网格索引第 i 行 第j 列 路劲上总和最小值 
 * (2 )状态转移方程： f(n) = max(f(n - 1) + nums[n], nums[n]);
 * (3) 初始条件和边界情况： 
 *     - f(0) = nums[0]
 * (4)遍历顺序：从左到右
 * 解题： f(i,j) = min(f(i - 1, j), f(i, j -1)) + grid(i,j)
 *       f(i,j) 代表从(0,0) 到 （i,j）的路径总和的最小
 */
 export function minPathSum(grid: number[][]): number {
    if (!grid || grid.length < 1) {
        return 0;
    }
    const m = grid.length;  // 行
    const n = grid[0].length; //列
    const dp: Array<Array<number>> = [];
    for (let i = 0; i < m; i++) {
        dp[i] = [];
    }
    dp[0][0] = grid[0][0];
      // 赋值第一行路径总和
    for (let i = 1; i < n; i++) {
        dp[0][i] = dp[0][i - 1] + grid[0][i];  
    }
    // 赋值第一列路劲总和
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }

    for (let i = 1; i < m; i++ ) { // 行
        for (let j = 1; j < n; j++) { // 列
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j] ;
        }
    }
    return dp[m - 1][n - 1];
};


/**4.最长回文子串
 *  https://leetcode-cn.com/problems/longest-palindromic-substring/
 * 详细题解： https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zhong-xin-kuo-san-dong-tai-gui-hua-by-liweiwei1419/
 */
export function longestPalindrome(s: string): string {
    if (!s || s.length < 2 ) {
        return s;
    }
    const len: number = s.length;
    let maxLen: number = 1;
    let begin: number = 0;
    /**第一步定义状态： dp[i][j] 表示 s[i, j] 是否是回文串 */
    const dp: Array<Array<boolean>> = new Array<Array<boolean>>(len);
    /** 第二步： 初始化 初始化二维数组 */
    for (let i = 0; i < len; i++) {
        dp[i] = new Array<boolean>(len);
        dp[i][i] = true;
    }
    /** 第三步：状态转移方程
     *  2.1 当 j - i > 2 的时候：
        dp[i][j] = (s[i] == s[j]) and dp[i + 1][j - 1]
        2.2  当 0 <= j - i <=2 , 整理得于  0 <= j - i < 3  :  
        dp[i][j] = (s[i] ===  s[j])
     * 
     */
    for (let j = 1; j < len; j++) {
        for (let i = 0; i < j; i++) {
            if (s[i] !== s[j]) {
                dp[i][j] = false;
            } else {
                if (j - i < 3) { // 数组元素间隔小于3，也就是小于等于2
                    dp [i][j] = true;
                } else {
                    dp[i][j] = dp [i+1][j-1];
                }
            }
            /** 如果是dp[i][j] 是回文的情况下， 才进行比较回文的最长度 */
            if (dp[i][j] && j - i + 1 > maxLen) {
                maxLen = j - i + 1;
                begin = i;
            }
        }
    }
    return s.substring(begin , begin + maxLen);
};
/** 解法总结：
回文天然具有「状态转移」性质：一个长度严格大于 22 的回文去掉头尾字符以后，剩下的部分依然是回文。
反之，如果一个字符串头尾两个字符都不相等，那么这个字符串一定不是回文。「动态规划」的方法根据这样的性质得到。
第 1 步：定义状态
dp[i][j] 表示：子串 s[i..j] 是否为回文子串，这里子串 s[i..j] 定义为左闭右闭区间，即可以取到 s[i] 和 s[j]。

第 2 步：思考状态转移方程
根据头尾字符是否相等，需要分类讨论：
  2.1 当 j - i > 2 的时候：
       dp[i][j] = (s[i] == s[j]) and dp[i + 1][j - 1]

  2.2 当 0 <= j - i <=2，等价于 0 <= j - i < 3 , 也就是 s[j] 和 s[i] 最多相间隔一个元素的时候:  
      dp[i][j] = (s[i] ===  s[j])， （s[i] ~ s[j] 是否是回文，取决于 s[i] 和 s[j] 是否相等  ）
      
说明：
    2.3「动态规划」的「自底向上」求解问题的思路，很多时候是在填写一张二维表格。
    由于 s[i..j] 表示 s 的一个子串，因此 i 和 j 的关系是 i <= j，只需要填这张表格对角线以上的部分；

    2.4 元素相邻 或者 元素间隔一个元素的时候 即 j - i <=2 
        dp[i][j] = s[i] === s[j]

第 3 步：考虑初始化和边界条件
    单个字符一定是回文串，因此把对角线先初始化为 true，即 dp[i][i] = true。
根据第 2 步的说明：当 s[i..j] 的长度为 22 时，只需要判断 s[i] 是否等于 s[j]，所以二维表格对角线上的数值不会被参考。所以不设置 dp[i][i] = true 也能得到正确结论。

第 4 步：考虑输出
    一旦得到 dp[i][j] = true，就记录子串的「长度」和「起始位置」。没有必要截取，这是因为截取字符串也有性能消耗。

第 5 步：考虑优化空间
下面给出的「参考代码」，在填表的过程中，只参考了左下方的数值。事实上可以优化，但是增加了代码编写和理解的难度，丢失了可读性和可解释性。在这里不做优化空间；
填表应该遵守这样的原则：总是先得到小子串是否是回文的结果，然后大子串才能参考小子串的判断结果，所以填表顺序很重要；
建议自己动手，画一下表格，相信会对「动态规划」作为一种「表格法」有更好的理解。
 */

/**4.1 最长回文子串 解法2
 * https://leetcode-cn.com/problems/longest-palindromic-substring/
 * 解法2 采用中心扩散法
 * 「中心扩散法」的基本思想是：遍历每一个下标，以这个下标为中心，利用「回文串」中心对称的特点，往两边扩散，看最多能扩散多远。
 * （1）如果传入重合的下标，进行中心扩散，此时得到的回文子串的长度是奇数
 * （2）如果传入相邻的下标，进行中心扩散，此时得到的回文子串的长度是偶数。
*/
export function longestPalindrome2(s: string): string {
    if (!s || s.length < 2 ) {
        return s;
    }
    let res: Array<number> = [];
    let maxLen = 0;
    const sLen = s.length;

    for (let i = 0; i < sLen - 1; i++) {
        // 单数
        let odd: Array<number> = centerSpread(s, i, i);
        // 偶数
        let even: Array<number> = centerSpread(s, i, i + 1);
        let max: Array<number> = odd[1] > even[1] ? odd : even;
        if (max[1] > maxLen) {
            res = max;
            maxLen = max[1];
        }
    }
    return s.substring(res[0], res[0] + res[1]); 
}

function centerSpread(s: string, l: number, r: number): Array<number> {
    const sLen = s.length;
    while (l >= 0 && r < sLen) {
        if (s[l] === s[r]) {
            l--;
            r++;
        } else {
            break;
        }
    }
    return [l + 1, r - l - 1 ];
}

