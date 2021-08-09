import ListNode from './dataStruct/listNode';

/**1.  删除有序数组中的重复项
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 */
function removeDuplicates(nums: number[]): number {
   if (!nums) {
       return 0;
   }
   const length = nums.length;
   if ( length <= 1) {
        return length; 
   }
   let p = 0, // 标志不重复项
       q = 1; // 标志当前项
   while (q < length) {
       if (nums[p] !== nums[q]) {
           if (q - p > 1) {
                nums[p+1] = nums[q];
           }
           p++;
       }
       q++;
   }
   return p + 1;
};

/**2. 旋转数组
 *  https://leetcode-cn.com/problems/rotate-array/
 */
function rotate(nums: number[], k: number): number[] {
     if (!nums || nums.length <= 1) {
         return;
     }
     k %= nums.length;
     reverse(nums, 0, nums.length -1);
     reverse(nums, 0, k - 1);
     reverse(nums, k, nums.length -1);
     return nums;
};

function reverse(nums: number[], start: number, end: number): void {
    while (start < end) {
      [nums[start++], nums[end++]] = [nums[end], nums[start]]
    }
}
/**3: 俩数之和 
 *  https://leetcode-cn.com/problems/two-sum/
*/
function twoSum(nums: number[], target: number): number[] {
    if  (!nums || nums.length < 2) {
        return [];
    }
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(target - nums[i])) {
            return [i, map.get(target - nums[i])];
        }
        map.set(nums[i], i);
    }
    return [];
};

/**4:合并两个有序链表
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/
 */
 function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if (l1 === null || l2 === null) {
        return l1 || l2;
    }
    // 构建一个假头
    let head:ListNode = new ListNode(0);
    // 当前指针
    let cur = head;
    while (l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) {
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        //当前指针，执向下一个元素
        cur = cur.next;
    }
    cur.next = l1 === null ? l2 : l1 ;
    return head.next;
};


/** 4. 移零
 *  https://leetcode-cn.com/problems/move-zeroes/
 */
 function moveZeroes (nums: Array<number>): void {
    if (nums === null) {
        return;
    }
    let p = 0, // 零出现最开始的位置，prev指针 
        q = 0, // 当前扫描元素
        len = nums.length;
    while (q < len) {
        if (nums[q] !== 0) {
            if (nums[p] === 0) {
                [nums[q], nums[p]] = [nums[p], nums[q]];
            }
            p++;
        }
        q++;
    }
}

/** 4.1 移零 解法2
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

/**5:  盛最多水的容器
 * https://leetcode-cn.com/problems/container-with-most-water/
 * 在每一个状态下，无论长板或短板收窄 11 格，都会导致水槽 底边宽度 -1
 * (1) 若向内移动短板，水槽的短板 min(h[i], h[j])可能变大，因此水槽面积 S(i, j)S(i,j) 可能增大。
 * (2) 若向内移动长板，水槽的短板 min(h[i], h[j])不变或变小，下个水槽的面积一定小于当前水槽面积。
 * 因此，向内收窄短板可以获取面积最大值
 * 
 */
 function maxArea(height: number[]): number {
     if (!height || height.length < 2) {
        return 0;
     }
     let i = 0, j = height.length -1, res = 0;
     while (i < j) {
        let width = j - i;
        res = height[i] <= height[j] ? 
                Math.max(res, width * Math.min(height[i++] , height[j])) :
                Math.max(res, width * Math.min(height[i] , height[j--])) ; 
     }
     return res;
};

/**6: 三数之和 
 * https://leetcode-cn.com/problems/3sum/
*/
function threeSum(nums: number[]): number[][] {
    if (!nums || nums.length < 3) {
        return [];
    }
    nums.sort((a, b) => a - b);
    const res: Array<Array<number>> = [];
    const length = nums.length;

    for (let i = 0 ; i < length - 2; i++) {
        if (nums[i] > 0 ) {
            break;
        }
        // 去重复
        if (i > 0 && nums[i-1] === nums[i]) {
            continue;
        }
        let l = i + 1;
        let r = length - 1;
        while (l < r ) {
            const sum = nums[i] + nums[l] +  nums[r];
            if (sum < 0) {
                while (l < r && nums[l] === nums[++l]);
            } else if (sum > 0) {
                while (l < r && nums[r] === nums[--r]);
            } else {
                res.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l+1]){
                    l++;
                };
                while (l < r && nums[r] === nums[r - 1]){
                    r--;
                };
                l--;
                r++;
            }
        }   
    }
    return res;
};

/** 7. 反转链表
 * https://leetcode-cn.com/problems/reverse-linked-list
*/
function reverseList(head: ListNode | null): ListNode | null {
    if (!head) {
        return head;
    }
    let p = null, q = head, newHead = null;
    while (q) {
        p = q;
        q = q.next;
        p.next = newHead;
        newHead = p;
    }
    return newHead;
};

/** 8. 俩俩交互链表中的节点
 * https://leetcode-cn.com/problems/swap-nodes-in-pairs/
 */

function swapPairs(head: ListNode | null): ListNode | null {
    if (!head) {
        return head;
    }
    let p:ListNode = head, q: ListNode = head && head.next;
    while (p && q) {
       [p.val, q.val] = [q.val, p.val];
       p = q.next;
       q = q.next && q.next.next;
    }
    return head;
};

/** 9. 环形链表
 * https://leetcode-cn.com/problems/linked-list-cycle/
 */
 function hasCycle(head: ListNode | null): boolean {
    let p = head, q = head;
    while (q && q.next) {
        p = p.next;
        q = q.next.next;
        
        if (p === q) {
            return true;
        }
    }
   return false;   
};

/** 10. 环形链表
 * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 * https://leetcode-cn.com/problems/linked-list-cycle/
 */
 function detectCycle(head: ListNode | null): ListNode | null {
   let p = head, q = head;
   while (q && q.next) {
       p = p.next;
       q = q.next.next;
       
       if (p === q) {
         q = head;
         while (p !== q) {
            p = p.next;
            q = q.next;
         }
         return p;
       }
   }
   return null;
};

/**
 * 11.  K 个一组翻转链表
 * https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
 */
 function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    let dumy = new ListNode(0);
    dumy.next = head;
    let pre = dumy, // 每次循环的第一个开始节点的前一个节点
        start = null, // 每次循环的第一个开始节点
        end = dumy, // 每次循环的最后结束节点
        next = null;  // 每次循环的最后结束节点的下一个节点
    while (end.next !== null) {
        for (let i = 0; i < k && end !== null; i++) {
            end = end.next;
        }
        if (end === null) {
            break;
        }
        // 设置：每次循环开始节点
        start = pre.next; 
        //保存结束节后的下一个节点 
        next = end.next; 
        /** 设置本次循环的结束节点的标志 */
        end.next = null;
        /** 链接好：已经旋转好的部分  */
        // 将原链表的前部分，连接到
        pre.next = myReverse(start);
        //将旋转好的链表连接到原链表中next
        start.next = next;
        /** 设置下一个循环的起点 */
        end = pre = start;
    }
    return dumy.next;    
};

function myReverse (node: ListNode): ListNode {
    let pre = null,
        curr = node,
        next = null;
    
    while (curr !== null) {
        next = curr.next;
        curr.next = pre;
        pre = curr;
        curr = next;
    }
    return pre;
}


/**12.在排序数组中查找元素的第一个和最后一个位置
 *  https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 */
 function searchRange(nums: number[], target: number): number[] {
    if (!nums) {
        return [ -1, -1];
    }
    let start = 0,
        end = nums.length - 1,
        res = [-1, -1];
        
    while (start <= end) {
        let mid = start + ((end - start ) >> 1);
        if (nums[mid] < target) {
            start = mid + 1;
        } else if (nums[mid] > target) {
            end = mid - 1;
        } else {
            let p = mid, q = mid;
            while ( p > 0 &&  nums[p] === nums[p - 1]) {
                p--;
            }
            while (q < (nums.length - 1) &&  nums[q] === nums[q + 1]) {
                q++;
            }
            res = [p,q];
            break;
        }
    }
    return res; 
};

/**13. 无重复字符的最长子串
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/hua-dong-chuang-kou-by-powcai/
 * 滑动窗口
 */
 function lengthOfLongestSubstring(s: string): number { 
    if (!s || s.length < 1) {
        return 0
    }
    let l = 0, r = 0, max = 0, len = s.length;
    const set = new Set();
    while (r < len) {
        while (set.has(s[r])) {
            set.delete(s[l])
            l++;
        }
        set.add(s[r]);
        max = Math.max(max, set.size);
        r++;
    }
    return max;
  } 

function lengthOfLongestSubstring2(s: string): number { 
   if (!s || s.length < 1) {
       return 0
   }
   const map: Map<string, number> = new Map();
   let max = 0,
       left = 0,
       len = s.length;
   for (let i = 0; i < len; i++ ) {
       if (map.has(s[i])) {
           left = Math.max(left, map.get(s[i]) + 1);
       }
       map.set(s[i], i);
       max = Math.max(max, i - left + 1);
   }
   return max;    
 }

 /**14: 最小覆盖子串
  * https://leetcode-cn.com/problems/minimum-window-substring/
  */
function minWindow(s: string, t: string): string {
    if (!s || !t) {
        return "";
    }
    const window = new Map<string, number>();
    const needs =  new Map<string, number>();
    let res: string = null;
    let start = 0, l = 0, r = 0, match = 0, minLen = Number.MAX_VALUE;
    let tLen = t.length;
    for (let i = 0; i < tLen ; i++) {
        let c = t[i];
        if (needs.has(c)) {
            needs.set(c, needs.get(c) + 1);
        } else {
            needs.set(c, 1);
        }
    }
    let len = s.length;
    while (r < len) {
        let c1 = s[r];
        if (needs.has(c1)) {
            if (window.has(c1)) {
                window.set(c1, window.get(c1) + 1); 
            } else {
                window.set(c1, 1);
            }
            if (window.get(c1) === needs.get(c1)) {
                match++
            }
        }
        r++;
        /** 如果元素找齐的情况下，进一步增大l的值，刷掉无用的元素 */
        while (match === needs.size) {
            if (r - l < minLen) {
                start = l;
                minLen = r - l;
            }
            let c2 = s[l];
            if (needs.has(c2)) {
                window.set(c2, window.get(c2) - 1);
            }
            if (window.get(c2) < needs.get(c2)) {
                match--;
            }
            l++; 
        }
    }
    res =  minLen === Number.MAX_VALUE ? "" : s.slice(start,start + minLen);
    return res;
};




