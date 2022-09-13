import { defineStore } from 'pinia';
import { PlaylistModel } from 'components/models';

export const usePlaylistsStore = defineStore('playlists', {
  state: () => ({
    currentPlaylist: {
      id: null,
      name: '',
      SongsList: [],
    } as PlaylistModel,
    playlists: [
      {
        id: 1,
        name: 'Good mood',
        SongsList: [],
      },
      {
        id: 2,
        name: 'Queen',
        SongsList: [],
      },
      {
        id: 3,
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
      playlist.id = new Date().getTime();
      this.playlists.push(playlist);
    },
    remove(index: number) {
      this.playlists = this.playlists.filter(
        (playlists: PlaylistModel, playlistIndex) => playlistIndex !== index
      );
    },
    edit(playlist: PlaylistModel) {
      const index = this.playlists.findIndex((item: PlaylistModel) => item.id === playlist.id );
      this.playlists[index] = playlist;
    },
  },
});
