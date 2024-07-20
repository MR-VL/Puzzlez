import { CompletedPuzzleResponse } from './completed-puzzle-response';
export interface PageResponseCompletedPuzzleResponse {
  content?: Array<CompletedPuzzleResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
