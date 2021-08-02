import TreeNode from './TreeNode';

/** 1. 求二叉树的最小深度  */
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

/**4. 判断二叉树是否是平衡二叉树 */
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

    if (findNode(root.left, t1)) { // 左子树
        if (findNode(root.right, t2)) {
            return root;
        } else {
            return getLastCommonParent(root.left, t1, t2);
        }
    } else { // 右子树
        if (findNode(root.left, t2)) { 
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

/** 10. 二叉树非递归 后续遍历 */
function postOrderTraversal(root: TreeNode): Array<number> {
    if (root === null) {
        return null;
    }
    const list: Array<number> = [];
    const stack: Array<TreeNode> = [];
    stack.push(root);
    let current = root,
        prev = null;

    while (stack.length || current !== null) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.shift();
        if (current.right === null || (prev && prev.right === current)) {
            list.push(current.val);
            prev = current;
            current = null;
        } else {
            stack.push(current);
            current = current.right
        }
    }
}

/** 11. 二叉树的层次遍历： 
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

