import { PuzzleResponse } from './puzzle-response';
export interface PageResponsePuzzleResponse {
  content?: Array<PuzzleResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
