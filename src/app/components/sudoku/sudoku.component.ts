import { Component, OnInit, HostListener } from "@angular/core";

export interface Cell {
  r: number;
  c: number;
  num: number;
  center: number[];
  corner: number[];
}

@Component({
  selector: "app-sudoku",
  templateUrl: "./sudoku.component.html",
  styleUrls: ["./sudoku.component.scss"],
})

export class SudokuComponent implements OnInit {

  sNum = 0;
  sudoku = [
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 3, 0, 2, 0, 6, 0, 0],
        [9, 0, 0, 3, 0, 5, 0, 0, 1],
        [0, 0, 1, 8, 0, 6, 4, 0, 0],
        [0, 0, 8, 1, 0, 2, 9, 0, 0],
        [7, 0, 0, 0, 0, 0, 0, 0, 8],
        [0, 0, 6, 7, 0, 8, 2, 0, 0],
        [0, 0, 2, 6, 0, 9, 5, 0, 0],
        [8, 0, 0, 2, 0, 3, 0, 0, 9],
        [0, 0, 5, 0, 1, 0, 3, 0, 0]
    ],
    [
        [0, 4, 0, 0, 8, 0, 0, 2, 0],
        [6, 0, 0, 0, 0, 4, 8, 0, 1],
        [0, 0, 0, 6, 0, 5, 4, 0, 0],
        [3, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 0, 0, 3, 4, 2],
        [0, 5, 0, 0, 6, 8, 0, 0, 0],
        [9, 0, 4, 2, 0, 0, 6, 0, 0],
        [0, 6, 0, 0, 0, 9, 7, 0, 4],
        [0, 0, 0, 0, 7, 6, 0, 0, 0]
    ],
    [
        [1, 0, 0, 4, 0, 0, 7, 0, 0],
        [0, 2, 0, 0, 5, 0, 0, 8, 0],
        [0, 0, 3, 0, 0, 6, 0, 0, 9],
        [0, 1, 0, 0, 4, 0, 0, 7, 0],
        [0, 0, 2, 0, 0, 5, 0, 0, 8],
        [9, 0, 0, 3, 0, 0, 6, 0, 0],
        [7, 0, 0, 0, 0, 8, 0, 0, 2],
        [8, 0, 0, 2, 0, 0, 9, 0, 0],
        [0, 9, 0, 0, 7, 0, 8, 1, 0]
    ]
];
description = ["custom", "easy", "medium", "hard", ];
  cells = [[]];
  selected: {
    r: number,
    c: number,
    num: number,
    center: number[],
    corner: number[]
  };
  ss = 9;
  ssMax = this.ss * this.ss;
  squareSize;
  myInnerHeight = window.innerHeight;

  mark = "normal";
  difficulty = "custom";

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if(this.selected){
      if(parseInt(event.key)){
        var key = parseInt(event.key);
              if (this.mark == "normal") {
                  if (this.selected.num == key) {
                      this.selected.num = 0;
                  } else {
                      this.selected.num = key;
                  }
              } else if (this.mark == "center") {
                  if (this.selected.center.length > 0) {
                      var newCenter = []
                      var double = false;
                      for (var j = 0; j < this.selected.center.length; j++) {
                          if (this.selected.center[j] != key) {
                              newCenter.push(this.selected.center[j]);
                          } else {
                              double = true;
                          }
                      }
                      if (!double) {
                          newCenter.push(key);
                      }
                      this.selected.center = newCenter;
                  } else {
                      this.selected.center.push(key);
                  }
              } else if (this.mark == "corner") {
                if (this.selected.corner.length > 0) {
                  var newcorner = []
                  var double = false;
                  for (var j = 0; j < this.selected.corner.length; j++) {
                      if (this.selected.corner[j] != key) {
                          newcorner.push(this.selected.corner[j]);
                      } else {
                          double = true;
                      }
                  }
                  if (!double) {
                      newcorner.push(key);
                  }
                  this.selected.corner = newcorner;
              } else {
                  this.selected.corner.push(key);
              }
      }
    } else if (event.code == "Space"){
      this.switchMark();
    } else if (event.code == "ArrowLeft") {
      this.selected =  this.cells[this.selected.r][this.selected.c-1];
    }else if (event.code == "ArrowRight") {
      this.selected =  this.cells[this.selected.r][this.selected.c+1];
    }else if (event.code == "ArrowUp") {
      this.selected =  this.cells[this.selected.r-1][this.selected.c];
    }else if (event.code == "ArrowDown") {
      this.selected =  this.cells[this.selected.r+1][this.selected.c-1];
    }else if (event.code == "Delete") {
      if(this.selected.num != 0){
        this.selected.num = 0;
      } else {
        this.selected.center = [];
        this.selected.corner = [];
    }
  }
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.getSquareSize()
  }



  ngOnInit() {
    this.getSquareSize();
    this.loadSudoku();
  }
  getSquareSize() {
    if(window.innerHeight > window.innerWidth) {
    this.squareSize = window.innerWidth / this.ss;
  } else {
  this.squareSize = window.innerHeight / this.ss;
}
}
  loadSudoku(){
      this.cells = [[]];
    var loadSudoku = this.sudoku[this.sNum];
    var r = 0;
    var c = 0;
    for (var i = 0; i < this.ssMax; i++) {
      if (i % this.ss === 0 && i !== 0) {
        this.cells.push([]);
        r++;
        c = 0;
      } else if (i !== 0) {
        c++;
      }
    const cell: Cell = {
       r: r,
       c: c,
       num: loadSudoku[r][c],
       corner: [],
       center: []
     };
     this.cells[r].push(cell);
    };
console.log(this.cells);
  }
  select(a,b) {
    // const index = a * this.ss + b;
    this.selected = this.cells[a][b];
  console.log(this.selected);
}
nextSudoku(){
  if(this.sNum+1 < this.sudoku.length) {
  this.sNum++;
} else {
  this.sNum = 0;
}
  this.loadSudoku();
  this.difficulty = this.description[this.sNum];
}
deSelect(){
  this.selected = undefined;
}
switchMark() {
  if (this.mark == "normal") {
      this.mark = "corner";
  } else if (this.mark == "corner") {
      this.mark = "center";
  } else {
      this.mark = "normal"
  }
}}
