import TreeNode from './TreeNode';
/**4. 判断二叉树是否是平衡二叉树： https://leetcode-cn.com/problems/balanced-binary-tree/comments/ */
export function isBanced(root: TreeNode): boolean {
    return maxDeepth2(root) !== -1;
}
function maxDeepth2(root: TreeNode) {
    if (root === null) {
        return 0;
    }
    if (root.left === null && root.right === null) {
        return 1;
    }
    const lh = maxDeepth2(root.left);
    if (lh === -1) {
        return -1;
    }
    const rh = maxDeepth2(root.right);
    if (rh === -1) {
        return -1;
    }
    if (Math.abs(lh - rh) > 1) {
        return -1;
    }
    return Math.max(lh, rh);
}

