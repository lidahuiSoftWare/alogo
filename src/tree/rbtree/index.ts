enum Color {
    Red,
    Black,
}

/** 红黑树 */
class TreeNode {
    data: number;
    color: Color;
    left: TreeNode;
    right: TreeNode;
    parent: TreeNode;

    constructor(data: number) {
        this.data = data;
        this.color = Color.Red;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    public toString(): String {
        return `${this.data} (${this.color ? 'red': 'black'} )`;
    }
}

export default class RedBlackTree {
    root: TreeNode;

    constructor(){
        this.root = null;
    }

    /** 搜索 */
    public search(data: number): TreeNode {
        let tmp: TreeNode = this.root;

        while (tmp != null) {
            if (tmp.data == data) {
                return tmp;
            } else if (data > tmp.data ) {
                tmp = tmp.right;
            } else {
                tmp = tmp.left;
            }
        }
        return null;
    }

    /** 插入新元素  */
    public insert(data: number) {
        /** 新插入的元素都为红色 */
        let node: TreeNode = new TreeNode(data);
        
        if (this.root === null) {
            node.color = Color.Black;
            this.root = node;
            return; 
        }
        let targetNode: TreeNode = this.root;
        while (targetNode != null ) {
            if (data >= targetNode.data) {
                if (targetNode.right === null) {
                    targetNode.right = node;
                    node.parent = targetNode;
                    this._insertAujust(node);
                    return;
                }
                targetNode = targetNode.right;
            } else {
                if (targetNode.left === null) {
                    targetNode.left = node;
                    node.parent = targetNode;
                    this._insertAujust(node);
                    return;
                }
                targetNode = targetNode.left;
            }
        }
    }

    private _insertAujust(node: TreeNode) {
       let parent: TreeNode = null,
           grandParent: TreeNode = null;

        /** 只有父亲的节点颜色为红色 与 新插入的节点颜色，冲突的时候才需要调整 */
        while (node.parent !== null && node.parent.color === Color.Red) {
            parent = node.parent;
            grandParent = parent.parent; // 父亲不为根节点，并且为红色，其父亲的父亲的节点一定存在，并且为黑色
            if (grandParent.left === parent) {
            /** 父亲为祖父的左孩子节点  */
                const uncle: TreeNode = grandParent.right;
                /** 场面1： 叔叔节点为红色 */
                if (uncle && uncle.color === Color.Red) {
                    parent.color = Color.Black;
                    uncle.color = Color.Black;
                    grandParent.color = Color.Red;
                    node = grandParent; // 回溯检测
                    continue;
                }
                /** 场面2：关注节点为父亲右孩子节点， 叔叔节点为黑色  */
                if (node === parent.right) {
                    this._leftRotate(parent);
                    node = parent;         
                    parent = node.parent;
                }
                /** 场面3：关注节点为父亲左孩子节点，叔叔节点为黑色 */
                parent.color = Color.Black;
                grandParent.color = Color.Red;
                this._rightRotate(grandParent);
            } else {
             /** 父亲为祖父的右孩子节点 */
                const uncle: TreeNode = grandParent.right;
                /** 场面1： 叔叔节点为红色 */
                if (uncle && uncle.color === Color.Red) {
                    parent.color = Color.Black;
                    uncle.color = Color.Black;
                    grandParent.color = Color.Red;
                    node = grandParent; // 回溯检测
                    continue;
                }
                /** 场面2：关注节点为父亲左孩子节点， 叔叔节点为黑色  */
                if (node === parent.left) {
                    this._rightRotate(parent);
                    node = parent;
                    parent = node.parent;
                }
                /** 场面3：关注节点为父亲左孩子节点，叔叔节点为黑色 */
                parent.color = Color.Black;
                grandParent.color = Color.Red;
                this._leftRotate(grandParent);
            }
        }
        /** 经过局面3调整：根节点的看了颜色调整为 红色 */
        if (this.root.color === Color.Red) {
            this.root.color = Color.Black;
        } 
    }

    public remove(data: number): boolean {
        let node: TreeNode = this.search(data);
        
        if (node) {
            this._remove(node);
        }
        return node ? true : false;
    }

    private _remove(node: TreeNode) {
        if (node === null) {
            return;
        }
        /** 第一步： 如果删除的元素有2个非空的孩子节点，转换成待删除的节点只有一个孩子节点(或没有孩子)的情况 */
        if (node.left !== null && node.right !== null) {
            let successNode = node.right;
            while (successNode.left !== null) {
                successNode = successNode.left;
            }
            // 将successNode 中的数据，覆盖到被删的节点的数据，实现逻辑上删除要删除的节点
            node.data = successNode.data;
            // 删除靠近叶节点的successNode 节点，因为 原succesNode中的数据已经保存到原被删除的node 位置的data中
            this._remove(successNode); // 递归删除节点 
            return;
        } 
        /** 第二步： 根据待删除节点和其唯一节点(或者没有子节点)的颜色，进行分情况处理 */
        let successNode: TreeNode = node.left !== null ? node.left : node.right;
        let parent: TreeNode  = node.parent;
        // 删除的节点为根节点，并且只有唯一节点(或者没有节点)
        if (parent === null) {
            this.root = successNode;
            if (successNode !== null) {
                successNode.parent = null;
            }
            return;
        }
        // 执行删除node 节点
        if (successNode !== null) {
            successNode.parent = parent;
        }
        if (parent.left === node) {
            parent.left = successNode;
        } else {
            parent.right = successNode;
        }

        /**被删除的节点颜色为黑色，需要进一步平衡黑色节点总数*/
        if (node.color === Color.Black ) {
            /** 被删除节点为红色，其唯一的孩子节点为红色，将被删除的孩子节点变更为黑色，用来补充减少的黑色节点颜色 */
          if (successNode !== null && successNode.color === Color.Red) {
                successNode.color = Color.Black;
          } else {
              /** 处理双黑节点：被删除的节点和唯一的孩子节点(或者孩子节点为null，null 节点同为黑色)同为黑色 */
              this._removeAdjust(parent, successNode);
          }
        }
    }

    /** 调节双黑节点 */
    private _removeAdjust(parent: TreeNode, node: TreeNode) {                                        
        while ((node === null || node.color === Color.Black) && node !== this.root) {
            // 左子树
            if (parent.left === node) {
                let sibling = parent.right;
                /**子情况1: node的兄弟节点为右孩子红色, 根据红黑树的规则 父节点为黑色， 侄子节点为黑色*/
                if (sibling.color === Color.Red) {
                    /** 通过左旋将子情况1转换为后续其他情况处理 */
                    parent.color = Color.Red;
                    sibling.color = Color.Black;
                    this._leftRotate(parent);
                    sibling = parent.right; 
                }
                /** 后续所有的情况都是： 兄弟节点为黑色 */
                if ((sibling.left === null || sibling.left.color === Color.Black) && 
                    (sibling.right === null || sibling.right.color === Color.Black)) {
                    /** 子情况2: node 父节点是黑色，兄弟和侄子节点是黑色 */
                    if (parent.color === Color.Black) {
                        sibling.color = Color.Red;
                        /** 
                        parent 对应的内部左右分支同时减少了一个黑色节点，
                        此时parent原就是黑色，parent 整体对外分支无法补充到新增的黑色节点，
                        因此parent对外的分支总体个数少了一个黑色节点 
                        需要继续回溯,将parent 作为关注节点继续回溯 */
                        node = parent;
                        parent = parent.parent; 
                        continue;
                    } 
                    /** 子情况3: node 父节点是红色，兄弟和侄子是黑色*/
                    else {
                        // parent 对应的内部分支同时减少一个黑色节点，同时将parent 由红色更改为 黑色， 对parent外部分支黑色个数没有变化
                        parent.color = Color.Black;
                        sibling.color = Color.Red;
                        break;
                    }  
                }
                /**  子情况4: node的父亲节点随意，兄弟节点是黑色右孩子，左侄子是红色，右侄子是黑色 */
                if (sibling.left !== null && sibling.left.color === Color.Red 
                    && (sibling.right === null || sibling.right.color === Color.Black)) {
                        sibling.color = Color.Red;
                        sibling.left.color = Color.Black;
                        this._rightRotate(sibling);
                        sibling = sibling.parent;
                }
                /** 子情况5：node的父亲节点随意，兄弟节点是黑色右孩子，右侄子是红色, 左侄子随意*/
                if (sibling.right !== null && sibling.right.color === Color.Red) {
                    sibling.color = parent.color;
                    parent.color = Color.Black;
                    sibling.right.color = Color.Black;
                    this._leftRotate(parent);
                    break;        
                }
            } 
            // 右子树
            else {
                let sibling: TreeNode = parent.left;
                /**子情况1: node的兄弟节点为左孩子红色, 根据红黑树的规则 父节点为黑色， 侄子节点为黑色*/
                if (sibling.color === Color.Red) {
                    /** 通过右旋将子情况1转换为后续其他情况处理 */
                    this._rightRotate(parent);
                    parent.color = Color.Red;
                    sibling.color = Color.Black;
                    sibling = parent.right; 
                }
                /** 后续所有的情况都是： 兄弟节点为黑色 */
                if ((sibling.left === null || sibling.left.color === Color.Black) && 
                    (sibling.right === null || sibling.right.color === Color.Black)) {
                        /** 子情况2: node 父节点是黑色，兄弟和侄子节点是黑色 */
                        if (parent.color === Color.Black) {
                            sibling.color = Color.Red;
                            /** 
                            parent 对应的内部左右分支同时减少了一个黑色节点，
                            此时parent原就是黑色，parent 整体对外分支无法补充到新增的黑色节点，
                            因此parent对外的分支总体个数少了一个黑色节点 
                            需要继续回溯,将parent 作为关注节点继续回溯 */
                            node = parent;
                            parent = parent.parent; 
                            continue;
                        } 
                        /** 子情况3: node 父节点是红色，兄弟和侄子是黑色*/
                        else {
                            // parent 对应的内部分支同时减少一个黑色节点，同时将parent 由红色更改为 黑色， 对parent外部分支黑色个数没有变化
                            parent.color = Color.Black;
                            sibling.color = Color.Red;
                            break;
                        }  
                }
                 /**  子情况4: node的父亲节点随意，兄弟节点是黑色右孩子，左侄子是黑色，右侄子是红色*/
                 if (sibling.right !== null && sibling.right.color === Color.Red 
                    && (sibling.left === null || sibling.left.color === Color.Black)) {
                        sibling.color = Color.Red;
                        sibling.right.color = Color.Black;
                        this._leftRotate(sibling);
                        sibling = sibling.parent;
                }
                /** 子情况5：node的父亲节点随意，兄弟节点是黑色左孩子，左侄子是红色, 右侄子随意*/
                if (sibling.left !== null && sibling.left.color === Color.Red) {
                    sibling.color = parent.color;
                    parent.color = Color.Black;
                    sibling.left.color = Color.Black;
                    this._rightRotate(parent);
                    break;        
                }
            }
        }
    }
    
    /** 右旋转 */
    private _rightRotate( node: TreeNode) {
       let left = node.left;
       let parent = node.parent;

       node.left = left.right;
       if (left.right) {
        (left.right).parent = node;
       }
       left.right = node;
       node.parent = left;

       if (parent === null) {
            this.root = left;
            left.parent = null;
       } else {
           if (parent.left !== null && parent.left == node ) {
                parent.left = left;
           } else {
                parent.right = left;
           }
           left.parent = parent;
       }
    }

    /** 左旋转 */
    private _leftRotate(node: TreeNode) {
        const right: TreeNode = node.right;
        const parent: TreeNode = node.parent;

        node.right = right.left;
        if (right.left) {
            (right.left.parent) = node;
        }
        right.left = node;
        node.parent = right;
        if (parent === null) {
            this.root = right;
            right.parent = null;
        } else {
            if (parent.left && parent.left === node) {
                parent.left = right;
            } else {
                parent.right = right;
            }
            right.parent = parent;
        }
    }

    public inOrderTraversal(){
        this._inOrderTraversal(this.root);
    }

    private _inOrderTraversal(node: TreeNode) {
        if (node === null) {
            return ;
        }
        this._inOrderTraversal(node.left);
        console.log(node.data);
        this._inOrderTraversal(node.right);
    }
  
    public levelOrderTraversal() {
        if (this.root === null) {
            return;
        }

        const queue: Array<TreeNode> = new Array();
        queue.push(this.root);
        while(queue.length) {
            let node = queue.shift();
            console.log(node.data);
            if (node.left) {
                queue.push(node.left);
            }
            if(node.right) {
                queue.push(node.right);
            } 
        }
    }
}

//测试
(() => {
    const rbTree: RedBlackTree = new RedBlackTree();
    const input =  [13,8,17,1,11,15,25,6,22,27];
    for(let i=0; i<input.length; i++) {
        rbTree.insert(input[i]);
    }
    console.log("中序遍历");
    rbTree.inOrderTraversal();
    console.log("层次遍历");
    rbTree.levelOrderTraversal();
    console.log("删除8");
    rbTree.remove(8);
    console.log("中序遍历");
    rbTree.inOrderTraversal();
    console.log("层次遍历");
    rbTree.levelOrderTraversal();
})()

