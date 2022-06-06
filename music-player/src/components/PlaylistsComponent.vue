<template>
  <div v-for="playlist in playlistsMock" :key="playlist.name">
    <p @click="setCurrentPlaylist(playlist.name)">{{ playlist.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia'
import { usePlaylistsStore } from 'stores/playlists-store'

export default defineComponent({
  name: 'PlaylistsComponent',
  components: {},
  computed: {
    ...mapStores(usePlaylistsStore),
  },
  methods: {
    setCurrentPlaylist(playlistName: string) {
      this.playlistsStore.setCurrentPlaylist(playlistName);
    }
  },
  data() {
    return {
      playlistsMock: [
        {
          name: 'Good mood',
        },
        {
          name: 'Queen',
        },
        {
          name: 'Marcins music tralala',
        }
      ]
    }
  }
});
</script>
