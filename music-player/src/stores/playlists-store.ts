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
        SongsList: [
          {
            title: 'Testowo',
            year: 1990,
            artist: 'Andrzej Szopenchauer',
          },
          {
            title: 'Testujemy',
            year: 1970,
            artist: 'Kalio Zarro',
          },
          {
            title: 'Na',
            year: 1999,
            artist: 'Kalio Zarro',
          },
          {
            title: 'Potrzeby',
            year: 1980,
            artist: 'Kalio Zarro',
          },
          {
            title: 'Nauki',
            year: 1970,
            artist: 'Kalsasio Fo',
          },
        ],
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
