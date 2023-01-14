<template >
    <div>
      <form id="scene-form" class="scene-form" @submit.prevent="onSubmit">
      <h1 style="font-weight:bold;font-size: large;">Choose a Scene</h1>
      <label for="name" style="padding:2%;font-size: large;">Name:</label>
      <select id="name" v-model="name">
        <option>Constant movement</option>
        <option>Natural movement</option>
        <option>Eight movement</option>
        <option>Harmonical movement</option>
      </select>
  <br><br>
      <label for="difficulty" style="padding:2%;font-size: large;">Difficulty:</label>
      <select id="difficulty" v-model="difficulty">
        <option>Difficult</option>
        <option>Medium</option>
        <option>Easy</option>
      </select>
  <br><br>
      <label for="music" style="padding:2%;font-size: large;">Music:</label>      
      <select id="music" v-model="music">
        <option>No music</option>
        <option>Synch music</option>
        <option>Asynch music</option>
      </select>
  <br><br>
      <label for="rhythm" style="padding:2%;font-size: large;">Rhythm:</label>      
      <select id="rhythm" v-model="rhythm">
        <option>No rhythm</option>
        <option>Synch rhythm</option>
        <option>Asynch rhythm</option>
      </select>
  <br><br>
      <input class="button" type="submit" value="Add scene">  
    </form>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        name: null,
        difficulty: null,
        music: null,
        rhythm: null
      }
    },
    methods: {
      onSubmit() {
        if (this.name === null || this.music === null || this.difficulty === null
          || this.rhythm == null) {
          alert('New scene is incomplete. Please fill out every field.')
          return
        } else if (this.music !== 'No music' && this.rhythm !== 'No rhythm') {
          alert('Only one between rhythm and music can be choosen at a time')
          return
        }
       const scene = {
         name: this.name,
         music: this.music,
         rhythm: this.rhythm,
         difficulty: this.difficulty,
       }
       this.$emit('scene-submitted', scene)
       this.name = null
       this.music = null
        this.difficulty = null
       this.rhythm = null
     }
   }
  }
</script>
<style lang="css">

</style>