import DoubleLinkNode from './dataStruct/doubleLinkNode';
import DoubleLinkList from './dataStruct/DoubleLinkList';

export default class LRUCache {
    private map: Map<number, DoubleLinkNode>;
    private list: DoubleLinkList;
    private capacity: number;
    private count: number;

    constructor(capacity: number) {
        this.count = 0;
        this.capacity = capacity;
        this.list = new DoubleLinkList();
        this.map = new Map<number, DoubleLinkNode>();
    }

    get(key: number): number {
        if (this.map.has(key)) {
            let node: DoubleLinkNode = this.map.get(key);
            this.list.moveToHead(node);
            return node.val;
        } else {
            return -1;
        }
    }

    put(key: number, val: number): void { 
        let node: DoubleLinkNode = null;
        if (this.map.has(key)) {
            node = this.map.get(key);
            node.val = val;
            this.list.moveToHead(node);
            return ;
        } 
        
        if (this.count >= this.capacity) {
            node = this.list.removeLast();
            this.map.delete(node.key);
            this.count--;
        } 
        node = new DoubleLinkNode(val,key);
        this.list.add(node);
        this.map.set(key,node);
        this.count++;
    }
}
