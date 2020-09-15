<template>
  <div>
    <Menu
      @menu-change="handleMenuChange"
      @color-change="handleColorChange"
    ></Menu>
    <div class="data-content">
      <div class="data-list">
        <div class="data-title">批注列表</div>
        <div
          v-for="(item, index) in dataList"
          :key="`data-${index}`"
          class="data-item"
          @click="handleLook(item)"
        >
          <div class="content">{{ item.content.content }}</div>
          <div class="user">{{ item.content.user }}</div>
        </div>
      </div>
      <Graffiti
        :src="
          require('../assets/1.jpg')
        "
        :select-type="selectType"
        :select-color="selectColor"
        @onAdd="onAdd"
        class="canvas-part"
        :current="current"
      ></Graffiti>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Graffiti from "@/components/graffiti.vue";
import Menu from "@/components/menu.vue";

enum color {
  Green = "绿色"
}
@Component({
  components: {
    Graffiti,
    Menu
  }
})
export default class Index extends Vue {
  private message: string = "首页";
  private i: number = 1;
  private is: boolean = true;
  private arr: number[] = [];
  private obj: object = {};
  private selectType: number = 0;
  private selectColor: string = "#000";
  private dataList: object[] = [];
  private current: object = {};

  private created() {}

  private beforeRouteEnter(to: any, from: any, next: any) {
    console.log(color.Green);
    next();
  }

  private handleClick() {
    this.message = "change";
  }

  private handleMenuChange(i: number) {
    this.selectType = i;
  }

  private handleColorChange(color: string) {
    this.selectColor = color;
  }

  private onAdd(data: object) {
    this.dataList.push(data);
  }

  private handleLook(item: object) {
    this.current = item;
  }
}
</script>

<style lang="scss" scoped>
.data-content {
  display: flex;
  align-items: flex-start;
  .canvas-part {
    flex: none;
  }
  .data-list {
    width: 300px;
    border: 1px solid #e8e8e8;
    height: 500px;
    margin-right: 12px;
    .data-title {
      line-height: 40px;
      background-color: #f8f8f8;
      border-bottom: 1px solid #e8e8e8;
      font-weight: 600px;
      padding: 0 12px;
    }
    .data-item {
      border-bottom: 1px solid #e8e8e8;
      padding: 12px;
      cursor: pointer;
      .content {
        color: #333;
      }
      .user {
        font-size: 12px;
        color: #999;
        text-align: right;
      }
    }
  }
}
</style>
