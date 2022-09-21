<template>
  <div class="songs">
    <p>
      Current playlist: <strong>{{ selectedPlaylist.name }}</strong>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { usePlaylistsStore } from 'stores/playlists-store';

export default defineComponent({
  name: 'SongsComponent',
  components: {},
  setup() {
    const store = usePlaylistsStore();

    const selectedPlaylist = computed(() => store.getCurrent);

    return { selectedPlaylist }
  },
});
</script>
<!-- // wyswietlic liste piosnek z danej playlisty -->
<!-- No to dawaj!!!! :D -->
<style lang="scss" scoped>
  .songs {
    padding: 16px 20px 5px;
  }
</style>
