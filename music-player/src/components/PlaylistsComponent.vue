<template>
  <div class="q-pa-md q-m-md">
    <q-btn
      color="primary"
      icon="ion-add"
      label="Add new playlist"
      @click="openCreateDialog()"
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
    <div v-for="(playlist, index) in playlists" :key="index">
      <p @click="setCurrentPlaylist(playlist)">
        {{ playlist.name }}
      </p>
      <q-badge color="blue" @click="openEditDialog(playlist)">
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
    const tempPlaylistsData = reactive({
      id: null,
      name: '',
      SongsList: [],
    } as PlaylistModel);

    const playlists = computed(() => store.getPlaylists);

    const setCurrentPlaylist = (playlistName: PlaylistModel): void => {
      store.setCurrent(playlistName);
    };
    const openEditDialog = (playlist: PlaylistModel): void => {
      isEditMode.value = true;
      showDialog.value = true;
      tempPlaylistsData.name = playlist.name;
      tempPlaylistsData.id = playlist.id;
    }
    const openCreateDialog = (): void => {
      isEditMode.value = false;
      showDialog.value = true;
      resetTemp();
    }
    const resetTemp = () => {
      tempPlaylistsData.id = null;
      tempPlaylistsData.name = '';
      tempPlaylistsData.SongsList = [];
    };
    const addNewPlaylist = (playlist: PlaylistModel): void => {
      store.addNew(playlist);
      showDialog.value = false;
    };
    const deletePlaylist = (index: number): void => {
      store.remove(index);
    };
    const editPlaylist = (playlist: PlaylistModel): void => {
      store.edit(playlist);
      showDialog.value = false;
    }

    return {
      showDialog,
      isEditMode,
      setCurrentPlaylist,
      addNewPlaylist,
      deletePlaylist,
      editPlaylist,
      openEditDialog,
      openCreateDialog,
      tempPlaylistsData,
      playlists,
      resetTemp,
    }
  },
});
</script>
