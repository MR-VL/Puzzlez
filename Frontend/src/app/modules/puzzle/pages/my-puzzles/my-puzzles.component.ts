import {Component, OnInit} from '@angular/core';
import {PageResponsePuzzleResponse} from '../../../../services/models/page-response-puzzle-response';
import {PuzzleService} from '../../../../services/services/puzzle.service';
import {PuzzleResponse} from '../../../../services/models/puzzle-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-puzzles',
  templateUrl: './my-puzzles.component.html',
  styleUrls: ['./my-puzzles.component.scss']
})
export class MyPuzzlesComponent implements OnInit {

  puzzleResponse: PageResponsePuzzleResponse = {};
  page = 0;
  size = 8;
  pages: any = [];

  constructor(
    private puzzleService: PuzzleService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllPuzzles();
  }

  private findAllPuzzles() {
    this.puzzleService.findAllPuzzlesByOwner({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (puzzles) => {
          this.puzzleResponse = puzzles;
          this.pages = Array(this.puzzleResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllPuzzles();
    this.scrollToTop();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllPuzzles();
    this.scrollToTop();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllPuzzles();
    this.scrollToTop();
  }

  goToLastPage() {
    this.page = this.puzzleResponse.totalPages as number - 1;
    this.findAllPuzzles();
    this.scrollToTop();
  }

  goToNextPage() {
    this.page++;
    this.findAllPuzzles();
    this.scrollToTop();
  }

  get isLastPage() {
    return this.page === this.puzzleResponse.totalPages as number - 1;
  }

  archivePuzzle(puzzle: PuzzleResponse) {
    this.puzzleService.updateArchivedStatus({
      'puzzle-id': puzzle.id as number
    }).subscribe({
      next: () => {
        puzzle.archived = !puzzle.archived;
      }
    });
  }

  sharePuzzle(puzzle: PuzzleResponse) {
    this.puzzleService.updateShareableStatus({
      'puzzle-id': puzzle.id as number
    }).subscribe({
      next: () => {
        puzzle.shareable = !puzzle.shareable;
      }
    });
  }

  editPuzzle(puzzle: PuzzleResponse) {
    this.router.navigate(['puzzles', 'manage', puzzle.id]);
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
