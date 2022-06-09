<template>
  <p>
    Current playlist: <strong>{{ selectedPlaylist.name }}</strong>
  </p>

  <ol v-if="selectedPlaylist.SongsList.length !== 0">
    <li v-for="song in selectedPlaylist.SongsList" :key="song.title">
      <p>{{ song.title }} - {{ song.artist }} ({{ song.year }})</p>
    </li>
  </ol>
  <ul v-else>
    <li>This playlist is empty</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { usePlaylistsStore } from 'stores/playlists-store';
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
      },
    },
    ...mapStores(usePlaylistsStore),
  },
  methods: {},
});
</script>
<!-- // wyswietlic liste piosnek z danej playlisty, jezeli pusta to wyswietlic info, dodawanie, usuwanie, edytowanie listy-->
<style scoped>
ul {
  list-style: none;
}
</style>
