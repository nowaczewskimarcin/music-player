<template>
  <section id="playerComponent">
    <p>player controls</p>

    <div
      class="text-purple q-gutter-md row justify-center items-center"
      style="font-size: 2em"
    >
      <div>
        <q-btn
          class="btn-player previous"
          @click="previousSong()"
          icon="fa-solid fa-backward-step"
        />
        <q-btn
          class="btn-player play"
          v-if="!isPlaying"
          @click="playSong()"
          icon="fa-solid fa-play"
        />
        <q-btn
          class="btn-player pause"
          v-else
          @click="pauseSong()"
          icon="fa-solid fa-pause"
        />
        <q-btn
          class="btn-player forward"
          @click="nextSong()"
          icon="fa-solid fa-forward-step"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  el: '#playerComponent',
  name: 'PlayerControls',
  components: {},
  data() {
    return {
      isPlaying: false,
    };
  },
  computed: {},
  methods: {
    previousSong() {
      console.log('User changed previous song <<<');
    },
    playSong() {
      this.isPlaying = true;
      console.log('Song is playing');
    },
    pauseSong() {
      this.isPlaying = false;
      console.log('Song is pausing');
    },
    nextSong() {
      console.log('User changed forward song >>>');
    },
  },
});
</script>

<style scoped>
.btn-player {
}
</style>
