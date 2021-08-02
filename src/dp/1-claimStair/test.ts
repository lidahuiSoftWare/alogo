/**
 * 题目：
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢? 注意:给定 n 是一个正整数。
 */
import { solution , solution2, solution3, solution4 } from './index';

(() => {
    console.time("start");
    console.timeEnd("start");

    console.time("solution");
    solution(50);
    console.timeEnd("solution");

    console.time("solution2");
    solution2(50)
    console.timeEnd("solution2");

    console.time("solution3");
    solution3(50);
    console.timeEnd("solution3");

    console.time("solution4");
    solution4(50);
    console.timeEnd("solution4");

    /** 
    solution: 0.042ms
    solution2: 0.097ms
    solution3: 2:03.467 (m:ss.mmm)
    solution4: 0.173ms
    */
})();

