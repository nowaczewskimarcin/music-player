import { defineStore } from 'pinia';
import { PlaylistModel } from 'components/models';

export const usePlaylistsStore = defineStore('playlists', {
  state: () => ({
    currentPlaylist: {
      name: '',
      SongsList: [],
    },
    playlists: [
      {
        name: 'Good mood',
        SongsList: [],
      },
      {
        name: 'Queen',
        SongsList: [],
      },
      {
        name: 'Marcins music tralala',
        SongsList: [],
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
