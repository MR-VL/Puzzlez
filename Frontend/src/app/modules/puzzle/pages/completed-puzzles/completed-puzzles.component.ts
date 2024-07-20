import {Component, OnInit} from '@angular/core';
import {PageResponseCompletedPuzzleResponse} from '../../../../services/models/page-response-completed-puzzle-response';
import {PuzzleService} from '../../../../services/services/puzzle.service';
import {CompletedPuzzleResponse} from '../../../../services/models/completed-puzzle-response';

@Component({
  selector: 'app-completed-puzzles',
  templateUrl: './completed-puzzles.component.html',
  styleUrls: ['./completed-puzzles.component.scss']
})
export class CompletedPuzzleComponent implements OnInit {

  page = 0;
  size = 5;
  pages: any = [];
  completedPuzzle: PageResponseCompletedPuzzleResponse = {};
  message = '';
  level: 'success' |'error' = 'success';
  constructor(
    private puzzleService: PuzzleService
  ) {
  }

  ngOnInit(): void {
    this.findAllCompletedPuzzles();
  }

  private findAllCompletedPuzzles() {
    this.puzzleService.findAllCompletedPuzzles({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.completedPuzzle = resp;
        this.pages = Array(this.completedPuzzle.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllCompletedPuzzles();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllCompletedPuzzles();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllCompletedPuzzles();
  }

  goToLastPage() {
    this.page = this.completedPuzzle.totalPages as number - 1;
    this.findAllCompletedPuzzles();
  }

  goToNextPage() {
    this.page++;
    this.findAllCompletedPuzzles();
  }

  get isLastPage() {
    return this.page === this.completedPuzzle.totalPages as number - 1;
  }

  approveCompletion(puzzle: CompletedPuzzleResponse) {
    if (!puzzle.completed) {
      return;
    }
    this.puzzleService.approveReturnCompletedPuzzle({
      'puzzle-id': puzzle.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Puzzle completion approved';
        this.findAllCompletedPuzzles();
      }
    });
  }
}
