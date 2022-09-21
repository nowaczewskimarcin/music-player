<template>
  <section class="player" id="playerComponent">
    <div
      class="text-white row justify-center items-center player__buttons"
      style="font-size: 2em"
    >
        <q-btn flat round
          class="btn-player previous"
          @click="previousSong()"
          icon="fa-solid fa-backward-step"
        />
        <q-btn flat round
          class="btn-player play"
          v-if="!isPlaying"
          @click="playSong()"
          icon="fa-solid fa-play"
        />
        <q-btn flat round
          class="btn-player pause"
          v-else
          @click="pauseSong()"
          icon="fa-solid fa-pause"
        />
        <q-btn flat round
          class="btn-player forward"
          @click="nextSong()"
          icon="fa-solid fa-forward-step"
        />
      </div>
      <div class="player__volume">
        <input type="range">
      </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  el: '#playerComponent',
  name: 'PlayerControls',
  components: {},
  setup() {
    const isPlaying = ref(false)

    const previousSong = () => {
      console.log('User changed previous song <<<');
    }
    const playSong = () => {
      isPlaying.value = true;
      console.log('Song is playing');
    }
    const pauseSong = () => {
      isPlaying.value = false;
      console.log('Song is pausing');
    }
    const nextSong = () => {
      console.log('User changed forward song >>>');
    }
    return {
      isPlaying,
      playSong,
      previousSong,
      pauseSong,
      nextSong,
    }
  }
});
</script>

<style lang="scss" scoped>
  .player {
    position: relative;
    height: 100%;
    width: 100%;
    display: inline-block;
    background: lightslategray;

    &__buttons {
      height: 100%;
    }

    &__volume {
      position: absolute;
      top: 43px;
      right: 43px;
    }
  }
.btn-player {
}
</style>
