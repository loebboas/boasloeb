import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from "@angular/core";

@Component({
  selector: "app-casetree",
  templateUrl: "./casetree.component.html",
  styleUrls: ["./casetree.component.scss"],
})
export class CasetreeComponent implements OnInit {
  @ViewChild("canvas", { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  //letters, words and phrases starting position
  lxpos = window.innerHeight / 2;
  lypos = window.innerWidth / 2;

  wxpos = window.innerHeight / 2;
  wypos = window.innerWidth / 2 + 40;

  pxpos = window.innerHeight / 2;
  pypos = window.innerWidth / 2 + 80;

  phrase = false;
  phrases = [];
  word = false;
  words = [];
  letters = [];
  private ctx: CanvasRenderingContext2D;

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    var key = event.key;
    if (event.code == "Space") {
      console.log("spacebar");
      //means new word, add letters to word, delete letters
      var newValue = "";
      for (var i = 0; i < this.letters.length; i++) {
        newValue = newValue + this.letters[i].value;
      }
      console.log(newValue);
      var newWord = new Sign(this.wxpos, this.wypos, newValue);
      this.words.push(newWord);
      console.log(newWord);
      console.log(this.words);
      this.letters = [];
    } else {
      this.lxpos = this.lxpos + 20;
      var x = this.lxpos;
      var y = this.lypos;
      const letter = new Sign(x, y, key);
      this.letters.push(letter);
      if (!this.word) {
        this.word = true;
      }
      console.log(this.letters);
      // console.log(this.words);
    }
    this.draw();
  }
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.animate();
  }

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.draw();
    this.animate();

    // this.ctx.fillStyle = 'red';
    // this.ctx.fillRect(0, 0, 15, 15);
    // this.ctx.strokeRect(10, 20, 10, 10);
  }

  draw() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas

    // this.ctx.font = "30px Arial";
    // this.ctx.fillText("hello world", this.lxpos, this.lypos);
    // this.ctx.stroke();
    if (this.letters) {
      if (this.letters.length > 0) {
        this.letters.forEach((letter) => {
          var nkey = letter.value;
          this.ctx.font = "30px Arial";
          this.ctx.fillText(nkey, letter.X, letter.Y);
          console.log(letter);
          // this.nodes++;
          // this.ctx.lineWidth = 1;
          // this.ctx.strokeStyle = '#000000';
          this.ctx.stroke();
          // this.ctx.beginPath();
          // this.ctx.arc(this.X, this.Y, this.R, 0, 2 * Math.PI, false);
        });
      }
    }
    if (this.words) {
      if (this.words.length > 0) {
        this.words.forEach((word) => {
          var nkey = word.value;
          this.ctx.font = "30px Arial";
          this.ctx.fillText(nkey, word.X, word.Y);
          console.log(word);
        });
      }
    }
  }

  animate() {
    this.ctx.fillStyle = "red";
    const node = new Node(this.ctx);
    const edge = new Edge(this.ctx);
    node.drawCircle();
    edge.drawLine();
    console.log(this.ctx);
    console.log(this);
  }
}

export class Sign {
  constructor(private X, private Y, private value) {}
  nodes = 0;
  R = 20;
  time = Date.now();
  // words: Sign[];
  // phrases: Sign[];
  // Event: Sign[]

  // drawSign(key) {
  //   var xpos = this.X;
  //   var ypos = this.Y

  // this.X = this.X * 0.9;
  // this.Y = this.Y * 0.9;
  // this.R = this.R * 0.9;
  // var nkey: string = key;
  // this.ctx.font = "30px Arial";
  // this.ctx.fillText(nkey, this.X, this.Y);
  // this.nodes++;
  // this.ctx.beginPath();
  // this.ctx.arc(this.X, this.Y, this.R, 0, 2 * Math.PI, false);
  // this.ctx.lineWidth = 1;
  // this.ctx.strokeStyle = '#000000';
  // this.ctx.stroke();
  // if (this.nodes < 100) {
  //   this.drawSign(key);
  // }
  // }
}

export class Node {
  constructor(private ctx: CanvasRenderingContext2D) {}
  nodes = 0;
  X = this.ctx.canvas.width;
  Y = this.ctx.canvas.height;
  R = 45;

  drawCircle() {
    this.X = this.X * 0.9;
    this.Y = this.Y * 0.9;
    this.R = this.R * 0.9;
    this.nodes++;
    this.ctx.beginPath();
    this.ctx.arc(this.X, this.Y, this.R, 0, 2 * Math.PI, false);
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#FF0000";
    this.ctx.stroke();
    if (this.nodes < 100) {
      this.drawCircle();
    }
  }
}

export class Edge {
  constructor(private ctx: CanvasRenderingContext2D) {}
  edges = 0;
  X = this.ctx.canvas.width;
  Y = this.ctx.canvas.height;
  R = 45;

  drawLine() {
    this.X = this.X * 0.9;
    this.Y = this.Y * 0.9;
    this.R = this.R * 0.9;
    this.edges++;
    if (this.edges % 2 == 0) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.X, this.Y);
      this.ctx.lineTo(this.X / 0.9, this.Y / 0.9);
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "#FF0000";
      this.ctx.stroke();
    }
    if (this.edges < 50) {
      this.drawLine();
    }
  }
}
