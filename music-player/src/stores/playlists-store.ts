import { defineStore } from 'pinia';
import { PlaylistModel, SongModel } from 'components/models';

export const usePlaylistsStore = defineStore('playlists', {
  state: () => ({
    currentPlaylist: {
      name: '',
      SongsList: [] as SongModel[],
    },
    playlists: [
      {
        name: 'Good mood',
        SongsList: [] as SongModel[],
      },
      {
        name: 'Queen',
        SongsList: [] as SongModel[],
      },
      {
        name: 'Marcins music tralala',
        SongsList: [] as SongModel[],
      },
    ],
  }),
  getters: {
    getCurrentPlaylist: (state) => state.currentPlaylist,
    getPlaylists: (state) => state.playlists,
  },
  actions: {
    setCurrentPlaylist(playlist: PlaylistModel) {
      this.currentPlaylist = playlist;
    },
    addNewPlaylist(playlist: PlaylistModel) {
      this.playlists.push(playlist);
    },
    deletePlaylist(index: number) {
      this.playlists = this.playlists.filter(
        (playlists: PlaylistModel, playlistIndex) => playlistIndex !== index
      );
    },
    editPlaylist(playlist: PlaylistModel, index: number) {
      console.log(playlist, index);
      this.playlists[index] = playlist;
    },
  },
});
