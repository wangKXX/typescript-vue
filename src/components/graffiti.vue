<template>
  <div class="graffiti-warp">
    <img :src="src" ref="img" />
    <canvas
      ref="canvas"
      @mousedown="mouseDownEvent"
      @mousemove="mouseMoveEvent"
      @mouseup="mouseUpEvent"
    />
    <div
      class="modal"
      v-if="isShow"
      :style="`top: ${end_draw_y}px; left: ${end_draw_x}px`"
    >
      <div class="modal-content">
        <div class="modal-label">标注人：</div>
        <a-input placeholder="请输入" v-model="user" />
        <div class="modal-label">标注内容：</div>
        <a-textarea
          placeholder="请输入"
          :auto-size="{ minRows: 2, maxRows: 6 }"
          v-model="content"
        />
        <div class="modal-label">可见性：</div>
        <a-select default-value="lucy" style="width: 100%;" v-model="publish">
          <a-select-option :value="1">
            公开
          </a-select-option>
          <a-select-option :value="2">
            不公开
          </a-select-option>
        </a-select>
      </div>
      <div class="modal-foot">
        <a-button style="margin-right: 8px" @click="handleCanle">取消</a-button>
        <a-button type="primary" @click="handlOk">
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import canvasUtil from "@/utils/canvasutils";

enum selectType {
  pen,
  rect,
  line,
  cire,
  clear
}

@Component
export default class Graffiti extends Vue {
  @Prop() private src!: string;
  @Prop({ default: 0 }) private selectType!: number;
  @Prop() private selectColor!: string;
  @Prop() private current!: object;

  @Watch("current") onCurrentChange(value: any) {
    this.reset();
    const { selectType, canvas: obj, content, top, left } = value;
    console.log(selectType, obj, content);
    switch (selectType) {
      case 0:
        this.canvasUtils.drawPen(obj);
        break;
      case 1:
        this.canvasUtils.drawRect(obj);
        break;
      case 2:
        this.canvasUtils.drawLine(obj);
        break;
      case 3:
        this.canvasUtils.drawCire(obj);
        break;
    }
    Object.assign(this, { ...content, isShow: true, end_draw_x: left, end_draw_y: top });
  }

  private imageW: number = 0;
  private imageH: number = 0;
  private canvas: any = null;
  private canvasUtils: any = null;
  private start_draw_x: number = 0;
  private start_draw_y: number = 0;
  private end_draw_x: number = 0;
  private end_draw_y: number = 0;
  private isStart: boolean = false;
  private isShow: boolean = false;
  private user: any = null;
  private content: any = null;
  private publish: any = null;

  public $refs!: {
    canvas: HTMLCanvasElement;
    img: HTMLImageElement;
  };

  private mounted() {
    this.setImageWH();
  }

  private setImageWH() {
    const image = this.$refs.img;
    const { width, height } = image;
    this.imageW = width;
    this.imageH = height;
    this.initCanvasWH();
  }

  private initCanvasWH() {
    this.canvas = this.$refs.canvas;
    this.canvas.width = this.imageW;
    this.canvas.height = this.imageH;
    this.canvasUtils = new canvasUtil(this.canvas);
  }

  private getLocation(x: number, y: number) {
    let canvas = this.canvas;
    var bbox = canvas.getBoundingClientRect();
    return {
      x: (x - bbox.left) * (canvas.width / bbox.width),
      y: (y - bbox.top) * (canvas.height / bbox.height)
    };
  }

  private handlOk() {
    let obj = {};
    const {
      end_draw_x: drawX,
      end_draw_y: drawY,
      user,
      content,
      publish,
      selectType
    } = this;
    switch (this.selectType) {
      case 0:
        obj = {
          x: this.start_draw_x,
          y: this.start_draw_y,
          ex: drawX,
          ey: drawY,
          color: this.selectColor,
          type: "m_up"
        };
        break;
      case 1:
        obj = {
          x: this.start_draw_x,
          y: this.start_draw_y,
          w: drawX - this.start_draw_x,
          h: drawY - this.start_draw_y,
          color: this.selectColor,
          type: "m_up"
        };
        break;
      case 2:
        obj = {
          x: this.start_draw_x,
          y: this.start_draw_y,
          ex: drawX,
          ey: drawY,
          color: this.selectColor,
          type: "m_up"
        };
        break;
      case 3:
        let x = this.start_draw_x + (drawX - this.start_draw_x) / 2;
        let y = this.start_draw_y + (drawY - this.start_draw_y) / 2;
        let r = (drawY - this.start_draw_y) / 2;
        obj = {
          x,
          y,
          color: this.selectColor,
          r
        };
        break;
    }
    const params = {
      canvas: obj,
      content: {
        user,
        content,
        publish
      },
      selectType,
      top: drawY,
      left: drawX,
    };
    this.$emit("onAdd", params);
    this.reset();
  }
  private handleCanle() {
    this.reset();
  }
  private reset() {
    Object.assign(this, {
      isShow: false,
      start_draw_x: 0,
      start_draw_y: 0,
      end_draw_x: 0,
      end_draw_y: 0,
      user: null,
      content: null,
      publish: null,
    });
    this.canvasUtils.clearCanvas();
  }

  private mouseDownEvent($event: any) {
    if (this.isShow) {
      return;
    }
    let drawX = $event.clientX;
    let drawY = $event.clientY;
    this.isStart = true;
    this.canvasUtils.saveCanvasData();
    let location = this.getLocation(drawX, drawY);
    drawX = location.x;
    drawY = location.y;
    this.start_draw_x = drawX;
    this.start_draw_y = drawY;
  }

  private mouseUpEvent($event: any) {
    if (this.isShow) {
      return;
    }
    let drawX = $event.clientX;
    let drawY = $event.clientY;
    let location = this.getLocation(drawX, drawY);
    drawX = location.x;
    drawY = location.y;
    this.end_draw_x = drawX;
    this.end_draw_y = drawY;
    this.isStart = false;
    this.isShow = true;
    let obj: any = {};
    switch (this.selectType) {
      case 0:
        obj = {
          x: this.start_draw_x,
          y: this.start_draw_y,
          ex: drawX,
          ey: drawY,
          color: this.selectColor,
          type: "m_up"
        };
        this.canvasUtils.drawPen(obj);
        break;
      case 1:
        obj = {
          x: this.start_draw_x,
          y: this.start_draw_y,
          w: drawX - this.start_draw_x,
          h: drawY - this.start_draw_y,
          color: this.selectColor,
          type: "m_up"
        };
        this.canvasUtils.drawRect(obj);
        break;
      case 2:
        obj = {
          x: this.start_draw_x,
          y: this.start_draw_y,
          ex: drawX,
          ey: drawY,
          color: this.selectColor,
          type: "m_up"
        };
        this.canvasUtils.drawLine(obj);
        break;
      case 3:
        let x = this.start_draw_x + (drawX - this.start_draw_x) / 2;
        let y = this.start_draw_y + (drawY - this.start_draw_y) / 2;
        let r = (drawY - this.start_draw_y) / 2;
        obj = {
          x,
          y,
          color: this.selectColor,
          r
        };
        this.canvasUtils.drawCire(obj);
        break;
      case 4:
        obj = {
          ex: drawX,
          ey: drawY,
          color: this.selectColor,
          type: "m_up"
        };
        this.canvasUtils.clear(obj);
        this.start_draw_x = drawX;
        this.start_draw_y = drawY;
        break;
    }
  }

  private mouseMoveEvent($event: any) {
    if (this.isShow) {
      return;
    }
    if (!this.isStart) {
      return false;
    }
    let drawX = $event.clientX;
    let drawY = $event.clientY;
    let location = this.getLocation(drawX, drawY);
    drawX = location.x;
    drawY = location.y;
    this.end_draw_x = drawX;
    this.end_draw_y = drawY;
    let obj: any = {};
    switch (this.selectType) {
      case 0:
        obj = {
          x: this.start_draw_x,
          y: this.start_draw_y,
          ex: drawX,
          ey: drawY,
          color: this.selectColor,
          type: "m_move"
        };
        this.canvasUtils.drawPen(obj);
        this.start_draw_x = drawX;
        this.start_draw_y = drawY;
        break;
      case 1:
        obj = {
          x: this.start_draw_x,
          y: this.start_draw_y,
          w: drawX - this.start_draw_x,
          h: drawY - this.start_draw_y,
          color: this.selectColor,
          type: "m_move"
        };
        this.canvasUtils.drawRect(obj);
        break;
      case 2:
        obj = {
          x: this.start_draw_x,
          y: this.start_draw_y,
          ex: drawX,
          ey: drawY,
          color: this.selectColor,
          type: "m_move"
        };
        this.canvasUtils.drawLine(obj);
        break;
      case 3:
        let x = this.start_draw_x + (drawX - this.start_draw_x) / 2;
        let y = this.start_draw_y + (drawY - this.start_draw_y) / 2;
        let r = (drawY - this.start_draw_y) / 2;
        obj = {
          x,
          y,
          color: this.selectColor,
          r
        };
        this.canvasUtils.drawCire(obj);
        break;
      case 4:
        obj = {
          ex: drawX,
          ey: drawY,
          color: this.selectColor,
          type: "m_move"
        };
        this.canvasUtils.clear(obj);
        this.start_draw_x = drawX;
        this.start_draw_y = drawY;
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
.graffiti-warp {
  width: 800px;
  position: relative;
  img {
    width: 100%;
  }
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .modal {
    position: absolute;
    width: 350px;
    height: 300px;
    background-color: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(26, 31, 50, 0.65);
    z-index: 2;
    padding: 16px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    .modal-label {
      padding: 3px 0;
    }
    .modal-content {
      height: 100%;
    }
    .modal-foot {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
