<template>
  <p>Current playlist: <strong>{{ selectedPlaylist.name }}</strong></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia'
import { usePlaylistsStore } from 'stores/playlists-store'
import { PlaylistModel } from 'components/models';

export default defineComponent({
  name: 'SongsComponent',

  components: {},

  computed: {
    selectedPlaylist: {
      get(): PlaylistModel {
        return this.playlistsStore.getCurrentPlaylist;
      },
      set(newVal: PlaylistModel) {
        return newVal;
      }
    },
    ...mapStores(usePlaylistsStore),
  },
  methods: {}
});
</script>
