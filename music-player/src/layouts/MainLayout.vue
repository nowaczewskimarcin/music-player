<template>
  <q-layout class="row" view="hHh lpR fFf fit row wrap justify-start items-start content-start">
  <div class="wrapper">
    <div class="left-column"><PlaylistsComponent /></div>
    <div class="right-column"><SongsComponent /></div>
  </div>
  <q-footer><PlayerControls /></q-footer>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlayerControls from 'components/PlayerComponent.vue';
import PlaylistsComponent from 'components/PlaylistsComponent.vue';
import SongsComponent from 'components/SongsComponent.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { PlayerControls, SongsComponent, PlaylistsComponent },

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
      width: 30%;
      height: calc(100vh - 100px);
    }

    .right-column {
      display: inline-block;
      width: 70%;
      height: calc(100vh - 100px);
    }

  }

  .q-footer {
    height: 100px;
    background: #fff;
    border-top: 1px solid #000;
  }
</style>
