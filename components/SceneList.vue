<template>
  <div class="scene-list-container">
  <h1 style="font-family: 'Inter', sans-serif; font-weight:bold; font-size: large; margin-bottom: 8px">Tasks selected till now:</h1>
    <ul class="ul">
      <li v-for="(scene, index) in scenes" :key="index" style="margin-bottom: 6px">
       <p style="font-family: 'Inter', sans-serif; font-weight:bold;">{{ scene.name }} task </p> 
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

    .ul{
      list-style-type: square;
    }
</style>