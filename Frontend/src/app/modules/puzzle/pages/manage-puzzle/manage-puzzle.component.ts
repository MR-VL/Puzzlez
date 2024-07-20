import {Component, OnInit} from '@angular/core';
import {PuzzleRequest} from '../../../../services/models/puzzle-request';
import {ActivatedRoute, Router} from '@angular/router';
import {PuzzleService} from "../../../../services/services/puzzle.service";

@Component({
  selector: 'app-manage-puzzle',
  templateUrl: './manage-puzzle.component.html',
  styleUrls: ['./manage-puzzle.component.scss']
})
export class ManagePuzzleComponent implements OnInit {

  errorMsg: Array<string> = [];
  puzzleRequest: PuzzleRequest = {
    brand: '',
    barcode: '',
    description: '',
    title: ''
  };
  selectedPicture: any;

  constructor(
    private puzzleService: PuzzleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const puzzleId = this.activatedRoute.snapshot.params['puzzleId'];
    if (puzzleId) {
      this.puzzleService.findPuzzleById({
        'puzzle-id': puzzleId
      }).subscribe({
        next: (puzzle) => {
         this.puzzleRequest = {
           id: puzzle.id,
           title: puzzle.title as string,
           brand: puzzle.authorName as string,
           barcode: puzzle.barcode as string,
           description: puzzle.description as string,
           shareable: puzzle.shareable
         };
         this.selectedPicture='data:image/jpg;base64,' + puzzle.picture;
        }
      });
    }
  }

  savePuzzle() {
    this.puzzleService.savePuzzle({
      body: this.puzzleRequest
    }).subscribe({
      next: (puzzleId) => {
        this.puzzleService.uploadPuzzlePicture({
          'puzzle-id': puzzleId,
          body: {
            file: this.selectedPicture
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/puzzles/my-puzzles']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedPicture = event.target.files[0];
    console.log(this.selectedPicture);

    if (this.selectedPicture) {

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedPicture);
    }
  }
}
