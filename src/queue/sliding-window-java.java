/**
 一.滑动窗口，适用于子串和子数组问题。
  其中滑动窗口分为 动态窗口 和 固定窗口。
 
 二. 动态滑动窗口技巧：
      1 维护一个窗口，r向右不断滑动
      2 在2.1 向右滑动的过程中，检测是否满足目标条件
      3 如果满足条件，l 开始向右滑动，刷除无用的元素，一直到条件不满足
      4 继续以往循环

 */ 
 
/**1: 最小覆盖子串
  * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
  * 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
  * https://leetcode-cn.com/problems/minimum-window-substring/
*/
import java.util.*;

class Solution {
    public String minWindow(String s, String t) { 
        if (s == null || t == null) {
            return "";
        }
        int l = 0; int r = 0; int start = 0; int end = 0; int match = 0; int minLen = Integer.MAX_VALUE; 
        HashMap<Character,Integer> win = new HashMap<Character,Integer>();
        HashMap<Character,Integer> needs = new HashMap<Character,Integer>();

        for (int i = 0; i < t.length(); i++) {
            char c = t.charAt(i);
            if (needs.containsKey(c)) {
                needs.put(c, needs.get(c) + 1);
            } else {
                needs.put(c, 1);
            }
        }

        while (r < s.length()) {
            char c = s.charAt(r);
            r++;
            if (needs.containsKey(c)) {
                if (win.containsKey(c)) {
                    win.put(c, win.get(c) + 1);
                } else {
                    win.put(c, 1);
                }
                if ((win.get(c) - needs.get(c)) == 0) {
                    match++;
                }
            }
        
            while (match == needs.size() && l < r) {
                if (minLen > (r - l)) {
                    minLen = r - l;
                    start = l;
                    end = r;
                }
                char d = s.charAt(l);
                l++;
                if (needs.containsKey(d)) {
                    if ((win.get(d) - needs.get(d)) == 0) {
                        match--;
                    }
                    win.put(d, win.get(d) - 1);
                }
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, end);
    }
}