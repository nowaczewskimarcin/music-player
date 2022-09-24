<template>
  <q-layout class="row" view="hHh lpR fFf fit row wrap justify-start items-start content-start">
  <div class="wrapper">
    <div class="left-column"><PlaylistsComponent /></div>
    <div class="right-column"><SongsComponent /></div>
    <PlaylistModalComponent />
  </div>
  <q-footer><PlayerControls /></q-footer>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlayerControls from 'components/PlayerComponent.vue';
import PlaylistsComponent from 'components/PlaylistsComponent.vue';
import SongsComponent from 'components/SongsComponent.vue';
import PlaylistModalComponent from 'components/modals/PlaylistModalComponent.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { PlayerControls, SongsComponent, PlaylistsComponent, PlaylistModalComponent },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
<style scoped lang="scss">
  .wrapper {
    width: 100%;
    .left-column {
      display: inline-block;
      width: 20%;
      height: calc(100vh - 100px);
      background: dimgrey;
      color: #c4c4c4;
    }

    .right-column {
      position: absolute;
      display: inline-block;
      width: 80%;
      height: calc(100vh - 100px);
    }

  }

  .q-footer {
    height: 100px;
    background: #fff;
  }
</style>
