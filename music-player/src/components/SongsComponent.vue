<template>
  <p>Current playlist: {{ playlistsStore.getCurrentPlaylist }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia'
import { usePlaylistsStore } from 'stores/playlists-store'

export default defineComponent({
  name: 'SongsComponent',

  components: {},

  computed: {
    ...mapStores(usePlaylistsStore),
  },
});
</script>
