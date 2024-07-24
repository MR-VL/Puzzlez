
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { approveReturnCompletedPuzzle } from '../fn/puzzle/approve-return-completed-puzzle';
import { ApproveReturnCompletedPuzzle$Params } from '../fn/puzzle/approve-return-completed-puzzle';
import { completePuzzle } from '../fn/puzzle/complete-puzzle';
import { CompletePuzzle$Params } from '../fn/puzzle/complete-puzzle';
import { findAllCompletedPuzzles } from '../fn/puzzle/find-all-completed-puzzles';
import { FindAllCompletedPuzzles$Params } from '../fn/puzzle/find-all-completed-puzzles';
import { findAllPuzzles } from '../fn/puzzle/find-all-puzzles';
import { FindAllPuzzles$Params } from '../fn/puzzle/find-all-puzzles';
import { findAllPuzzlesByOwner } from '../fn/puzzle/find-all-puzzles-by-owner';
import { FindAllPuzzlesByOwner$Params } from '../fn/puzzle/find-all-puzzles-by-owner';
import { findAllReturnedPuzzles } from '../fn/puzzle/find-all-returned-puzzles';
import { FindAllReturnedPuzzles$Params } from '../fn/puzzle/find-all-returned-puzzles';
import { findPuzzleById } from '../fn/puzzle/find-puzzle-by-id';
import { FindPuzzleById$Params } from '../fn/puzzle/find-puzzle-by-id';
import { PageResponseCompletedPuzzleResponse } from '../models/page-response-completed-puzzle-response';
import { PageResponsePuzzleResponse } from '../models/page-response-puzzle-response';
import { PuzzleResponse } from '../models/puzzle-response';
import { returnCompletedPuzzle } from '../fn/puzzle/return-completed-puzzle';
import { ReturnCompletedPuzzle$Params } from '../fn/puzzle/return-completed-puzzle';
import { savePuzzle } from '../fn/puzzle/save-puzzle';
import { SavePuzzle$Params } from '../fn/puzzle/save-puzzle';
import { updateArchivedStatus } from '../fn/puzzle/update-archived-status';
import { UpdateArchivedStatus$Params } from '../fn/puzzle/update-archived-status';
import { updateShareableStatus } from '../fn/puzzle/update-shareable-status';
import { UpdateShareableStatus$Params } from '../fn/puzzle/update-shareable-status';
import { uploadPuzzlePicture } from '../fn/puzzle/upload-puzzle-picture';
import { UploadPuzzlePicture$Params } from '../fn/puzzle/upload-puzzle-picture';

@Injectable({ providedIn: 'root' })
export class PuzzleService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllPuzzles()` */
  static readonly FindAllPuzzlesPath = '/puzzles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPuzzles()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPuzzles$Response(params?: FindAllPuzzles$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePuzzleResponse>> {
    return findAllPuzzles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllPuzzles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPuzzles(params?: FindAllPuzzles$Params, context?: HttpContext): Observable<PageResponsePuzzleResponse> {
    return this.findAllPuzzles$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponsePuzzleResponse>): PageResponsePuzzleResponse => r.body)
    );
  }

  /** Path part for operation `savePuzzle()` */
  static readonly SavePuzzlePath = '/puzzles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePuzzle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePuzzle$Response(params: SavePuzzle$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return savePuzzle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `savePuzzle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  savePuzzle(params: SavePuzzle$Params, context?: HttpContext): Observable<number> {
    return this.savePuzzle$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadPuzzlePicture()` */
  static readonly UploadPuzzlePicturePath = '/puzzles/picture/{puzzle-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadPuzzlePicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadPuzzlePicture$Response(params: UploadPuzzlePicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadPuzzlePicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadPuzzlePicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadPuzzlePicture(params: {
    "puzzle-id": number;
    body: { file: string | any }
  }, context?: HttpContext): Observable<{}> {
    return this.uploadPuzzlePicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `completePuzzle()` */
  static readonly CompletePuzzlePath = '/puzzles/complete/{puzzle-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completePuzzle()` instead.
   *
   * This method doesn't expect any request body.
   */
  completePuzzle$Response(params: CompletePuzzle$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return completePuzzle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completePuzzle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  completePuzzle(params: CompletePuzzle$Params, context?: HttpContext): Observable<number> {
    return this.completePuzzle$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateShareableStatus()` */
  static readonly UpdateShareableStatusPath = '/puzzles/shareable/{puzzle-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateShareableStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus$Response(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateShareableStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateShareableStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateShareableStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `returnCompletedPuzzle()` */
  static readonly ReturnCompletedPuzzlePath = '/puzzles/complete/return/{puzzle-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `returnCompletedPuzzle()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnCompletedPuzzle$Response(params: ReturnCompletedPuzzle$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return returnCompletedPuzzle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `returnCompletedPuzzle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnCompletedPuzzle(params: ReturnCompletedPuzzle$Params, context?: HttpContext): Observable<number> {
    return this.returnCompletedPuzzle$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `approveReturnCompletedPuzzle()` */
  static readonly ApproveReturnCompletedPuzzlePath = '/puzzles/complete/return/approve/{puzzle-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveReturnCompletedPuzzle()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnCompletedPuzzle$Response(params: ApproveReturnCompletedPuzzle$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return approveReturnCompletedPuzzle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `approveReturnCompletedPuzzle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnCompletedPuzzle(params: ApproveReturnCompletedPuzzle$Params, context?: HttpContext): Observable<number> {
    return this.approveReturnCompletedPuzzle$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateArchivedStatus()` */
  static readonly UpdateArchivedStatusPath = '/puzzles/archived/{puzzle-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArchivedStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus$Response(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateArchivedStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArchivedStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateArchivedStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findPuzzleById()` */
  static readonly FindPuzzleByIdPath = '/puzzles/{puzzle-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPuzzleById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPuzzleById$Response(params: FindPuzzleById$Params, context?: HttpContext): Observable<StrictHttpResponse<PuzzleResponse>> {
    return findPuzzleById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPuzzleById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPuzzleById(params: FindPuzzleById$Params, context?: HttpContext): Observable<PuzzleResponse> {
    return this.findPuzzleById$Response(params, context).pipe(
      map((r: StrictHttpResponse<PuzzleResponse>): PuzzleResponse => r.body)
    );
  }

  /** Path part for operation `findAllReturnedPuzzles()` */
  static readonly FindAllReturnedPuzzlesPath = '/puzzles/returned';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllReturnedPuzzles()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedPuzzles$Response(params?: FindAllReturnedPuzzles$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCompletedPuzzleResponse>> {
    return findAllReturnedPuzzles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllReturnedPuzzles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedPuzzles(params?: FindAllReturnedPuzzles$Params, context?: HttpContext): Observable<PageResponseCompletedPuzzleResponse> {
    return this.findAllReturnedPuzzles$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCompletedPuzzleResponse>): PageResponseCompletedPuzzleResponse => r.body)
    );
  }

  /** Path part for operation `findAllPuzzlesByOwner()` */
  static readonly FindAllPuzzlesByOwnerPath = '/puzzles/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllPuzzlesByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPuzzlesByOwner$Response(params?: FindAllPuzzlesByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePuzzleResponse>> {
    return findAllPuzzlesByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllPuzzlesByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllPuzzlesByOwner(params?: FindAllPuzzlesByOwner$Params, context?: HttpContext): Observable<PageResponsePuzzleResponse> {
    return this.findAllPuzzlesByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponsePuzzleResponse>): PageResponsePuzzleResponse => r.body)
    );
  }

  /** Path part for operation `findAllCompletedPuzzles()` */
  static readonly FindAllCompletedPuzzlesPath = '/puzzles/completed';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCompletedPuzzles()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCompletedPuzzles$Response(params?: FindAllCompletedPuzzles$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCompletedPuzzleResponse>> {
    return findAllCompletedPuzzles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCompletedPuzzles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCompletedPuzzles(params?: FindAllCompletedPuzzles$Params, context?: HttpContext): Observable<PageResponseCompletedPuzzleResponse> {
    return this.findAllCompletedPuzzles$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCompletedPuzzleResponse>): PageResponseCompletedPuzzleResponse => r.body)
    );
  }




}
