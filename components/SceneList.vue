<template>
    <div class="scene-container">
  <h1 style="font-weight:bold">Scenes Selected:</h1>
    <ul class="ul">
      <li v-for="(scene, index) in scenes" :key="index">
        {{ scene.name }} with  {{ scene.difficulty }} and  {{ scene.music }}, {{ scene.rhythm }}
        <br/>
        <br>
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
      list-style-type: circle;
    }
</style>