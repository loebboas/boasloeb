import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { HomeComponent } from './components/home/home.component';
import { CasetreeComponent } from './components/casetree/casetree.component';
import { TalktomeComponent } from './components/talktome/talktome.component';
import { MandelbrotComponent } from './components/mandelbrot/mandelbrot.component';

const routes: Routes = [
  { path: 'sudoku', component: SudokuComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'mandelbrot', component: MandelbrotComponent },
  { path: 'projects', component: HomeComponent },
  { path: 'talktome', component: TalktomeComponent },
  { path: 'casetree', component: CasetreeComponent },
  { path: '**', component: TimelineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
