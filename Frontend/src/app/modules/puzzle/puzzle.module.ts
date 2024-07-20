import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuzzleRoutingModule } from './puzzle-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { PuzzleListComponent } from './pages/puzzle-list/puzzle-list.component';
import { PuzzleCardComponent } from './components/puzzle-card/puzzle-card.component';
import { MyPuzzlesComponent } from './pages/my-puzzles/my-puzzles.component';
import { ManagePuzzleComponent } from './pages/manage-puzzle/manage-puzzle.component';
import {FormsModule} from '@angular/forms';
import { CompletedPuzzleListComponent } from './pages/completed-puzzle-list/completed-puzzle-list.component';
import { RatingComponent } from './components/rating/rating.component';
import { CompletedPuzzleComponent } from './pages/completed-puzzles/completed-puzzles.component';
import { PuzzleDetailsComponent } from './pages/puzzle-details/puzzle-details.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    PuzzleListComponent,
    PuzzleCardComponent,
    MyPuzzlesComponent,
    ManagePuzzleComponent,
    CompletedPuzzleListComponent,
    RatingComponent,
    CompletedPuzzleComponent,
    PuzzleDetailsComponent
  ],
  imports: [
    CommonModule,
    PuzzleRoutingModule,
    FormsModule
  ]
})
export class PuzzleModule { }
