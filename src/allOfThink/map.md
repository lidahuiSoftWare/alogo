### 一 map 使用总结
* 使用map 可以建立 key 和 value的映射关系

### 二 典型应用
#### 2.1 建立数组的值 与 所在索引的映射
* 建立 value 和 所在数组索引 index 建立 map，可以由value ，通过 map 可以获取其所在的value 对应的index
* 该典型应用于
  * 2数之和
  * 还原树 
    * https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/


#### 2.2 建立数组的值 与 数组中存在同样值总数的映射
* 建立该映射后，可以快速统计到元素是否存在，以及存在的总数
* 该典型用于
  *  最小字符串，
  *  最长不重复子串等问题，可以与滑动窗口一起应用
  
