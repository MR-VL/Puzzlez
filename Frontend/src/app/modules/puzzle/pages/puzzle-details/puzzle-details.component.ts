import {Component, OnInit} from '@angular/core';

import {PuzzleService} from '../../../../services/services/puzzle.service';
import {ActivatedRoute} from '@angular/router';
import {FeedbackService} from '../../../../services/services/feedback.service';
import {PageResponseFeedbackResponse} from '../../../../services/models/page-response-feedback-response';
import {PuzzleResponse} from "../../../../services/models/puzzle-response";

@Component({
  selector: 'app-puzzle-details',
  templateUrl: './puzzle-details.component.html',
  styleUrls: ['./puzzle-details.component.scss']
})
export class PuzzleDetailsComponent implements OnInit {
  puzzle: PuzzleResponse = {};
  feedbacks: PageResponseFeedbackResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  private puzzleId = 0;


  constructor(
    private puzzleService: PuzzleService,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.puzzleId = this.activatedRoute.snapshot.params['puzzleId'];
    if (this.puzzleId) {
      this.puzzleService.findPuzzleById({
        'puzzle-id': this.puzzleId
      }).subscribe({
        next: (puzzle: PuzzleResponse) => {
          this.puzzle = puzzle;
          this.findAllFeedbacks();
        }
      });
    }
  }

  private findAllFeedbacks() {
    this.feedbackService.findAllFeedbacksByPuzzle({
      'puzzle-id': this.puzzleId,
      page: this.page,
      size: this.size
    }).subscribe({
      next: (data) => {
        this.feedbacks = data;
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllFeedbacks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllFeedbacks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllFeedbacks();
  }

  goToLastPage() {
    this.page = this.feedbacks.totalPages as number - 1;
    this.findAllFeedbacks();
  }

  goToNextPage() {
    this.page++;
    this.findAllFeedbacks();
  }

  get isLastPage() {
    return this.page === this.feedbacks.totalPages as number - 1;
  }


}
