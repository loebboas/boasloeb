import { Injectable } from '@angular/core';
import { Cell } from '../components/sudoku/sudoku.component';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor() { }
  created = 0;
  cells = [[]];
  ssMax;
  ss;

  createSudoku(size, difficulty) {
    this.cells = [[]];
    var numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1]
    var r = 0;
    var c = 0;
    this.ssMax = size * size;
    this.ss = size;
    for (var i = 0; i < this.ssMax; i++) {
      if (i % size === 0 && i !== 0) {
        this.cells.push([]);
        r++;
        c = 0;
      } else if (i !== 0) {
        c++;
      }
      var n = 0;
      if(c == r) {
        n = numbers.pop();
      }
    const cell: Cell = {
       r: r,
       c: c,
       num: n,
       center: [],
       corner: [],
       original: true
     };
     this.cells[r].push(cell);
    }
      this.solveGrid(this.cells);
      this.makeHarder(this.cells);
      console.log(this.cells);
      return this.cells;
  }

  makeHarder(sudoku) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          var rand = Math.random()*10;
          if(rand > 8){
            sudoku[i][j].num = 0;
            sudoku[i][j].original = false;
            // if (this.makeHarder(sudoku)) {
            //    return true;
            // } else {
            //   return false
            // }
          }
          // return false;
        }
        console.log(sudoku);
        // return true;
    }
    // return true;

  }
  solveGrid(sudoku) {
    var _board = sudoku;
    var result = sodokoSolver(_board)

  //credit to: https://stackoverflow.com/questions/42736648/sudoku-solver-in-js
  function isValid(board, row, col, k) {
      for (let i = 0; i < 9; i++) {
          const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
          const n = 3 * Math.floor(col / 3) + i % 3;
          if (board[row][i].num == k || board[i][col].num == k || board[m][n].num == k) {
            return false;
          }
      }
      return true;
  }

      function sodokoSolver(data) {
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (data[i][j].num == 0) {
              for (let k = 1; k <= 9; k++) {
                if (isValid(data, i, j, k)) {
                  data[i][j].num = k;
                if (sodokoSolver(data)) {
                 return true;
                } else {
                 data[i][j].num = 0;
                }
              }
            }
            return false;
          }
        }
      }
      return true;
     }
     return true;
    }

}
