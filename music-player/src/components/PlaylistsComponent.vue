<template>
  <div class="q-pa-md q-m-md playlists">
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
            v-model="tempName"
            autofocus
            hint="Enter playlist name"
            @keyup.enter="isEditMode ? editPlaylist() : addNewPlaylist()"
            @keyup.escape="showDialog = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup @click="resetTemp()" />
          <q-btn
            v-if="!isEditMode"
            flat
            label="Add playlist"
            @click="addNewPlaylist()"
          />
          <q-btn
            v-if="isEditMode"
            flat
            label="Update playlist"
            @click="editPlaylist()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="playlist-item"
      v-for="(playlist, index) in playlists"
      :key="index"
      @click.self="setCurrentPlaylist(playlist)"
      >
      <p class="playlist-item__name">
        {{ playlist.name }}
      </p>
      <div class="playlist-item__action-buttons action-buttons">
        <q-btn flat round
          color="grey"
          size="8px"
          class="action-button"
          @click="openEditDialog(playlist)"
          icon="fa-solid fa-edit"
        />
        <q-btn flat round
          color="grey"
          size="8px"
          class="action-button"
          @click="deletePlaylist(playlist.id)"
          icon="fa-solid fa-trash"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from 'vue';
import { usePlaylistsStore } from 'stores/playlists-store';
import { PlaylistModel } from 'components/models';

export default defineComponent({
  name: 'PlaylistsComponent',
  components: {},
  setup() {
    const $store = usePlaylistsStore();
    const showDialog = ref(false);
    const isEditMode = ref(false);
    const tempName = ref('');
    const tempId = ref(null) as Ref<number> | Ref<null>;

    const playlists = computed(() => $store.getPlaylists);

    const setCurrentPlaylist = (playlistName: PlaylistModel): void => {
      console.log(playlistName);
      $store.setCurrent(playlistName);
    };
    const openEditDialog = (playlist: PlaylistModel): void => {
      tempName.value = playlist.name;
      tempId.value = playlist.id;
      isEditMode.value = true;
      showDialog.value = true;
    }
    const openCreateDialog = (): void => {
      isEditMode.value = false;
      showDialog.value = true;
    }
    const resetTemp = () => {
      tempName.value = '';
      tempId.value = null;
    };
    const addNewPlaylist = (): void => {
      $store.addNew(tempName.value);
      showDialog.value = false;
      resetTemp();
    };
    const deletePlaylist = (id: number | null): void => {
      $store.remove(id);
    };
    const editPlaylist = (): void => {
      $store.edit(tempName.value, tempId.value);
      showDialog.value = false;
      resetTemp();
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
      tempName,
      playlists,
      resetTemp,
    }
  },
});
</script>
<style lang="scss" scoped>
  .playlist {
    &-item {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      cursor: pointer;

      &:hover {
        background: ghostwhite;
      }

      &__name {
        margin: 0;
      }

      .action-buttons {
        visibility: hidden;

        .g-btn {
          position: inherit;
          font-size: 8px;
        }
      }

      &:hover {
        .action-button {
          visibility: visible;
        }
      }
    }
  }
</style>
