import { Component, OnInit } from '@angular/core';


import { Observable, timer, observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

interface Event {
  name: string;
  text: string;
  color?: string;
  year: number;
  distance: string;
  duration: number;
  dur: string;
}


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

 counter$: Observable<number>;
  count = 1989;

  constructor() {
    this.counter$ = timer(0,1000).pipe(
      take(this.count),
      map(() => ++this.count)
    );
  }

  isOpen = true;
  year = 1989;
  place = ".com";
  title = "boas loeb"
  colorTop = "red";
  colorMid = "red";
  colorBot = "red";
  stopit = true;
  usertime = 0;

  timer = Observable.create((observer) => {
    observer.next(this.year);

    setInterval(() => {
      observer.next(this.year);
        if(this.year >= 2080){
          this.year = 1989;
        } else if (this.year >= 2012) {
          this.year++;
        } else if (this.year >= 1989 || this.year >= 2030) {
          this.year++;
        };
        this.usertime++;
    }, 1000);

    if(this.usertime > 20) {
      observer.complete();
    }
    })


  start() {
    this.count = 1989;
    this.stopit = true;
}

  checkYear(){
  if (this.count >= 2070) {
  this.stopit = false;
}
}

  ngOnInit() {
    this.timer.subscribe(
      data => {},
      error => console.log(error),
      () => console.log('Process Completed')
      )


    this.counter$.subscribe(count => {
      this.count = count;
      this.checkYear();
    }
      )
  }



  eventList: Event[] = [
    {  name: 'a happy childhood',
      text: '',
      year: 1989,
      duration: 2007,
      distance: '65%',
      dur: '18s'
    },
    {  name: 'learning martial arts',
        text: '',
        year: 1998,
        duration: 2014,
        distance: '59%',
        dur: '16s'
      },
      {  name: 'playing music',
          text: '',
          year: 1996,
          duration: 2017,
          distance: '23%',
          dur: '11s'
        },
        {  name: 'dancing the tango',
            text: '',
            year: 2007,
            duration: 2017,
            distance: '71%',
            dur: '10s'
          },
      {  name: 'studying  law',
          text: '',
          year: 2007,
          duration: 2012,
          distance: '14%',
          dur: '5s'
        },
        {
        name: 'family law',
        text: '',
        year: 2012,
        duration: 2018,
        distance: '47%',
        dur: '6s'
      },
      {  name: 'and philosophy',
          text: '',
          year: 2009,
          duration: 2030,
          distance: '37%',
          dur: '12s'
        },
        {  name: 'science and value',
            text: '',
            year: 2006,
            duration: 2038,
            distance: '24%',
            dur: '8s'
          },
          {  name: 'studying psychology',
              text: '',
              year: 2013,
              duration: 2041,
              distance: '61%',
              dur: '15s'
            },
            {  name: 'human-machine interaction',
                text: '',
                year: 2015,
                duration: 2040,
                distance: '9%',
                dur: '15s'
              },
            {  name: 'complex networks',
                text: '',
                year: 2017,
                duration: 2037,
                distance: '63%',
                dur: '20s'
              },
              {  name: 'building websites',
                  text: '',
                  year: 2005,
                  duration: 2032,
                  distance: '56%',
                  dur: '7s'
                },
                {  name: 'agile methods',
                    text: '',
                    year: 2017,
                    duration: 2045,
                    distance: '6%',
                    dur: '3s'
                  },
                  {  name: 'data science',
                      text: '',
                      year: 2011,
                      duration: 2033,
                      distance: '67%',
                      dur: '22s'
                    },
                  {  name: 'combining everything',
                      text: '',
                      year: 2019,
                      duration: 2030,
                      distance: '26%',
                      dur: '11s'
                    },
                    {  name: 'continuous learning',
                        text: '',
                        year: 2022,
                        duration: 2058,
                        distance: '31%',
                        dur: '18s'
                      },
                      {  name: 'enjoying life',
                          text: '',
                          year: 2030,
                          duration: 2069,
                          distance: '42%',
                          dur: '28s'
                        }
  ]


}

