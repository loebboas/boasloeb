import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from "@angular/core";

import * as p5 from 'p5';
import { Router } from '@angular/router';

export interface myNode {
  x: number;
  y: number;
  label: string;
  id: number;
  size: number;
  color: string;
  link?: string;
}
export interface Edge {
  from: number;
  to: number;
  color: string;
  id: number;
  line: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("canvas", { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private p5;

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
  }
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.canv.width = window.innerWidth;
    this.canv.height = window.innerHeight;
    // this.update();
  }
  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    console.log(this.mouseX);
  }
  @HostListener('click', ['$event'])
  onClick(event) {
    console.log(event)
    this.mouseXC = event.clientX;
    this.mouseYC = event.clientY;
    }

  mouseX;
  mouseY;
  mouseXC;
  mouseYC;
  canv;
  routed = true;
  nodes = [];
  edges = [];
  menu = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    const sketch = (s) => {

      s.preload = () => {
        // preload code
          const menu1: myNode = {
            x: 0.2*window.innerWidth,
            y: 0.2*window.innerHeight,
            label: 'Timeline',
            id: -1,
            size: 70,
            color: '#DF2935',
            link: '/timeline'
          }
          const menu2: myNode = {
            x: -0.2*window.innerWidth,
            y: -0.2*window.innerHeight,
            label: 'Sudoku',
            id: -1,
            size: 70,
            color: '#3F88C5',
            link: '/sudoku'
          }
          this.menu.push(menu1);
          this.menu.push(menu2);
          console.log(this.menu);

          for (var i=0; i < 100; i++) {
          function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
          }
          var rx = getRandomArbitrary(-0.99,0.9)*window.innerWidth/2*((i%8) + 2)/8;
          var ry =  getRandomArbitrary(-0.99,0.99)*window.innerHeight/2*((i%8) + 2)/8;
          const nNode: myNode = {
            x: rx,
            y: ry,
            label: 'none',
            id: i,
            size: 10,
            color: '#080708'
          }
          this.nodes.push(nNode);
        };
      }


      s.setup = () => {
        this.canv = s.createCanvas(window.innerWidth, window.innerHeight-5).parent('analog-clock-canvas');
      };


      s.draw = () => {
      s.clear();
        var w = window.innerWidth/2;
        var h = window.innerHeight/2;
        s.resizeCanvas(window.innerWidth,window.innerHeight-5);

        s.background('#E6E8E6');

        s.strokeWeight(2);
        s.translate(w,h);


        function checkLeft(mx,x){
          if(x -100 < mx && mx < x) {
            x = x + 3;
          }
          return x;
        }
        for (var i=0; i < this.nodes.length; i++) {
          var node = this.nodes[i];
          var x1 = node.x;
          var y1 = node.y;
          if (this.mouseX > w+node.x-50 && this.mouseX < w+node.x + 50 && this.mouseY > h+node.y - 50 && this.mouseY < h+node.y + 50){
            if (this.mouseX > w+node.x) {
                  x1= x1 - 5;
                } else {
                  x1 = x1 + 5;
                }
                this.nodes[i].x  = x1;
              if (this.mouseY > h+node.y) {
                y1= y1 - 5;
              } else {
                y1 = y1 + 5;
              }
              this.nodes[i].y  = y1;
            }
          s.stroke(node.color);
          s.fill(node.color);
          s.ellipse(x1,y1, node.size,node.size);
        };

        this.menu.forEach(m => {
           if(this.mouseX > w+m.x-50 && this.mouseX < w+m.x + 50 && this.mouseY > h+m.y - 50 && this.mouseY < h+m.y + 50){
            s.stroke(m.color);
            s.fill(m.color);
            s.ellipse(m.x,m.y, 100,100);
            s.stroke(m.color);
            s.fill('#E6E8E6');
            s.textAlign(s.CENTER, s.CENTER);
            s.textSize(24);
            s.text(m.label, m.x, m.y);
            if(this.routed && this.mouseXC > w+m.x-50 && this.mouseXC < w+m.x + 50 && this.mouseYC > h+m.y - 50 && this.mouseYC < h+m.y + 50){
              this.routed = false;
              this.router.navigateByUrl(m.link);
            }
          } else {
            s.stroke(m.color);
            s.fill(m.color);
            s.ellipse(m.x,m.y, m.size,m.size);
            s.stroke(m.color);
            s.fill('#E6E8E6');
            s.textAlign(s.CENTER, s.CENTER);
            s.textSize(18);
            s.text(m.label, m.x, m.y);
          }
          // } else if(this.mouseX > w+x2-50 && this.mouseX < w+x2 + 50 && this.mouseY > h+y2 - 50 && this.mouseY < h+y2 + 50){
          //   s.fill(0);
          //   s.ellipse(x2,y2,100,100);
          //   s.textSize(20);
          //   s.fill(255);
          //   s.text('sudoku', x2-30, y2+5);
          //   s.stroke(255);
          //   if(this.routed && this.mouseXC > w+x2-50 && this.mouseXC < w+x2 + 50 && this.mouseYC > h+y2 - 50 && this.mouseYC < h+y2 + 50){
          //     this.router.navigateByUrl('/sudoku');
          //     this.routed = false;
          //   }
          // }
          // this.a1+=0.002;
          // this.a2+=0.0031;
          // this.a3+=0.0042;
        });

          // if(this.mouseX && this.mouseY){
          //   m.x = checkLeft(this.mouseX, x1);
          //   this.nodes[i].x = x1;
          //   // this.nodes[i].x = x1 + 1;
          // }
        //  if (i + 3 < this.nodes.length ) {
        //   var n1 = this.nodes[i+1];
        //   // var n2 = this.nodes[i+2];
        //   // var n3 = this.nodes[i+3];
        //   if (s.dist(x1,x1,n1.x,n1.y) < 300){
        //     s.line(x1,m.y,n1.x,n1.y)

        //   }
        // }





// \       s.line(0,0,x1,m.y);
//         s.fill(0);
//         s.ellipse(x1,y1,this.m1,this.m1);


//         s.line(x1,y1,x2,y2);
//         s.fill(0);
//         s.ellipse(x2,y2,this.m2,this.m2);
//         s.line(x2,y2,x3,y3);
//         s.fill(0);
//         s.ellipse(x3,y3,this.m3,this.m3);
//         s.textSize(16);
//         s.fill(255);
//         s.text('timeline', x1-26, y1+2);
//         s.text('sudoku', x2-25, y2+2);


      };
    }

    let canvas = new p5(sketch);
  }
}
