export default class DoubleLinkNode {
     public val: number;
     public key: number;
     public next: DoubleLinkNode | null;
     public pre: DoubleLinkNode | null;

     constructor(val?: number, key?: number, next?: DoubleLinkNode | null, pre?: DoubleLinkNode | null) {
         this.val = (val === undefined ? 0 : val)
         this.key = (key === undefined ? 0 : key)
         this.next = (next === undefined ? null : next)
         this.pre = (pre === undefined ? null : pre)
     }
 }