<template>
  <div class="q-pa-md q-m-md">
    <q-btn
      color="primary"
      icon="ion-add"
      label="Add new playlist"
      @click="openDialogAddNewPlaylist()"
    />

    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add new playlist</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="enteredPlaylist"
            autofocus
            hint="Enter playlist name"
          />
          <q-input
            dense
            type="number"
            v-model="enteredCount"
            hint="Enter playlist count"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add playlist" @click="addNewPlaylist()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div v-for="(playlist, index) in playlists" :key="playlist.name">
      <p @click="setCurrentPlaylist(playlist)">
        {{ playlist.name }} ({{ playlist.songsCount }})
      </p>
      <q-badge color="blue"> EDIT </q-badge>
      <q-badge color="red" @click="deletePlaylist(index)"> DELETE </q-badge>
    </div>
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
      enteredPlaylist: '',
      enteredCount: 0,
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

    openDialogAddNewPlaylist() {
      this.showDialog = true;
    },

    addNewPlaylist() {
      this.playlistsStore.addNewPlaylist({
        name: this.enteredPlaylist,
        songsCount: this.enteredCount,
      });
    },
    deletePlaylist(index: number) {
      this.playlistsStore.deletePlaylist(index);
    },
  },
});
</script>
