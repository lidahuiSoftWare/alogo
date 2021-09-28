/** 1.打印回型指针 */
function printMatrix(matrix: number[][]) {
    let res: number [] = [];
    let row = matrix.length;
    let col= matrix[0].length;
    let index = 0;
    let all = row * col;
    let curr = 0;

    while(true) {
        //上边
        for (let i = index; i < col - index; i++) {
            res[curr++] = matrix[index][i];
            all--;
        }
        
        // 右边
        for (let i = index + 1; i < row - index; i++) {
            res[curr++] = matrix[i][col - index - 1];
            all--;
        }

        // 下边
        for (let i = col - index - 2; i >= index; i--) {
            res[curr++] = matrix[row - index - 1 ][i];
            all--;
        }

        //左边 
        for (let i = row - index - 2; i > index; i--) {
            res[curr++] = matrix[i][index];
            all--;
        }

        if (all === 0) return res;
        index++;
    }
}
/** 
    const testArray = [[1, 2, 3 , 4],[5, 6, 7,  8], [9, 10, 11,  12], [13, 14,15 , 16]];
    const res = printMatrix(testArray);
    console.log(res);
*/

function arrayToTree(items) {
    const result = [];   // 存放结果集
    const itemMap = {};  // map 结构
    for (const item of items) {
      const id = item.id;
      const pid = item.pid;
  
      if (!itemMap[id]) {
        itemMap[id] = {
          children: [],
        }
      }
  
      itemMap[id] = {
        ...item,
        children: itemMap[id]['children']
      }
  
      const treeItem =  itemMap[id];
  
      if (pid === 0) {
        result.push(treeItem);
      } else {
        if (!itemMap[pid]) {
          itemMap[pid] = {
            children: [],
          }
        }
        itemMap[pid].children.push(treeItem)
      }
    }
    return result;
}
/** 
    let arr = [
        {id: 2, name: '部门2', pid: 1},
        {id: 3, name: '部门3', pid: 1},
        {id: 4, name: '部门4', pid: 3},
        {id: 5, name: '部门5', pid: 4},
        {id: 1, name: '部门1', pid: 0},
        {id: 8, name: '部门8', pid: 0},
    ];
    arrayToTree(arr);
*/
  