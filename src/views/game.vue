<template>
  <div class="game-wrap">
    <canvas ref="canvas" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export default class Game extends Vue {
  private canvas!: any;

  public $refs!: {
    canvas: HTMLCanvasElement;
  };

  private mounted() {
    this.initCanvas();
  }

  private initCanvas() {
    const { canvas } = this.$refs;
    this.canvas = canvas;
    const { width, height } = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
</script>

<style lang="scss" scoped>
.game-wrap {
  width: 100%;
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
