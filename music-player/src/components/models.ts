export interface PlaylistModel {
  id: number | null;
  name: string;
  SongsList: SongModel[];
}
export interface SongModel {
  name: string;
  title: string;
  year: number;
  artist: string;
}
