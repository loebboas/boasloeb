import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-talktome',
  templateUrl: './talktome.component.html',
  styleUrls: ['./talktome.component.scss']
})
export class TalktomeComponent implements OnInit {
  interaction = 0;
  writing = "";
  phrases = [];
  words = [];
  letters = [];
  lastPhrases = ["...", "...", "..."];
  showAnswer = true;
  counter$: Observable<number>;
  count = 1989;


  answer = "Hi there! Write something! :)"
  constructor() {
    this.counter$ = timer(0,3000).pipe(
      take(this.count),
      map(() => ++this.count)
    );
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    var key = event.key;
    if (event.keyCode < 91 && event.keyCode > 64 || key.match(/[!?:;.]/)) {
    this.writing = this.writing + key;
    } else if (event.code == "Space"){
    this.writing = this.writing + " ";
    } else if (event.code == "Backspace") {
      this.writing = this.writing.substring(0, this.writing.length - 1);
    }
    if ( key == "Enter") {
    this.phrases.unshift(this.writing);
    if (this.lastPhrases.length > 3){
    this.lastPhrases.pop();
    this.lastPhrases.unshift(this.writing);
  } else {
    this.lastPhrases.unshift(this.writing);
    }
    this.writing = " ";
    this.interaction++;
    this.getAnswer();
    }
  }

  ngOnInit(): void {
    this.counter$.subscribe(()=> {
      this.lastPhrases.pop();
      this.lastPhrases.unshift("...");
    })
  }


  getAnswer() {
    if (this.interaction == 1) {
     this.showAnswer = true;
    }
    if (this.interaction == 3) {
      this.showAnswer = true;
      this.answer = "Well, it is good to meet you!"

    } else if (this.interaction == 5){
      this.answer = "Please, tell me whatever you'd like to!"
    }
      // setTimeout(function () {
      //   this.showAnwer = false;
      // }, 1900);
    // }

  }
}

export class Sign {
  constructor(private value) {}
  time = Date.now();
}
