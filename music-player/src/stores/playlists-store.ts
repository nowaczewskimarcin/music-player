import { defineStore } from 'pinia';

export const usePlaylistsStore = defineStore('playlists', {
  state: () => ({
    currentPlaylist: '',
  }),
  getters: {
    getCurrentPlaylist: (state) => state.currentPlaylist,
  },
  actions: {
    setCurrentPlaylist(playlist: string) {
      this.currentPlaylist = playlist
    },
  },
});