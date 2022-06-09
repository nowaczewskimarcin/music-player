<template>
  <q-btn
    class="btn-add-song"
    color="green"
    icon="ion-add"
    label="Add new Song"
    @click="openDialogNewSong()"
  />
  <p>
    Current playlist: <strong>{{ selectedPlaylist.name }}</strong>
  </p>

  <ol v-if="selectedPlaylist.SongsList.length !== 0">
    <li v-for="song in selectedPlaylist.SongsList" :key="song.title">
      <p>{{ song.title }} - {{ song.artist }} ({{ song.year }})</p>
    </li>
  </ol>
  <ul v-else>
    <li>
      This playlist is empty. You can add song by clicking add song button.
    </li>
  </ul>

  <q-dialog v-model="addNewSongDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Please enter new song and chose playlist</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          type="string"
          v-model="titleSong"
          hint="Enter title of song"
          @keyup.enter="prompt = false"
        />
        <q-input
          dense
          type="string"
          v-model="artistSong"
          hint="Enter artist"
          @keyup.enter="prompt = false"
        />
        <q-input
          dense
          type="number"
          v-model="yearSong"
          hint="Enter year of song"
          @keyup.enter="prompt = false"
        />
        <q-select
          v-model="model"
          :options="playlists"
          option-value="name"
          option-label="name"
        />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add song" @click="addNewSong()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { usePlaylistsStore } from 'stores/playlists-store';
import { PlaylistModel } from 'components/models';

export default defineComponent({
  name: 'SongsComponent',
  components: {},
  data() {
    return {
      tempPlaylistsData: {
        name: '',
        SongsList: [],
      } as PlaylistModel,
      addNewSongDialog: false,
    };
  },
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
  methods: {
    openDialogNewSong() {
      this.addNewSongDialog = true;
    },
    addNewSong() {
      console.log('open addNewSongDialog');
    },
  },
});
</script>

<style scoped lang="scss">
ul {
  list-style: none;
}
</style>
