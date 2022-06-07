import { defineStore } from 'pinia';
import { PlaylistModel } from 'components/models';

export const usePlaylistsStore = defineStore('playlists', {
  state: () => ({
    currentPlaylist: {
      name: '',
      songsCount: 0,
    },
    playlists: [
      {
        name: 'Good mood',
        songsCount: 37,
      },
      {
        name: 'Queen',
        songsCount: 13,
      },
      {
        name: 'Marcins music tralala',
        songsCount: 128,
      }
    ],
  }),
  getters: {
    getCurrentPlaylist: (state) => state.currentPlaylist,
    getPlaylists: (state) => state.playlists,
  },
  actions: {
    setCurrentPlaylist(playlist: PlaylistModel) {
      this.currentPlaylist = playlist
    },
    addPlaylist(playlist: PlaylistModel) {
      this.playlists.push(playlist)
    }
  },
});