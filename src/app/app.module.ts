import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { HomeComponent } from './components/home/home.component';
import { CasetreeComponent } from './components/casetree/casetree.component';
import { TalktomeComponent } from './components/talktome/talktome.component';
import { RechteinfachComponent } from './components/rechteinfach/rechteinfach.component';
import { LinearComponent } from './components/linear/linear.component';

@NgModule({
  declarations: [
    AppComponent,
    SudokuComponent,
    TimelineComponent,
    HomeComponent,
    CasetreeComponent,
    TalktomeComponent,
    RechteinfachComponent,
    LinearComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
