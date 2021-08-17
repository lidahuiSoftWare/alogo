/**
 一.滑动窗口，适用于子串和子数组问题。
  其中滑动窗口分为 动态窗口 和 固定窗口。
 
 二. 动态滑动窗口技巧：
      1 维护一个窗口，r向右不断滑动
      2 在2.1 向右滑动的过程中，检测是否满足目标条件
      3 如果满足条件，l 开始向右滑动，刷除无用的元素，一直到条件不满足
      4 继续以往循环

 三 固定滑动窗口技巧
    在动态滑动窗口的基础上，在 3步 限制条件需要加上 固定窗口size 不变的的限制条件
    
 四 总结
    1. 建立移动窗口
    2. 根据条件时候调整扩大和缩小窗口
    3. 扩大窗口，r 指针向右
    4. 缩小窗口，l 指针向右

 五 代码模板
 function minWindow(s: string, t: string): string {
    if (!s || !t) {
        return '';
    }
    let l = 0, r = 0, start = 0, end = 0, match = 0;
    // win 窗口关键字
    const win = new Map<string, number>(); 
    // needs关键字 窗口
    const needs = new Map<string, number>(); 
    const tLen = t.length;
    for (let e of t ) {
        if (needs.has(e)) {
            needs.set(e, needs.get(e) + 1);
        } else {
            needs.set(e, 1);
        }
    }
    while (r < s.length) {
        // 窗口向右移动
        let c = s[r];
        // 右指针加1
        r++;
        .....

        // 判断左窗口是否需要右移动，也就是左窗口进一步缩小
        while (win need shrink) {
            ...
            // 获取当前l 的值
            let d  = s[l];
            // l向左移动
            l++;
            ...
        }
    }
}
*/ 
function mapPush(map: Map<string ,number>, e: string):void {
    if (map.has(e)) {
        map.set(e, map.get(e) + 1);
    } else {
        map.set(e, 1)
    }
}
 
/**1: 最小覆盖子串
  * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
  * 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
  * https://leetcode-cn.com/problems/minimum-window-substring/
*/
function minWindow(s: string, t: string): string {
    if (!s || !t) {
        return '';
    }
    let l = 0, r = 0, start = 0, end = 0, match = 0, minLen = Number.MAX_VALUE;
    // win 窗口关键字
    const win = new Map<string, number>(); 
    // needs关键字 窗口
    const needs = new Map<string, number>(); 
    for (let e of t ) {
        mapPush(needs,e);
    }
    const sLen = s.length;
    const nLen = needs.size;
    while (r < sLen) {
        /** 窗口向右移动 */
        let c = s[r];
        /** 右指针加1 */
        r++;
        if (needs.has(c)) {
            mapPush(win,c);
            /** 检测元素c 加入后，是否已经满足了 t字符串中对于元素c的个数要求  */
            if (win.get(c) == needs.get(c)) {
                match++;
            }
        }
        /** 窗口向右移动的过程中，检测是否已经覆盖了t的所有元素  */
        while (match === nLen) {
            if (minLen > (r - l)) {
                minLen = (r - l);
                start = l;
                end = r;
            }
            /** 删除最左边的元素，窗口向左移动, */
            // 获取当前l 的值
            let d = s[l];
            // l向左移动
            l++;
            if (needs.has(d)) {
                /**检测删除前元素，是否为关键 */
                if (win.get(d) == needs.get(d)) {
                    match--;
                }
                win.set(d, win.get(d) - 1);
            }
        }
    }
    return minLen < Number.MAX_VALUE ? s.slice(start,end) : '';
}

/** 2: 字符串的排列
 * 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。
 * https://leetcode-cn.com/problems/permutation-in-string/
 * 解法： 固定滑动窗口的题型
 */
function checkInclusion(s1: string, s2: string): boolean {
    if (!s1 || !s2) {
        return false;
    }
    const win = new Map<string, number>();
    const needs = new Map<string, number>();

    for (let e of s1 ) {
        mapPush(needs,e);
    }
    let l = 0, r = 0, match = 0;
    const nLen = needs.size
    const s1Len = s1.length;
    const s2Len = s2.length;
    while (r < s2Len) {
        let c = s2[r];
        r++;
        if (needs.has(c)) {
            mapPush(win,c);
            if (win.get(c) === needs.get(c)) {
                match++;
            }
        }
        /** 固定窗口锁住size */
        while ((r - l) >= s1Len) {
            /** 检测是否满足条件 */
            if (match === nLen) {
                return true;
            }
            /** 窗口l指针，向右移动，进行删除元素 */
            let d = s2[l];
            l++;
            /** 删除元素d，更新win 关键字和match */
            if (needs.has(d)) {
                if (win.get(d) === needs.get(d)) {
                    match--;
                }
                win.set(d, win.get(d) - 1);
            }
        }
    }
    return false;
}

/**3.找到字符串中所有字母异位词
 * https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
 * 解法： 固定滑动窗口的题型
 */
 function findAnagrams(s: string, p: string): number[] {
     const res: number[] = [];
     if (!s || !p) {
         return res;
     }
     const needs = new Map<string, number>();
     const win = new Map<string, number>();

     for (let e of p) {
        mapPush(needs,e);
     }
     let l = 0, r = 0, match = 0;
     const nLen = needs.size;
     const sLen = s.length;
     while (r < sLen) {
        let c = s[r];
        r++;
        if (needs.has(c)) {
            mapPush(win,c);
            if (win.get(c) === needs.get(c)) {
                match++;
            }
        }
        const pLen = p.length;
        while ((r - l) >= pLen) {
            if (match === nLen) {
                res.push(l);
            }
            let d = s[l];
            l++;
            if (needs.has(d)) {
                if (needs.get(d) === win.get(d)) {
                    match--;
                }
                win.set(d, win.get(d) - 1);
            }
        }
     }
     return res;
};

/** 4.无重复字符的最长子串
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 */
 function lengthOfLongestSubstring(s: string): number {
     if (!s || s.length < 1) {
        return 0;
     }
     let win = new Map<string, number>();
     let l = 0, r = 0, sLen = s.length, max = Number.MIN_VALUE;
     while (r < sLen) {
        let c = s[r];
        r++;
        mapPush(win,c);
        /**如果有重复的元素，左窗口向右移动，进行窗口缩小 */
        while (win.get(c) > 1) {
            let d = s[l];
            l++;
            win.set(d, win.get(d) - 1);
            if (win.get(d) === 0) {
                win.delete(d);
            }
        }
        if (max < win.size) {
            max = win.size;
        } 
     }
     return max;
 }

 function lengthOfLongestSubstring2(s: string): number { 
     if (!s || s.length < 1) {
        return  0;
     }
     let l = 0, r = 0, max = Number.MIN_VALUE;
     const set = new Set<string>();
     const sLen = s.length;
     while (r < sLen) {
        let c = s[r];
        r++;
        while (set.has(c)) {
            let d = s[l];
            l++;
            set.delete(d);
        }
        set.add(c);
        if (max < set.size) {
            max = set.size;
        }
     }
     return max;
 }

 function lengthOfLongestSubstring3(s: string): number { 
    if (!s || s.length < 1) {
       return  0;
    }
    let l = 0, r = 0, max = Number.MIN_VALUE;
    const sLen = s.length;
    const map = new Map<string,number>();
    while (r < sLen) {
        let c = s[r];
        if (map.has(c) && map.get(c) >= l) {
            l = map.get(c) + 1;
        }
        map.set(c,r);
        max = Math.max(max, r - l + 1);
        r++;
    }
    return max;
}

/**5.最长连续序列
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度
 * https://leetcode-cn.com/problems/longest-consecutive-sequence/
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
export function longestConsecutive(nums: number[]): number {
    if (!nums || nums.length < 1) {
        return 0;
    }
    let max = 1;
    const set = new Set<number>();
    // 消除重复
    for (let i = 0; i < nums.length; i++) {
        set.add(nums[i]);
    }
    for (let p of set) {
        if (set.has(++p) === false) {
           let len = 1; 
           while (set.has(++p)) {
                len++;
           }
           max = Math.max(max, len);
        }
    }
    return max;
};
/** 看似有双重循环，但仔细分析可知，数组中的每一个元素最多也就会被访问两次，因此还是线性的时间复杂度 */
