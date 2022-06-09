export interface SongModel {
  title: string;
  year: number;
  artist: string;
}
export interface PlaylistModel {
  name: string;
  SongsList: SongModel[];
}
