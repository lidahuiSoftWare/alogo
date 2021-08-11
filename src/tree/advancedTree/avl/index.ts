/**
 * 平衡二叉树，是一种特殊的二叉查找树
 * AVL 树是最早被发明的自平衡二叉树，，其每一个节点的左右子树的高度差不超过1。
 */
interface Node {
    data: number, 
    left: Node,
    right: Node,
    height: number,
}
export default class AVLTree {
    root: Node; // 根节点
    length: number; // 树中节点数量

    constructor(){
        this.root = null;
        this.length = 0;
    }
    
    public search(data: number): Node {
        return this._serach(this.root, data);
    }
    
    private _serach( node: Node, data: number): Node {
        while(node) {
            if (node.data === data) {
                return node;
            } else if (node.data < data ) {
                node = node.right;
            } else {
                node = node.left;
            }
        }
        return null;
    }

    public insert(data: number) {
        let newNode = {data, left: null, right: null, height: 0};
        this.root = this._insert(this.root, newNode);
        this.length++;
    }

    private _insert(node: Node, newNode: Node): Node {
        if (node === null) {
            node = newNode;
        } else {
            if (newNode.data < node.data) {
                node.left = this._insert(node.left, newNode);
                node = this._keepBlance(node);
            } else {
                node.right = this._insert(node.right, newNode);
                node = this._keepBlance(node)
            }
        }
        this._computeHeight(node);
        return node;
    }


    public delete(data: number) {
        if (this.search(data)) {
            this.root = this._delete(this.root, data);
            this.length--;
        }
    }

    private _delete(node: Node, data: number ): Node {
        if (node === null) {
            return null;
        }
                                       
        if (data < node.data) {
            node.left = this._delete(node.left, data);
        } else if (data > node.data){
            node.right = this._delete(node.right, data);
        } else {
            if (node.left !== null && node.right !== null) {
                let tmp = node.right;
                while(tmp.left !== null) {
                    tmp = tmp.left;
                }
                node.data = tmp.data;
                node.right = this._delete(node.right, tmp.data);
            } else {
                if (node.left === null && node.right === null ) {
                    node = null;
                } else {
                    if (node.left !== null) {
                        node = node.left;
                    } else if (node.right !== null) {
                        node = node.right;
                    }
                }
            }
        }
        this._computeHeight(node);
        return this._keepBlance(node);
    }
    
    public inOrderTraversal(){
      this._inOrderTraversal(this.root);
    }

    public levelOrderTraversal() {
        if (this.root === null) {
            return;
        }

        const queue: Array<Node> = new Array();
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

    public getHeight(): number {
        return this._getHeight(this.root);
    }

    public getAllNodes(): number {
        return this.length;
    }

    private _inOrderTraversal(node: Node) {
        if (node === null) {
            return ;
        }
        this._inOrderTraversal(node.left);
        console.log(node.data);
        this._inOrderTraversal(node.right);
    }

    private _keepBlance(node: Node): Node {
       if (node === null) {
           return node; 
       }

       const leftHeight = this._getHeight(node.left); // 左子树高度
       const rightHeight = this._getHeight(node.right); // 右子树高度
       const balance = leftHeight - rightHeight; // 平衡因子

       if (balance > 1) { // 树为L型
           if (this._getHeight(node.left.left) >= this._getHeight(node.left.right)) { // 树为LL
                node = this._leftLeftRotation(node);
           } else { // 树为LR
                node = this._leftRightRotation(node);
           }
       } else if (balance < -1) { // 树为R型
            if (this._getHeight(node.right.right) >= this._getHeight(node.right.left)) { // 树为RR型
                node = this._rightRightRotation(node);
            } else { // 树为RL 行为
                node = this._rightLeftRotation(node);
            }
       }
       return node
    }
    /** 右左局面旋转 */
    private _rightLeftRotation(node: Node): Node {
       node.right = this._leftLeftRotation(node.right)
       return this._rightRightRotation(node);
    }

    /** 右右局面旋转 */
    private _rightRightRotation(node: Node): Node {
        const rightChild = node.right;
        node.right =  rightChild.left;
        rightChild.left = node;
        this._computeHeight(node);
        this._computeHeight(rightChild);
        return rightChild;
    }

    /** 左右局面旋转 */
    private _leftRightRotation(node: Node): Node {
        node.left = this._rightRightRotation(node.left);
        return this._leftLeftRotation(node);
    }

    /** 左左局面旋转 */
    private _leftLeftRotation(node: Node): Node {
        const leftChild = node.left;   
        node.left = leftChild.right;
        leftChild.right = node;
        this._computeHeight(node);
        this._computeHeight(leftChild);
        return leftChild;
    }

    /** 获取高度 */
    private _getHeight(node: Node): number {
       if (node === null) {
            return 0;
       }

       return node.height;
    }

    /**更新高度 */
    private _computeHeight(node) {
        if (node) {
            node.height = Math.max(this._getHeight(node.left), this._getHeight(node.right)) + 1;
        }
    }
}

// 测试
(() => {
    const aVLTree:AVLTree = new AVLTree();
    const input: Array<number> = [9,3,7,2,4,6,5,1];

    for(let i = 0; i < input.length; i++ ) {
        aVLTree.insert(input[i]);
    }

    console.log("中序遍历");
    aVLTree.inOrderTraversal();
    console.log("层次遍历");
    aVLTree.levelOrderTraversal();
    console.log('AVL 数的高度', aVLTree.getHeight(), ' , AVL 节点总数为', aVLTree.getAllNodes());

    const deleteData = 3;
    aVLTree.delete(3);
    console.log("中序遍历");
    aVLTree.inOrderTraversal();
    console.log("层次遍历");
    aVLTree.levelOrderTraversal();
    console.log('AVL 数的高度', aVLTree.getHeight(), ' , AVL 节点总数为', aVLTree.getAllNodes());
    
})()