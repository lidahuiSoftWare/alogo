/** 构建最小堆 */
interface fType<T> {
    (a:T, b: T): boolean,
}

export default class Heap <T> {
    heap: Array<T>;
    compare: fType<T>;
    compareDefault = (a: any, b: any): boolean =>  {
        return a > b 
     }

    constructor (comparatorFunction ?: fType<T> | null) {
        this.heap = [];
        this.compare = comparatorFunction || this.compareDefault;
    }

    public getAllElements():Array<T> {
        return Array.from(this.heap);
    }

    public insert(val: T) {
        this.heap.push(val);
        this._shiftUp(this.heap.length - 1);
    }

    private _shiftUp(index:number) {
        if (index === 0) {
            return ;
        }
        const parent = (index - 1) >> 1;
        if (this.compare(this.heap[parent],this.heap[index])) {
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
        }
        this._shiftUp(parent);
    }

    public pop() {
        if (this.heap.length <= 0 ) {
            return ;
        }
        this.heap[0] = this.heap.pop();
        this._shiftDown(0);
    }

    public hasChild(index: number): boolean {
        return ((index << 1) + 1) < this.heap.length;
    }

    private _shiftDown(index: number) {
        const len = this.heap.length;
        if (this.hasChild(index) === false) {
            return ;
        }
        let ci = 2 * index + 1;
        if ((ci + 1) < len && this.compare(this.heap[ci], this.heap[ci + 1])) {
            ci++;
        }
        if (this.compare(this.heap[index], this.heap[ci])) {
            [this.heap[ci], this.heap[index]] = [this.heap[index], this.heap[ci]]
            this._shiftDown(ci);
        }
    }

    public peek(): T | null {
        if (this.heap.length) {
           return this.heap[0]
        } else {
            return null;
        }
    }

    public getSize(): number {
        return this.heap.length;
    }

}