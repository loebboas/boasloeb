import { Component, OnInit } from '@angular/core';

import { ARTICLES } from "../rechteinfach/articles"

@Component({
  selector: 'app-rechteinfach',
  templateUrl: './rechteinfach.component.html',
  styleUrls: ['./rechteinfach.component.scss']
})
export class RechteinfachComponent implements OnInit {
  articles = ARTICLES;
  constructor() { }

  ngOnInit(): void {
  }
}
