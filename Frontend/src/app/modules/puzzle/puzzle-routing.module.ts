import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {PuzzleListComponent} from './pages/puzzle-list/puzzle-list.component';
import {MyPuzzlesComponent} from './pages/my-puzzles/my-puzzles.component';
import {ManagePuzzleComponent} from './pages/manage-puzzle/manage-puzzle.component';
import {CompletedPuzzleListComponent} from './pages/completed-puzzle-list/completed-puzzle-list.component';
import {CompletedPuzzleComponent} from './pages/completed-puzzles/completed-puzzles.component';
import {authGuard} from '../../services/guard/auth.guard';
import {PuzzleDetailsComponent} from './pages/puzzle-details/puzzle-details.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: PuzzleListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-puzzles',
        component: MyPuzzlesComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-completed-puzzles',
        component: CompletedPuzzleListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-current-puzzles',
        component: CompletedPuzzleComponent,
        canActivate: [authGuard]
      },
      {
        path: 'details/:puzzleId',
        component: PuzzleDetailsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManagePuzzleComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:puzzleId',
        component: ManagePuzzleComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuzzleRoutingModule {
}
