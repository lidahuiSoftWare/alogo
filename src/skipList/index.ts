function isNotEmpty(v: any): boolean {
    return v!== undefined && v!== null
}

interface LinkedNode {
    // 承载的内容为数字
    data: number, 
    // 当前节点拥有的最高的索引
    maxLevel: number,   
    /**  
     * 是一个数组长度 <= MAX_LEVEL 大小的数组, next 数组值存放每一个level层下一个节点的索引 
     * 如果p表示当前节点，用level 表示这个节点所处整个跳表索引的级数，
     * 那么 p[level]表示在level这一层p节点的下一个节点
     * p[levle - n] 表示level级下面n级节点
    */
    nexts: LinkedNode [],
}

const MAX_LEVEL = 16; // 默认最大索引为16

export default class SkipList {
    head: LinkedNode; // 头结点，哨兵节点，不存储实际数据
    maxLevel: number; // 索引最大层级
    count: number; // 存在节点个数

    constructor() {
        const emptNode: LinkedNode[] = [];
        /** head 头节点：初始化每个层级索引都有 */
        for (let leverl =0; leverl < MAX_LEVEL; leverl++) {
            emptNode[leverl] = null as any;
        }
        this.head = { data: null as any, maxLevel: 0 , nexts: emptNode};
        this.count = 0;
        this.maxLevel = 1;
    }

    /** 随机层级  */
    private randomLevel(){
        let level = 1;

        for(let i = 1; i < MAX_LEVEL; i++) {
          if(Math.random() < 0.5) {
            level++;
          }
        }
        return level;
    } 

    /** 插入新节点 */
    public insert(value: number): boolean {
        // 获取随机索引层
        const newLevel = this.randomLevel();
        // 新节点
        const newNode: LinkedNode = {data: value, maxLevel: newLevel, nexts: []};
        //每一层待更新节点
        const updatedNode: LinkedNode[] = [];
       
        // 从生成的索引层开始查找
        let ele = this.head;
        for(let levle = newLevel - 1; levle >= 0; levle--) {
            while (isNotEmpty(ele.nexts[levle]) && ele.nexts[levle].data < value) {
                ele = ele.nexts[levle];
            }
            //跳转到下一个层级之前，记录当前层需要更新的节点
            updatedNode[levle] = ele;
        }
        // 如果跳表已经存在value，则不插入
        if (isNotEmpty(ele.nexts[0]) && ele.nexts[0].data === value) {
            return false;
        }
        // 每层插入新的值
        for ( let i = 0; i < newLevel; i++) {
            newNode.nexts[i] = updatedNode[i].nexts[i];
            updatedNode[i].nexts[i] = newNode;
        }
        // 更新maxLevel
        if (newLevel > this.maxLevel) {
            this.maxLevel = newLevel;
        }
        // count 值加 1
        this.count++;
        return true;
    }

    /** 查找节点 */
    public find(value: number): LinkedNode {
        let ele = this.head;

        // 从顶层查找,当level -1 ，则表示跳转到了下一层的索引中
        for (let level = this.maxLevel -1 ; level >=0; level--) {
            while(isNotEmpty(ele.nexts[level]) && ele.nexts[level].data < value) {
                ele = ele.nexts[level]
            }
        }
        // 原始单列表表层判断
        if (isNotEmpty(ele.nexts[0] && ele.nexts[0].data === value)) {
            return ele.nexts[0];
        }

        return null as any; 
    }

    /** 删除节点  */
    public detele(value: number): boolean {
        let ele = this.head;
        const updateNode: LinkedNode[] = [];

        /** 寻找到待删除的元素的前一个元素 */
        for(let level = this.maxLevel -1; level >=0; level--) {
            while(isNotEmpty(ele.nexts[level]) && ele.nexts[level].data < value) {
                ele = ele.nexts[level]
            }
            updateNode[level] = ele;
        }
        /** 删除元素 */
        if (isNotEmpty(ele.nexts[0]) && ele.nexts[0].data === value) { //如果找到了，则开始删除
            let level = ele.nexts[0].maxLevel;
            while(level--) {
                ele.nexts[level] = ele.nexts[level].nexts[level];
            }
            this.count--;
            return true;
        } else {
            // 没有找到返回 false
            return false;
        }
    }

    /** 打印 */
    public print() {
        let msg = '';

        const padLine = (len: number) => {
            let line = '';
            for (let i =0; i < len; i++) {
                line += '--';
            }
            return line + '->'
        }
        for (let i= 0; i < this.maxLevel; i++) {
            let ele = this.head;
            msg +=  'head';
            while(isNotEmpty(ele.nexts[i])) {
                msg += padLine(i) +  '  ' + ele.nexts[i].data;
                ele = ele.nexts[i];
            }
            msg += padLine(i) + ' ' + ' null \n'
        }
        console.log(msg);
    }
}

// 测试
(() => {
    let skipList: SkipList = new SkipList();

    for(let i =0; i< 20; i++) {
        let value  = Math.floor(Math.random() * 100);
        skipList.insert(value);
    }
    skipList.print();
})()