export interface PuzzleResponse {
  archived?: boolean;
  authorName?: string;
  barcode?: string;
  description?: string;
  id?: number;
  owner?: string;
  picture?: Array<string>;
  rate?: number;
  shareable?: boolean;
  title?: string;
}
