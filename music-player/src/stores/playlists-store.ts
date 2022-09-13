import { defineStore } from 'pinia';
import { PlaylistModel } from 'components/models';

export const usePlaylistsStore = defineStore('playlists', {
  state: () => ({
    currentPlaylist: {
      name: '',
      SongsList: [],
    } as PlaylistModel,
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
    ] as PlaylistModel[],
  }),
  getters: {
    getCurrent: (state) => state.currentPlaylist,
    getPlaylists: (state) => state.playlists,
  },
  actions: {
    setCurrent(playlist: PlaylistModel) {
      this.currentPlaylist = playlist;
    },
    addNew(playlist: PlaylistModel) {
      this.playlists.push(playlist);
    },
    remove(index: number) {
      console.log(index)
      this.playlists = this.playlists.filter(
        (playlists: PlaylistModel, playlistIndex) => playlistIndex !== index
      );
    },
    edit(playlist: PlaylistModel, index: number) {
      this.playlists[index] = playlist;
    },
  },
});
