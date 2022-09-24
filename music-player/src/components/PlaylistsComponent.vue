<template>
  <div class="q-pa-md q-m-md playlists">
    <q-btn flat
      class="add-button"
      color="white"
      icon="ion-add"
      label="Add new playlist"
      @click="openCreateDialog()"
    />
    <div v-if="!playlists.length">No playlists added</div>
    <div class="playlist-item"
      v-for="(playlist, index) in playlists"
      :key="index"
      @click.self="setCurrentPlaylist(playlist)"
      >
      <p @click.self="setCurrentPlaylist(playlist)" class="playlist-item__name">
        {{ playlist.name }}
      </p>
      <div class="playlist-item__action-buttons action-buttons">
        <q-btn flat round
          color="white"
          size="8px"
          class="action-button"
          @click="openEditDialog(playlist)"
          icon="fa-solid fa-edit"
        />
        <q-btn flat round
          color="white"
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
import { usePlaylistsModalStore } from 'stores/playlist-modal-store';
import { PlaylistModel } from 'components/models';

export default defineComponent({
  name: 'PlaylistsComponent',
  components: {},
  setup() {
    const $store = usePlaylistsStore();
    const $modalStore = usePlaylistsModalStore();
    const showDialog = ref(false);
    const isEditMode = ref(false);
    const tempName = ref('');
    const tempId = ref(null) as Ref<number> | Ref<null>;

    const playlists = computed(() => $store.getPlaylists);

    const setCurrentPlaylist = (playlistName: PlaylistModel): void => {
      $store.setCurrent(playlistName);
    };
    const openEditDialog = (playlist: PlaylistModel): void => {
      $modalStore.openModal(true, playlist.name, playlist.id as number);
    }
    const openCreateDialog = (): void => {
      $modalStore.openModal(false);
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
      isEditMode,
      playlists,
      showDialog,
      tempName,
      addNewPlaylist,
      deletePlaylist,
      editPlaylist,
      openEditDialog,
      openCreateDialog,
      resetTemp,
      setCurrentPlaylist,
    }
  },
});
</script>
<style lang="scss" scoped>
  .playlist {
    button {
      margin-bottom: 10px;
    }

    &-item {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      cursor: pointer;

      &:hover {
        color: #fff;
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
