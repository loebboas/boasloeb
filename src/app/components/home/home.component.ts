import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from "@angular/core";

import * as p5 from 'p5';
import { Router } from '@angular/router';

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
  r1 = 100;
  r2 = 100;
  r3 = 200;
  m1 = 70;
  m2 = 70;
  m3 = 70;
  a1 = 0;
  a2 = 0;
  a3 = 0;
  canv;
  routed = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const sketch = (s) => {

      s.preload = () => {
        // preload code
      }

      s.setup = () => {
        this.canv = s.createCanvas(window.innerWidth, window.innerHeight).parent('analog-clock-canvas');
      };


      s.draw = () => {
        var w = window.innerWidth/2;
        var h = window.innerHeight/2;
        s.resizeCanvas(window.innerWidth,window.innerHeight);

        s.background(230);
        s.stroke(0);
        s.strokeWeight(2);
        s.translate(w,h);
        var x1 = this.r1 * Math.sin(this.a1);
        var y1 = this.r1 * Math.cos(this.a1);
        var x2 = x1 + this.r2 * Math.sin(this.a2);
        var y2 = y1 + this.r2 * Math.cos(this.a2);
        var x3 = x2 + this.r2 * Math.sin(this.a3);
        var y3 = y2 + this.r2 * Math.cos(this.a3);
        s.fill(0);
        s.ellipse(0,0,this.m1,this.m1);
        s.line(0,0,x1,y1);
        s.fill(0);
        s.ellipse(x1,y1,this.m1,this.m1);


        s.line(x1,y1,x2,y2);
        s.fill(0);
        s.ellipse(x2,y2,this.m2,this.m2);
        s.line(x2,y2,x3,y3);
        s.fill(0);
        s.ellipse(x3,y3,this.m3,this.m3);
        s.textSize(16);
        s.fill(255);
        s.text('timeline', x1-26, y1+2);
        s.text('sudoku', x2-25, y2+2);

        if(this.mouseX > w+x1-50 && this.mouseX < w+x1 + 50 && this.mouseY > h+y1 - 50 && this.mouseY < h+y1 + 50){
          s.fill(0);
          s.ellipse(x1,y1,100,100);
          s.textSize(20);
          s.fill(255);
          s.text('timeline', x1-32, y1+5);
          s.stroke(255);
          if(this.routed && this.mouseXC > w+x1-50 && this.mouseXC < w+x1 + 50 && this.mouseYC > h+y1 - 50 && this.mouseYC < h+y1 + 50){
            this.routed = false;
            this.router.navigateByUrl('/timeline');
          }
        } else if(this.mouseX > w+x2-50 && this.mouseX < w+x2 + 50 && this.mouseY > h+y2 - 50 && this.mouseY < h+y2 + 50){
          s.fill(0);
          s.ellipse(x2,y2,100,100);
          s.textSize(20);
          s.fill(255);
          s.text('sudoku', x2-30, y2+5);
          s.stroke(255);
          if(this.routed && this.mouseXC > w+x2-50 && this.mouseXC < w+x2 + 50 && this.mouseYC > h+y2 - 50 && this.mouseYC < h+y2 + 50){
            this.router.navigateByUrl('/sudoku');
            this.routed = false;
          }
        }
        this.a1+=0.002;
        this.a2+=0.0031;
        this.a3+=0.0042;
      };
    }

    let canvas = new p5(sketch);
  }
}
