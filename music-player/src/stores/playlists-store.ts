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
    addNew(playlistName: string) {
      const newPlaylist = {
        id: new Date().getTime(),
        name: playlistName,
        SongsList: [],
      }
      this.playlists.push(newPlaylist);
    },
    remove(id: number | null) {
      if (!id) return;
      this.playlists = this.playlists.filter(
        (playlist: PlaylistModel) => playlist.id !== id
      );
    },
    edit(playlistName: string, id: number | null) {
      if (!id) return;
      const index = this.playlists.findIndex((item: PlaylistModel) => item.id === id );
      this.playlists[index].name = playlistName;
    },
  },
});
