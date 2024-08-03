import {Component, OnInit} from '@angular/core';
import {PuzzleService} from '../../../../services/services/puzzle.service';
import {PageResponseCompletedPuzzleResponse} from '../../../../services/models/page-response-completed-puzzle-response';
import {CompletedPuzzleResponse} from '../../../../services/models/completed-puzzle-response';
import {PuzzleResponse} from '../../../../services/models/puzzle-response';
import {FeedbackRequest} from '../../../../services/models/feedback-request';
import {FeedbackService} from '../../../../services/services/feedback.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-completed-puzzle-list',
  templateUrl: './completed-puzzle-list.component.html',
  styleUrls: ['./completed-puzzle-list.component.scss']
})
export class CompletedPuzzleListComponent implements OnInit {
  page = 0;
  size = 10;
  pages: any = [];
  completedPuzzles: PageResponseCompletedPuzzleResponse = {};
  selectedPuzzle: PuzzleResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = {puzzleId: 0, comment: '', note: 0};
  constructor(
    private puzzleService: PuzzleService,
    private feedbackService: FeedbackService,
    private router: Router
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
    this.page = this.completedPuzzles.totalPages as number - 1;
    this.findAllCompletedPuzzles();
  }

  goToNextPage() {
    this.page++;
    this.findAllCompletedPuzzles();
  }

  get isLastPage() {
    return this.page === this.completedPuzzles.totalPages as number - 1;
  }

  processCompletedPuzzle(puzzle: CompletedPuzzleResponse) {
    this.selectedPuzzle = puzzle;
    this.feedbackRequest.puzzleId = puzzle.id as number;
  }

  ratePuzzle(withFeedback: boolean) {
    if (withFeedback) {
      this.giveFeedback();
    }

    this.router.navigate(['/puzzles']);
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }
    });
  }
}
