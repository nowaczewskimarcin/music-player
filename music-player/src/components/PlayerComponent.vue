<template>
  <p>player controls</p>

      <div class="text-purple q-gutter-md" style="font-size: 2em">
  <q-icon name="style" @click="firstFunction()" /> 
    </div>

</template>
 
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PlayerControls',

  components: {},
    
  setup () {

    return {}
  },
  methods: {
      firstFunction() {
          console.log("firstFunction")
      }
  }
});
</script>
