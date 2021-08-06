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





