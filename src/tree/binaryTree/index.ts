import TreeNode from './TreeNode';

/** 1. 求二叉树的最小深度: https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/  */
export function getMinDepth(root: TreeNode): number {
    if (root === null) {
        return 0;
    }

    return getMin(root);
}

function getMin(node: TreeNode): number {
    if (node === null) {
        return 0;
    }

    return Math.min(getMin(node.left), getMin(node.right)) + 1;
}

/** 2. 求二叉树中节点的个数  */
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

/**4. 判断二叉树是否是平衡二叉树： https://leetcode-cn.com/problems/balanced-binary-tree/comments/ */
export function isBanced(root: TreeNode): boolean {
    return maxDeepth2(root) !== -1;
}

function maxDeepth2(node: TreeNode): number {
    if (node === null) {
        return  0;
    }
    const leftHight = maxDeepth2(node.left);
    const rightHeight = maxDeepth2(node.right);
    if (leftHight === -1 || rightHeight === -1 || Math.abs(leftHight - rightHeight) > 1) {
        return -1;
    }
    return Math.max(leftHight, rightHeight) + 1;
}

/** 5. 判断二叉树是否是完全二叉树 */
export function isCompleteTreeNode(root: TreeNode): boolean {
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
    }
    if (t1 === null || t2 === null) {
        return false;
    }
    if (t1.val !== t2.val) {
        return false;
    }

    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
}

/** 8. 翻转二叉树or镜像二叉树  */
function mirrorTree(root: TreeNode) {
    if (root === null) {
        return null; 
    }
    const leftTree: TreeNode = mirrorTree(root.left);
    const rightTree: TreeNode = mirrorTree(root.right);
    root.left = rightTree;
    root.right= leftTree;
    return root;
}

/** 9.求两个二叉树的最低公共祖先节点 */
function getLastCommonParent(root: TreeNode, t1: TreeNode, t2: TreeNode) {
    if (root === null) {
        return null;
    }

    if (t1 === null || t2 === null) {
        return null;
    }

    if (findNode(root.left, t1)) { // t1 如果在左子树
        if (findNode(root.right, t2)) { // t2 如果在右子树
            return root;
        } else {
            return getLastCommonParent(root.left, t1, t2);
        }
    } else { // t1 如果在右子树
        if (findNode(root.left, t2)) { // t2 如果在左子树 
            return root;
        } else {
            return getLastCommonParent(root.right, t1, t2);
        }
    }
}

function findNode(root: TreeNode, t1: TreeNode): boolean {
   if (root === null || t1 === null) {
        return false;
   }

   if (root.val === t1.val) {
        return true;
   }
   return findNode(root.left, t1) || findNode(root.right, t1);
}

/**10. 二叉树前序非递归 遍历: https://leetcode-cn.com/problems/binary-tree-preorder-traversal/submissions/ */
function preorderTraversal(root: TreeNode): Array<number> {
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
function inOrderTraversal(root: TreeNode): Array<number> {
    if (root === null) {
        return []
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
function inOrderTraversalRecursion(root: TreeNode): Array<number> {
    if (root === null) {
        return null;
    }
    const res: Array<number> = [];
    inOrderTraversalRecursionProcess(root,res);
    return res;
}

function inOrderTraversalRecursionProcess(root: TreeNode, res: Array<number>) {
    if (root === null) {
        return;
    }
    inOrderTraversalRecursionProcess(root.left, res);
    res.push(root.val);
    inOrderTraversalRecursionProcess(root.right,res);
}


/** 13. 二叉树后续遍历 非递归: https://leetcode-cn.com/problems/binary-tree-postorder-traversal/ */
function postOrderTraversal(root: TreeNode): Array<number> {
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


/** 14. 二叉树的层次遍历： 
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
 * 输出结果：每一层的数据，在一个数组中
 * [
    [3],
    [9,20],
    [15,7]
]
*/
function levelOrderTraversal(root: TreeNode): Array<Array<number>> {
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
  if  (start > end) {
    return null;
  }
  let node = null;
  const middle =  start + Math.floor((end - start) / 2) ;
  node = new TreeNode(nums[middle]);
  node.left = sortedArrayToBstProcess(nums, start, middle - 1);
  node.right = sortedArrayToBstProcess(nums, middle + 1, end);
  return node;
}

/** 16. 左叶子之和 https://leetcode-cn.com/problems/sum-of-left-leaves/ */
function sumOfLeftLeaves(root: TreeNode | null): number {
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
function pathInZigZagTree(label: number): number [] {
    const res: Array<number> = [];
    while (label) {
        res.push(label);
        label = Math.floor (label >> 1);
    }
    res.reverse();
    let l: number, r: number, deep = res.length;
    for (let i = 1; i < deep -1; i++) {
        if ( (deep & 1) !== (i & 1)) {
            continue;
        }
        l = 1 << i;
        r = ( 1 << l) - 1;
        res[i] = r + l - res[i] ;
    }
    return res;
}
