import TreeNode from './TreeNode';
import Node from './Node';

/** 1. 求二叉树的最小深度: 
 * 给定一个二叉树，找出其最小深度。
   最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
   说明：叶子节点是指没有子节点的节点。
 *  https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/  */
export function getMinDepth(root: TreeNode): number {
    if (!root) {
        return 0;
    }
    if (root.left && root.right) { /** 左右子树都存在的情况下 */
        return Math.min(getMinDepth(root.left), getMinDepth(root.right)) + 1;
    } else if (root.left && !root.right) { /** 只有左子树*/
        return getMinDepth(root.left) + 1
    } else if (!root.left && root.right) {  /** 只有右子树*/
        return getMinDepth(root.right) + 1
    } else { /** 叶节点*/
        return 1;
    }
}

/** 2. 求二叉树中节点的个数:
 * https://leetcode-cn.com/problems/count-complete-tree-nodes/
*/
export function numOfTreeNode(root: TreeNode) : number {
    if (root === null) {
        return 0;
    }
    return  numOfTreeNode(root.left) + numOfTreeNode(root.right) + 1;
}

/** 3. 求二叉树中叶子节点的个数  */
export function numsOfNoChildNode(root: TreeNode): number {
    if (root === null) {
        return 0;
    }
    if (root.left === null && root.right === null) {
        return 1;
    }
    return numOfTreeNode(root.left) + numOfTreeNode(root.right);
}

/**4. 判断二叉树是否是平衡二叉树： 
 * https://leetcode-cn.com/problems/balanced-binary-tree/comments/ */
export function isBanced(root: TreeNode): boolean {
    return maxDeepth2(root) !== -1;
}

function maxDeepth2(node: TreeNode): number {
    if (node === null) {
        return  0;
    }
    const leftHight = maxDeepth2(node.left);
    if (leftHight === -1) {
        return -1;
    }
    const rightHeight = maxDeepth2(node.right);
    if (rightHeight === -1) {
        return -1;
    } 
    if (Math.abs(leftHight - rightHeight) > 1) {
        return -1;
    }
    return Math.max(leftHight, rightHeight) + 1;
}

/** 5. 判断二叉树是否是完全二叉树 
 * https://leetcode-cn.com/problems/check-completeness-of-a-binary-tree/submissions/
*/
export function isCompleteTreeNode(root: TreeNode): boolean {
    if (root === null) {
        return true;
    }
    let hasNoChild = false;
    const queue: Array<TreeNode> = [];
    queue.push(root);
    
    while (queue.length) {
        let p = queue.shift();
        if (hasNoChild && p) {
            return false;
        }
        if (p === null) {
            hasNoChild = true;
            continue;
        }
        queue.push(p.left);
        queue.push(p.right);
    }
    return true;
}

/** 解法2:  判断二叉树是否是完全二叉树  
 *  https://leetcode-cn.com/problems/check-completeness-of-a-binary-tree/submissions/
*/
export function isCompleteTreeNode2(root: TreeNode): boolean { 
    if (root === null) {
        return false;
    }
    const queue: Array<TreeNode> = [];
    queue.push(root);
    let result= true;
    let hasNoChild = false; // 标志后面的节点不能在出现孩子节点
    while(queue.length) {
        let current: TreeNode = queue.shift();
        if (hasNoChild) {
            if (current.left !== null || current.right !== null) {
                result = false;
                break
            }
        } else {
            if (current.left !== null && current.right !== null) {
                queue.push(current.left);
                queue.push(current.right);
            } else if (current.left !== null && current.right === null) {
                //出现右子树为空的情况下，后续得层级的节点都是叶节点，也就是不能出现节点不能有孩子节点
                queue.push(current.left);
                hasNoChild = true;
            } else if (current.left === null && current.right !== null) {
                result = false;
                break;
            } else {
                // 当出现叶节点，后续的叶节点都是
                hasNoChild = true;
            }
        }
    }
    return result;
}

/** 6. 判断2个二叉树是否完成相同 */
export function isSameTreeNode(t1: TreeNode , t2: TreeNode): boolean {
    if (t1 === null && t2 === null) {
        return true;
    } else if (t1 === null || t2 === null) {
        return false;
    }

    if (t1.val !== t2.val) {
        return false;
    }
    const sameLeft = isSameTreeNode(t1.left, t2.left);
    const sameRight = isSameTreeNode(t2.left, t2.right);
    return sameLeft && sameRight;
}

/** 7. 判断俩个树是否互为镜像 */
export function isMirror(t1: TreeNode, t2: TreeNode): boolean {
    if (t1 === null && t2 === null) {
        return true;
    }else if (t1 === null || t2 === null) {
        return false;
    }
    if (t1.val !== t2.val) {
        return false;
    }

    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
}

/** 8. 翻转二叉树or镜像二叉树  */
export function mirrorTree(root: TreeNode) {
    if (root === null) {
        return null; 
    }
    const leftTree: TreeNode = mirrorTree(root.left);
    const rightTree: TreeNode = mirrorTree(root.right);
    root.left = rightTree;
    root.right= leftTree;
    return root;
}

/** 9.求两个二叉树的最低公共祖先节点
 *  https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/236-er-cha-shu-de-zui-jin-gong-gong-zu-xian-hou-xu/
 */
export function getLastCommonParent(root: TreeNode, t1: TreeNode, t2: TreeNode) {
    if  (root === null || root === t1 || root === t2) {
        return root;
    }
    const left = getLastCommonParent(root.left, t1, t2);    
    const right = getLastCommonParent(root.right, t1, t2);
    if (left === null) {
        return right;
    }
    if (right === null) {
        return left;
    }
    return root;
}

/**
 * 10. 二叉搜索树的最近公共祖先 
 * https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/ */
export function lowestCommonAncestor(root: TreeNode | null, t1: TreeNode | null, t2: TreeNode | null): TreeNode | null { 
     if (root === null || root === t1 || root === t2) {
        return root;
     }
     if (t1.val === t2.val) {
        return t1;
     }
     
     if (root.val > t1.val && root.val > t2.val) {
        return lowestCommonAncestor(root.left, t1, t2);
     } else if  (root.val < t1.val && root.val < t2.val) {
        return lowestCommonAncestor(root.right, t1, t2);
     } else {
         return root;
     }
 }

/**11. 二叉树前序非递归 遍历: https://leetcode-cn.com/problems/binary-tree-preorder-traversal/submissions/ */
export function preorderTraversal(root: TreeNode): Array<number> {
    if (!root) {
        return [];
    }
    const res: Array<number> = [];
    const stack: Array<TreeNode> = [];
    stack.push(root);
    
    while (stack.length) {
        let current = stack.pop();
        res.push(current.val);
        if (current.right) {
            stack.push(current.right);
        }
        if (current.left) {
            stack.push(current.left);
        }
    }
    return res;
}

/** 11. 二叉树非递归 中序遍历 */
export function inOrderTraversal(root: TreeNode): Array<number> {
    if (root === null) {
        return [];
    }
    const stack: Array<TreeNode> = [];
    const res: Array<number> = [];
    let current = root;

    while (stack.length || current !== null) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        res.push(current.val);
        current = current.right;
    }
    return res;
}

/** 12. 二叉树中序遍历 递归版本 */
export function inOrderTraversalRecursion(root: TreeNode): Array<number> {
    if (root === null) {
        return null;
    }
    const res: Array<number> = [];
    inOrderTraversalRecursionProcess(root,res);
    return res;
}

export function inOrderTraversalRecursionProcess(root: TreeNode, res: Array<number>) {
    if (root === null) {
        return;
    }
    inOrderTraversalRecursionProcess(root.left, res);
    res.push(root.val);
    inOrderTraversalRecursionProcess(root.right,res);
}


/** 13. 二叉树后续遍历 非递归: https://leetcode-cn.com/problems/binary-tree-postorder-traversal/ */
export function postOrderTraversal(root: TreeNode): Array<number> {
    if (root === null) {
        return [];
    }
    const list: Array<number> = [];
    const stack: Array<TreeNode> = [];
    let current = root,
        prev = null;

    while (stack.length || current !== null) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        /** 后续遍历的条件：当前节点为叶节点 或者 已经访问了当前节点右子树  */
        if (current.right === null || (current.right === prev)) {
            list.push(current.val);
            prev = current;
            current = null;
        } else {
            // 如果该节点存在右子树，并且右子树还未访问的情况下，将节点重新入栈。并把当前节点更改为右子树根节点
            stack.push(current);
            current = current.right
        }
    }
    return list;
}

export function postOrderTraversal2(root: TreeNode): Array<number> {
    if (root === null) {
        return [];
    }
    const stack1: Array<TreeNode> = [];
    const stack2: Array<TreeNode> = [];
    const res: Array<number> = [];
    stack1.push(root);
    while (stack1.length) {
         /** 第一步构造：前右左序列 */
        let node = stack1.pop();
        /** 第二步：根据stack的特点，后进先出，构造逆序访问： 前右左 */
        stack2.push(node);
        if (node.left) {
            stack1.push(node.left);
        }
        if (node.right) {
            stack1.push(node.right);
        }
    }
    /** 第二步构造：左右前 */
    while (stack2.length) {
        let node = stack2.pop();
        res.push(node.val);
    }
    return res;
}


/** 14. 二叉树的层次遍历： 
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
 * 输出结果：每一层的数据，在一个数组中
 * [
    [3],
    [9,20],
    [15,7]
]
*/
export function levelOrderTraversal(root: TreeNode): Array<Array<number>> {
    if (root === null) {
        return null;
    }
    const res: Array<Array<number>> = [];
    const queue: Array<TreeNode> = [];
    queue.push(root);
    let current = null;

    while(queue.length) {
        let count = queue.length; 
        let list: Array<number> = [];
        /** 对每一层队列的长度进行快照，也就是 每一层数组元素的个数 */
        while (count > 0) {
            current = queue.shift();
            if (current.left) {
                queue.push(current.left);
            }
            if (current.right) {
                queue.push(current.right);
            }
            list.push(current.val);
            count --;
        }                                                                                         
        res.push(list);
    }
    return res;
}

/** 15.有序数组转换为二叉搜索树 
 *  https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/
*/
export function sortedArrayToBst(nums: Array<number>): TreeNode {
    if (!nums || nums.length <= 0) {
        return null;
    }
    return sortedArrayToBstProcess(nums, 0, nums.length -1);
}

function sortedArrayToBstProcess(nums: number[], start: number, end: number): TreeNode {
    if (start > end) {
        return null;
    }
    let node = null;
    const middle =  start + Math.floor((end - start) >> 1) ;
    node = new TreeNode(nums[middle]);
    node.left = sortedArrayToBstProcess(nums, start, middle - 1);
    node.right = sortedArrayToBstProcess(nums, middle + 1, end);
    return node;
}

/** 16. 左叶子之和 https://leetcode-cn.com/problems/sum-of-left-leaves/ */
export function sumOfLeftLeaves(root: TreeNode | null): number {
    return sumOfLeftLeavesProcess(root, null);
};

function sumOfLeftLeavesProcess(root: TreeNode | null, parent: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    if (root.left === null && root.right === null && parent && parent.left === root) {
        return root.val;
    }
    const lh = sumOfLeftLeavesProcess(root.left, root);
    const rh = sumOfLeftLeavesProcess(root.right, root);
    return lh + rh;
};

/** 17. 在一棵无限的二叉树上，每个节点都有两个子节点，树中的节点 逐行 依次按 “之” 字形进行标记
 * 给你树上某一个节点的标号 label，请你返回从根节点到该标号为 label 节点的路径，该路径是由途经的节点标号所组成的
 *  二叉树寻路 https://leetcode-cn.com/problems/path-in-zigzag-labelled-binary-tree/ */
export function pathInZigZagTree(label: number): number [] {
    const res: Array<number> = [];
    // 自底项目向上
    while (label) {
        res.push(label);
        label = Math.floor (label >> 1);
    }
    // 因为自底向下，所以数组要倒序
    res.reverse();
    let l: number, r: number, deep = res.length;
    for (let i = 1; i < deep - 1; i++) {
        /** deep 奇数，则需要对偶数层为进行操作  
            deep 偶数，则需要对奇数层进行操作
            deep 和 i 同时为 奇数/偶数 的情况下，直接跳转*/
        if ( (deep & 1) !== (i & 1)) {
            continue;
        }
        l = 1 << i;
        r = ( 1 << l) - 1;
        res[i] = r + l - res[i] ;
    }
    return res;
}

/** 18 给定一棵树的前序遍历 preorder 与中序遍历  inorder。请构造二叉树并返回其根节点。
 * https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 */
export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (!preorder || !inorder || preorder.length < 1 || inorder.length < 1 ) {
        return null;
    }
    const map = new Map<number, number>();
    inorder.forEach((p,index) => map.set(p,index));
    return buildTreeHelper(preorder, 0 , preorder.length - 1 , inorder, 0, inorder.length - 1, map);
};
/**
 * 
 * @param preorder 前序集合
 * @param ps 前序集合序start
 * @param pe 前序集合序end
 * @param inorder 后序集合
 * @param is 中序集合序start
 * @param ie 中序集合序end
 */
function buildTreeHelper(preorder: number[], ps: number, pe: number, inorder: number[], is: number, ie: number, inorderMap: Map<number, number>): TreeNode {
    if (ps > pe || is > ie) {
        return null;
    }
    const head = new TreeNode(preorder[ps]);
    let headIndexOfInorder = inorderMap.get(preorder[ps]);
    // 确定左子树节点总数
    const leftNum = headIndexOfInorder - is; 
    // 建立左子树
    head.left = buildTreeHelper(preorder, ps + 1, ps + leftNum, inorder, is, headIndexOfInorder - 1, inorderMap);
    // 建立右子树
    head.right = buildTreeHelper(preorder, ps + leftNum + 1, pe, inorder, headIndexOfInorder + 1, ie, inorderMap);
    return head;
}

/**19:路径总和
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum ，
 * 判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 
 * https://leetcode-cn.com/problems/path-sum/
 */

export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (root === null) {
        return false;
    } else {
        return hasPathSumHelper(root,targetSum);
    }
};

function hasPathSumHelper(root: TreeNode | null, targetSum: number): boolean {
    if (!root.left && !root.right) {
        if (root.val === targetSum) {
            return true;
        } else {
            return false;
        }
    }
    targetSum = targetSum - root.val;
    if (root.left) {
        if (hasPathSumHelper(root.left,targetSum)) {
            return true
        }
    }
    if (root.right) {
        if (hasPathSumHelper(root.right, targetSum)) {
            return true
        }
    }
    return false;
};

/**20:路径总和
* 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
* 叶子节点 是指没有子节点的节点
* 链接：https://leetcode-cn.com/problems/path-sum-ii
* 解题方法：深度遍历
 */
export function pathSum(root: TreeNode | null, targetSum: number): number[][] {
   const res: Array<Array<number>> = [];
   if (!root) {
        return res;
   }
   pathSumHelper(root, targetSum,[], res);
   return res;
};

function pathSumHelper(node: TreeNode | null, targetSum: number, currList: Array<number>, res: Array<Array<number>>): void{
   if (!node.left && !node.right && targetSum === node.val && ) {
        currList = [...currList, node.val];
        res.push(currList);
   }
   targetSum = targetSum - node.val;
   if (node.left) {
       currList.push(node.val);
       pathSumHelper(node.left,targetSum, currList, res);
       currList.pop();
   }
   if (node.right) {
        currList.push(node.val);
        pathSumHelper(node.right,targetSum, currList, res);
        currList.pop();
   }
};

/**21.二叉树层次遍历
 * 给定一个二叉树，返回其节点值自底向上的层序遍历。 
 * （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/
 * 解法：层次遍历
 */
export function levelOrderBottom(root: TreeNode | null): number[][] {
    if (!root) {
        return []
    }
    const res:Array<Array<number>> = [];
    const queue: Array<TreeNode> = [];
    queue.push(root);
    while (queue.length) {
        let count = queue.length;
        let list: Array<number> = [];
        while (count--) {
            let node = queue.shift();
            list.push(node.val);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        res.push(list); 
    }
    res.reverse();
    return res;
};

/**22.二叉树的右视图
 * https://leetcode-cn.com/problems/binary-tree-right-side-view/
 * 解法： 层次遍历，每次取最右边的值
 */
export function rightSideView(root: TreeNode | null): number[] {
    if (!root) {
        return [];
    }
    const res: Array<number> = [];
    const queue: Array<TreeNode> = [];
    queue.push(root);
    while (queue.length) {
        let count = queue.length;
        while (count--) {
            let node: TreeNode = queue.shift();
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
            if (count === 0) {
                res.push(node.val);
            }
        }
    }
    return res;
};
/**23.二叉树的平均值
 * https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/
 * 解法： 层次遍历
 */
export function averageOfLevels(root: TreeNode | null): number[] {
    if (!root) {
        return [];
    }
    const res: Array<number> = [];
    const queue: Array<TreeNode> = [];
    queue.push(root);

    while (queue.length) {
        let count = queue.length;
        let base = queue.length;
        let av = 0;
        while (count--) {
            let node = queue.shift();
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
            av = av + node.val;
        }
        av = av / base;
        res.push(av);
    }
    return res;
};

/**24. N 叉树的层序遍历
 * 给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。
 * 树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。
 * https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/
 * 解法： 层次遍历
 */
export function levelOrder(root: Node | null): number[][] {
    if (!root) {
        return [];
    }
    const res: Array<Array<number>> = [];
    const queue: Array<Node> = [];
    queue.push(root);
    
    while (queue.length) {
        let count = queue.length;
        let list: Array<number> = [];
        while (count--) {
            let node = queue.shift();
            for (let p of node.children) {
                queue.push(p);
            }
            list.push(node.val);
        }
        res.push(list);
    }
    return res;
};
/** 25.在每个树行中找最大值
 * 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。
 * https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row/
 */
export function largestValues(root: TreeNode | null): number[] {
    if (!root) {
        return [];
    }
    const res:Array<number> = [];
    const queue: Array<TreeNode> = [];
    queue.push(root);

    while (queue.length) {
        let count = queue.length;
        let max = Number.MIN_SAFE_INTEGER;
        while (count--) {
            let node = queue.shift();
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
            max = Math.max(max, node.val);
        }
        res.push(max);
    }
    return res;
};
