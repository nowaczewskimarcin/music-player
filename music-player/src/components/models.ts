export interface PlaylistModel {
  name: string;
  SongsList: SongModel[];
}
export interface SongModel {
  name: string;
  title: string;
  year: number;
  artist: string;
}
