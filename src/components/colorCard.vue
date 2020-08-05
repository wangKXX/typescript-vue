<template>
  <div class="color-card">
    <span :style="`background: ${selectedColor}`"></span><span>{{selectedColor}}</span>
    <ul class="color-card-slider">
      <li class="color-item"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export default class colorCard extends Vue {
  private selectedColor: string = "#fff";
  
};
</script>