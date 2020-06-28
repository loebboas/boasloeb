import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { HomeComponent } from './components/home/home.component';
import { CasetreeComponent } from './components/casetree/casetree.component';
import { TalktomeComponent } from './components/talktome/talktome.component';
import { RechteinfachComponent } from './components/rechteinfach/rechteinfach.component';
import { LinearComponent } from './components/linear/linear.component';

const routes: Routes = [
  { path: 'sudoku', component: SudokuComponent },
  { path: 'linear', component: LinearComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'rechteinfach', component: RechteinfachComponent },
  { path: 'projects', component: HomeComponent },
  { path: 'talktome', component: TalktomeComponent },
  { path: 'casetree', component: CasetreeComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
