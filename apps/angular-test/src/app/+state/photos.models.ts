/**
 * Interface for the 'Photos' data
 */
export interface PhotosEntity {
  id: string | number; // Primary ID
  title: string;
  url: string;
  thumbnailUrl: string;
}
