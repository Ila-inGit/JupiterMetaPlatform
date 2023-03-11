<template>
  <div class="scene-list-container">
  <h1 style="font-family: 'Inter', sans-serif; font-weight:bold; font-size: large; width: fit-content; margin-bottom: 2%">Tasks selected till now:</h1>
    <ul class="ul">
      <li v-for="(scene, index) in scenes" :key="index" style="margin-bottom: 2%">
       <p style="font-family: 'Inter', sans-serif; font-weight:bold;width: fit-content;">{{ scene.name }} task </p> 
        {{ scene.difficulty }} difficulty - {{ scene.music }} - {{ scene.rhythm }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props: {
        scenes: {
        type: Array,
        required: true
        }
    }
}
</script>
<style lang="css">
    .scene-list-container {
      flex: auto;
      width: 100%;
      border: transparent;
      align-items: center;
      align-content: center;
    }

    .ul{
      list-style-type: square;
    }
</style>