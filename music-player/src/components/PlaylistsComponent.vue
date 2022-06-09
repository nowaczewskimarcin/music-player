<template>
  <div class="q-pa-md q-m-md">
    <q-btn
      color="primary"
      icon="ion-add"
      label="Add new playlist"
      @click="openDialog(false)"
    />

    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6" v-if="!isEditMode">Add new playlist</div>
          <div class="text-h6" v-if="isEditMode">Edit playlist</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="tempPlaylistsData.name"
            autofocus
            hint="Enter playlist name"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup @click="resetTemp()" />
          <q-btn
            v-if="!isEditMode"
            flat
            label="Add playlist"
            @click="addNewPlaylist(tempPlaylistsData)"
          />
          <q-btn
            v-if="isEditMode"
            flat
            label="Update playlist"
            @click="editPlaylist(tempPlaylistsData)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div v-for="(playlist, index) in playlists" :key="playlist.name">
      <p @click="setCurrentPlaylist(playlist)">
        {{ playlist.name }}
      </p>
      <q-badge color="blue" @click="openDialog(true, playlist, index)">
        EDIT
      </q-badge>
      <q-badge color="red" @click="deletePlaylist(index)"> DELETE </q-badge>
    </div>

    <q-btn
      class="btn-add-song"
      color="green"
      icon="ion-add"
      label="Add new Song"
      @click="openDialogNewSong()"
    />
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { usePlaylistsStore } from 'stores/playlists-store';
import { PlaylistModel } from 'components/models';

export default defineComponent({
  name: 'PlaylistsComponent',
  components: {},
  data() {
    return {
      showDialog: false,
      tempPlaylistsData: {
        name: '',
        SongsList: [],
      } as PlaylistModel,
      isEditMode: false,
      addNewSongDialog: false,
      options: this.playlist,

      editedIndex: 0,
    };
  },
  computed: {
    ...mapStores(usePlaylistsStore),
    playlists: {
      get(): PlaylistModel[] {
        return this.playlistsStore.getPlaylists;
      },
      set(val: PlaylistModel) {
        return val;
      },
    },
  },
  methods: {
    setCurrentPlaylist(playlistName: PlaylistModel) {
      this.playlistsStore.setCurrentPlaylist(playlistName);
    },
    openDialog(isEditMode: boolean, playlist?: PlaylistModel, index?: number) {
      this.isEditMode = isEditMode;
      this.showDialog = true;
      if (isEditMode) {
        this.tempPlaylistsData = playlist || this.tempPlaylistsData;

        this.editedIndex = index || 0;
      }
    },
    addNewPlaylist(playlist: PlaylistModel) {
      this.playlistsStore.addNewPlaylist(playlist);
      this.showDialog = false;
      this.resetTemp();
    },
    openDialogNewSong() {
      this.addNewSongDialog = true;
    },
    addNewSong() {
      console.log('open addNewSongDialog');
    },
    resetTemp() {
      this.tempPlaylistsData = {
        name: '',
        SongsList: [],
      };
    },
    deletePlaylist(index: number) {
      this.playlistsStore.deletePlaylist(index);
    },
    editPlaylist(playlist: PlaylistModel) {
      this.playlistsStore.editPlaylist(playlist, this.editedIndex);
      this.showDialog = false;
      this.resetTemp();
    },
  },
});
</script>

<style scoped lang="scss">
.btn-add-song {
  bottom: -300px;
}
</style>
