import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { PageResponseFeedbackResponse } from '../../models/page-response-feedback-response';

export interface FindAllFeedbacksByPuzzle$Params {
  'puzzle-id': number;
  page?: number;
  size?: number;
}

export function findAllFeedbacksByPuzzle(http: HttpClient, rootUrl: string, params: FindAllFeedbacksByPuzzle$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFeedbackResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllFeedbacksByPuzzle.PATH, 'get');
  if (params) {
    rb.path('puzzle-id', params['puzzle-id'], {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseFeedbackResponse>;
    })
  );
}

findAllFeedbacksByPuzzle.PATH = '/feedbacks/puzzle/{puzzle-id}';
