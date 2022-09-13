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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue';
import { usePlaylistsStore } from 'stores/playlists-store';
import { PlaylistModel } from 'components/models';

export default defineComponent({
  name: 'PlaylistsComponent',
  components: {},
  setup() {
    const store = usePlaylistsStore();
    const showDialog = ref(false);
    const isEditMode = ref(false);
    const editedIndex = ref(0);
    // const tempPlaylistsData =  {
    //     name: '',
    //     SongsList: [],
    //   } as PlaylistModel;
    const tempPlaylistsData = reactive({
      name: '',
      SongsList: [],
    } as PlaylistModel)

    const playlists = computed(() => store.getPlaylists);

    const setCurrentPlaylist = (playlistName: PlaylistModel): void => {
      store.setCurrent(playlistName);
    };
    const openDialog = (isEditModeEnabled: boolean, playlist?: PlaylistModel, index?: number): void => {
      console.log(isEditModeEnabled, playlist, index)
      isEditMode.value = isEditModeEnabled;
      showDialog.value = true;
      if (isEditModeEnabled) {
        tempPlaylistsData.name = playlist?.name || tempPlaylistsData.name;

        editedIndex.value = index || 0;
      }
    };
    const resetTemp = () => {
      tempPlaylistsData.name = '';
      tempPlaylistsData.SongsList = [];
    };
    const addNewPlaylist = (playlist: PlaylistModel): void => {
      store.addNew(playlist);
      showDialog.value = false;
    };
    const deletePlaylist = (index: number): void => {
      console.log(index)
      store.remove(index);
    };
    const editPlaylist = (playlist: PlaylistModel, index: number): void => {
      store.edit(playlist, index);
    }

    return {
      showDialog,
      isEditMode,
      setCurrentPlaylist,
      addNewPlaylist,
      deletePlaylist,
      editPlaylist,
      openDialog,
      tempPlaylistsData,
      playlists,
      resetTemp,
    }
  },
});
</script>
