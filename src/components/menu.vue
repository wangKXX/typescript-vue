<template>
  <div class="menu">
    <ul class="menu-ul">
      <li
        v-for="(item, index) in data"
        :key="`menu-${index}`"
        @click="handleClick(index)"
      >
        {{ item }}
      </li>
    </ul>
    <a-input type="color"  @change="handlecolorChange" style="width: 44px;"/>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

enum selectType {
  pen,
  rect,
  line,
  cire,
  clear
}
@Component
export default class Menu extends Vue {
  private data: string[] = [];

  private created() {
    this.data = ["铅笔", "矩形", "直线", "圆"];
  }

  private handleClick(i: number) {
    this.$emit("menu-change", i);
  }

  private handlecolorChange({ target: { value } }: any) {
    this.$emit("color-change", value);
  }
}
</script>
<style lang="scss" scoped>
.menu{
  display: flex;
  align-items: center;
  padding: 12px;
}
.menu-ul {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  li {
    margin-right: 8px;
    cursor: pointer;
  }
}
</style>
