import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { TimelineComponent } from './components/timeline/timeline.component';

const routes: Routes = [
  { path: 'timeline', component: TimelineComponent },
  { path: 'sudoku', component: SudokuComponent },
  { path: '**', component: TimelineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
