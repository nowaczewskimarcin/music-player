<template>
<q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 350px">
        <q-card-section>
        <div class="text-h6" v-if="!isEditEnabled">Add new playlist</div>
        <div class="text-h6" v-if="isEditEnabled">Edit playlist</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
        <q-input
            dense
            v-model="name"
            autofocus
            hint="Enter playlist name"
        />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup @click="closeModal()" />
        <q-btn
            v-if="!isEditEnabled"
            flat
            label="Add playlist"
            @click="addNewPlaylist()"
        />
        <q-btn
            v-if="isEditEnabled"
            flat
            label="Update playlist"
            @click="editPlaylist()"
        />
        </q-card-actions>
    </q-card>
    </q-dialog>
</template>
  
<script lang="ts">
import { defineComponent, computed, WritableComputedRef } from 'vue';
import { usePlaylistsModalStore } from 'stores/playlist-modal-store';
import { usePlaylistsStore } from 'stores/playlists-store';

export default defineComponent({
name: 'PlaylistModalComponent',
components: {},
setup() {
    const $modalStore = usePlaylistsModalStore();
    const $playlistStore = usePlaylistsStore();
    const isOpen = computed(() => $modalStore.isModalOpen);
    const isEditEnabled = computed(() => $modalStore.isEditEnabled);
    const name: WritableComputedRef<string> = computed({
        get(): string {
            return $modalStore.getName;
        },
        set(val: string) {
            $modalStore.setName(val)
        }
    });
    const id = computed(() => $modalStore.getId)

    const closeModal = () => {
        $modalStore.closeModal();
    }

    const resetStore = () => {
        $modalStore.resetStore();
    };
    const addNewPlaylist = (): void => {
        $playlistStore.addNew(name.value);
        $modalStore.closeModal();
    };
    const editPlaylist = (): void => {
      $playlistStore.edit(name.value, id.value);
      $modalStore.closeModal();
    }

    return {
        isOpen,
        isEditEnabled,
        name,
        resetStore,
        closeModal,
        addNewPlaylist,
        editPlaylist,
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
