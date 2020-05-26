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
  place = "more";
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
    {  name: 'being a child',
      text: '',
      year: 1989,
      duration: 2007,
      distance: '45%',
      dur: '18s'
    },
    {  name: 'learning martial arts',
        text: '',
        year: 1998,
        duration: 2014,
        distance: '59%',
        dur: '16s'
      },
      {  name: 'playing with music',
          text: '',
          year: 1996,
          duration: 2007,
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
      {  name: 'studying law',
          text: '',
          year: 2007,
          duration: 2012,
          distance: '14%',
          dur: '5s'
        },
      {  name: 'asking fundamental questions',
          text: '',
          year: 2009,
          duration: 2030,
          distance: '37%',
          dur: '12s'
        },
        {  name: 'trying to do the right thing',
            text: '',
            year: 2006,
            duration: 2038,
            distance: '24%',
            dur: '8s'
          },
          {  name: 'following my intuition',
              text: '',
              year: 2013,
              duration: 2041,
              distance: '61%',
              dur: '15s'
            },
            {  name: 'seeing things from multiple perspectives',
                text: '',
                year: 2015,
                duration: 2040,
                distance: '9%',
                dur: '15s'
              },
            {  name: 'understanding complex systems',
                text: '',
                year: 2017,
                duration: 2037,
                distance: '63%',
                dur: '20s'
              },
              {  name: 'building websites',
                  text: '',
                  year: 2005,
                  duration: 2012,
                  distance: '56%',
                  dur: '7s'
                },
                {  name: 'becoming agile',
                    text: '',
                    year: 2017,
                    duration: 2045,
                    distance: '6%',
                    dur: '3s'
                  },
                  {  name: 'experimenting and developing',
                      text: '',
                      year: 2011,
                      duration: 2033,
                      distance: '67%',
                      dur: '22s'
                    },
                  {  name: 'legaltech and a new world',
                      text: '',
                      year: 2019,
                      duration: 2030,
                      distance: '26%',
                      dur: '11s'
                    },
                    {  name: 'always learning',
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

