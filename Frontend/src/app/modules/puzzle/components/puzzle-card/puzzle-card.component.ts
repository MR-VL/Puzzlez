import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PuzzleResponse} from '../../../../services/models/puzzle-response';

@Component({
  selector: 'app-puzzle-card',
  templateUrl: './puzzle-card.component.html',
  styleUrls: ['./puzzle-card.component.scss']
})
export class PuzzleCardComponent {
  private _puzzle: PuzzleResponse = {};
  private _manage = false;


  get puzzlePicture(): string | undefined {
    if (this._puzzle.picture) {
      return 'data:image/jpg;base64,' + this._puzzle.picture
    }
    return 'favicon.ico';
  }

  get puzzle(): PuzzleResponse {
    return this._puzzle;
  }

  @Input()
  set puzzle(value: PuzzleResponse) {
    this._puzzle = value;
  }


  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  @Output() private share: EventEmitter<PuzzleResponse> = new EventEmitter<PuzzleResponse>();

  @Output() private archive: EventEmitter<PuzzleResponse> = new EventEmitter<PuzzleResponse>();
  @Output() private addToWaitingList: EventEmitter<PuzzleResponse> = new EventEmitter<PuzzleResponse>();
  @Output() private complete: EventEmitter<PuzzleResponse> = new EventEmitter<PuzzleResponse>();
  @Output() private edit: EventEmitter<PuzzleResponse> = new EventEmitter<PuzzleResponse>();
  @Output() private details: EventEmitter<PuzzleResponse> = new EventEmitter<PuzzleResponse>();

  onShare() {
    this.share.emit(this._puzzle);
  }

  onArchive() {
    this.archive.emit(this._puzzle);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._puzzle);
  }

  onComplete() {
    this.complete.emit(this._puzzle);
  }

  onEdit() {
    this.edit.emit(this._puzzle);
  }

  onShowDetails() {
    this.details.emit(this._puzzle);
  }
}
