<template>
  <div v-for="playlist in playlists" :key="playlist.name">
    <p @click="setCurrentPlaylist(playlist)">{{ playlist.name }} ({{playlist.songsCount}})</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia'
import { usePlaylistsStore, PlaylistModel } from 'stores/playlists-store'

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
    }
  },
});
</script>
