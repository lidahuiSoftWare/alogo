import DoubleLinkNode from './doubleLinkNode';

export default class DoubleLinkList {
     private dumyHead: DoubleLinkNode;
     private dumyTail: DoubleLinkNode;

     constructor() {
        this.dumyHead = new DoubleLinkNode(0,0);
        this.dumyTail = new DoubleLinkNode(0,0);
        this.dumyHead.next = this.dumyTail;
        this.dumyHead.pre = null;
        this.dumyTail.next = null;
        this.dumyTail.pre = this.dumyHead;
     }

     add(p: DoubleLinkNode): DoubleLinkNode {
        const next: DoubleLinkNode = this.dumyHead.next;
        p.next = next;
        p.pre = this.dumyHead;
        next.pre = p;
        this.dumyHead.next = p;
        return p;
     }

     moveToHead(p: DoubleLinkNode): DoubleLinkNode {
         if (p !== this.dumyHead && p!== this.dumyTail) {
            const next: DoubleLinkNode = p.next
            const prev: DoubleLinkNode = p.pre;
            next.pre = prev;
            prev.next = next;
            this.add(p);
         }
         return p;
     }

     remove(p: DoubleLinkNode): DoubleLinkNode {
        if (p && p != this.dumyHead && p!= this.dumyTail) {
            const next: DoubleLinkNode = p.next
            const prev: DoubleLinkNode = p.pre;
            next.pre = prev;
            prev.next = next;
            p.next = null;
            p.pre = null;
        }
        return p;
     }

     removeLast(): DoubleLinkNode {
         const p: DoubleLinkNode = this.dumyTail.pre;
         if (p && p != this.dumyHead) {
            this.remove(p);
         }
         return p;
     }
 }