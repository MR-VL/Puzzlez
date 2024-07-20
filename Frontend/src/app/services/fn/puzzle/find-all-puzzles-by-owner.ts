import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponsePuzzleResponse } from '../../models/page-response-puzzle-response';

export interface FindAllPuzzlesByOwner$Params {
  page?: number;
  size?: number;
}

export function findAllPuzzlesByOwner(http: HttpClient, rootUrl: string, params?: FindAllPuzzlesByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponsePuzzleResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllPuzzlesByOwner.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponsePuzzleResponse>;
    })
  );
}

findAllPuzzlesByOwner.PATH = '/puzzles/owner';
