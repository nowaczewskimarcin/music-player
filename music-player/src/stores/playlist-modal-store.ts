import { defineStore } from 'pinia';

export const usePlaylistsModalStore = defineStore('playlistsModal', {
  state: () => ({
    isOpen: false,
    isEditEnabled: false,
    name: '',
    id: null as number | null
  }),
  getters: {
      isModalOpen: (state) => state.isOpen,
      getName: (state) => state.name,
      getId: (state) => state.id,
  },
  actions: {
      openModal(isEditEnabled: boolean, name?: string, id?: number) {
          this.isOpen = true;
          this.isEditEnabled = isEditEnabled;
          this.name = isEditEnabled ? name || '' : '';
          this.id = isEditEnabled ? id || null : null;
      },
      closeModal() {
        this.isOpen = false;
        },
      setName(name: string) {
          this.name = name;
      },
      setId(id: number) {
          this.id = id;
      },
      resetStore() {
          this.name = '';
          this.id = null;
      }
  },
});
