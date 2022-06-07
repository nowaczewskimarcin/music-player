<template>
  <div v-for="playlist in playlists" :key="playlist.name">
    <p @click="setCurrentPlaylist(playlist)">{{ playlist.name }} ({{playlist.songsCount}})</p>
  </div>
  <p class="clicker" @click="addNewPlaylist({name: 'New Playlist', songsCount: 0})">Click ME dude :)</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia'
import { usePlaylistsStore } from 'stores/playlists-store'
import { PlaylistModel } from 'components/models';
export default defineComponent({
  name: 'PlaylistsComponent',
  components: {},
  computed: {
    ...mapStores(usePlaylistsStore),
    playlists: {
      get(): PlaylistModel[] {
        return this.playlistsStore.getPlaylists;
      },
      set(val: PlaylistModel) {
        return val
      }
    }
  },
  methods: {
    setCurrentPlaylist(playlistName: PlaylistModel) {
      this.playlistsStore.setCurrentPlaylist(playlistName);
    },
    addNewPlaylist(playlist: PlaylistModel) {
      this.playlistsStore.addPlaylist(playlist)
    }
  },
});
</script>
<style lang="scss">
.clicker {
  &:hover {
    cursor: pointer;
  }
}
</style>
