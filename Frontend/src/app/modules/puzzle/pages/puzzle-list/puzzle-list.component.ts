import {Component, OnInit} from '@angular/core';
import {PuzzleService} from '../../../../services/services/puzzle.service';
import {PageResponsePuzzleResponse} from '../../../../services/models/page-response-puzzle-response';
import {PuzzleResponse} from '../../../../services/models/puzzle-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss']
})
export class PuzzleListComponent implements OnInit {
  puzzleResponse: PageResponsePuzzleResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';

  constructor(
    private puzzleService: PuzzleService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllPuzzles();
  }

  private findAllPuzzles() {
    this.puzzleService.findAllPuzzles({
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
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllPuzzles();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllPuzzles();
  }

  goToLastPage() {
    this.page = this.puzzleResponse.totalPages as number - 1;
    this.findAllPuzzles();
  }

  goToNextPage() {
    this.page++;
    this.findAllPuzzles();
  }

  get isLastPage() {
    return this.page === this.puzzleResponse.totalPages as number - 1;
  }

  completePuzzle(puzzle: PuzzleResponse) {
    this.message = '';
    this.level = 'success';
    this.puzzleService.completePuzzle({
      'puzzle-id': puzzle.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Puzzle successfully added to your completed list';
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.error;
      }
    });
  }

  displayPuzzleDetails(puzzle: PuzzleResponse) {
    this.router.navigate(['puzzles', 'details', puzzle.id]);
  }
}
