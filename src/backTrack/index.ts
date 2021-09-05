/**
 * 1. 组合
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 * https://leetcode-cn.com/problems/combinations/
 */

function combine(n: number, k: number): number[][] {
    const res: Array<Array<number>> = []
    combineHelper(n, k, 1, res, []);
    return res;
};

function combineHelper(n: number, k: number, start: number, res: Array <Array<number>>, path: Array<number>) {
    if (k === 0 && path) {
        res.push([...path]);
        return;
    }
      
    for (let i = start; i <= n - k + 1 ; i++) {
        path.push(i);
        combineHelper(n, k - 1, i + 1, res, path);
        path.pop();
    }
}

/**2. 组合总和III
 * 找出所有相加之和为 n 的 k 个数的组合。
 * 组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
 * https://leetcode-cn.com/problems/combination-sum-iii/
 * 解法： 回溯
 */
function combinationSum3(k: number, n: number): number[][] {
    let res: Array<Array<number>> = [];
    let path: Array <number> = [];
    combinationSum3Helper(k, n, 1, res, path);
    return res;
};

function combinationSum3Helper(k: number, n: number, start: number, res: Array<Array<number>> ,path: Array<number>): void { 
   if (n === 0 && k === 0) {
        res.push([...path]);
        return;
   }
   if (n <= 0 || k <= 0) {
        return ;
   }

   for (let i = start; i <= 9; i++) {
        path.push(i);
        combinationSum3Helper(k - 1, n - i, i + 1, res, path);
        path.pop();
   }
}

/**3. 字母组合
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/
 */
 function letterCombinations(digits: string): string[] {
    const letterMap: Array<string> = [ 
        "", // 0
        "", // 1
        "abc", // 2
        "def", // 3
        "ghi", // 4
        "jkl", // 5
        "mno", // 6
        "pqrs", // 7
        "tuv", // 8
        "wxyz", // 9  
    ];
    const res: Array<string> = [];
    letterCombinationsHelper(digits,letterMap,0, res, '');
    return res;
};

function letterCombinationsHelper(digits: string, letterMap:Array<string>, start: number, res: Array<string>, path: string): void { 
    if (path && path.length === digits.length) {
        res.push(path);
    }
    for (let i = start; i < digits.length; i++) {
        let csArray = letterMap[digits[i]];
        for (let j = 0; j < csArray.length; j++) {
            letterCombinationsHelper(digits,letterMap, i + 1, res, path + csArray[j]);
        }
    }
}