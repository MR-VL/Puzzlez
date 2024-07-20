export interface PuzzleRequest {
  barcode: string;
  brand: string;
  description: string;
  id?: number;
  shareable?: boolean;
  title: string;
}
