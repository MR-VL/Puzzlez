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
  completedPuzzles: PageResponseCompletedPuzzleResponse = {};
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
    this.puzzleService.findAllReturnedPuzzles({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.completedPuzzles = resp;
        this.pages = Array(this.completedPuzzles.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllCompletedPuzzles();
    this.scrollToTop();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllCompletedPuzzles();
    this.scrollToTop();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllCompletedPuzzles();
    this.scrollToTop();
  }

  goToLastPage() {
    this.page = this.completedPuzzles.totalPages as number - 1;
    this.findAllCompletedPuzzles();
    this.scrollToTop();
  }

  goToNextPage() {
    this.page++;
    this.findAllCompletedPuzzles();
    this.scrollToTop();
  }

  get isLastPage() {
    return this.page === this.completedPuzzles.totalPages as number - 1;
  }

  approveCompletion(puzzle: CompletedPuzzleResponse) {
    if(!puzzle.completedApproved){
      this.level = 'error';
      this.message = 'The Puzzle is not yet completed by the user';
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
  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
