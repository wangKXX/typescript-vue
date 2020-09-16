export default class BlackborderService {
  private ctx!: any;
  private canvasData!: any;
  private pattrenArr: Array<object> = [];
  private canvas!: any;

  constructor(canvas: any) {
    this.canvas = canvas;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext("2d");
  }

  // 设置放大缩小
  public setTransform(scale: number, imageW: number, imageH: number): void {
    this.ctx.setTransform(
      scale,
      0,
      0,
      scale,
      (imageW - imageW * scale) / 2,
      (imageH - imageH * scale) / 2,
    );
  }

  // 清除canvas数据
  public clearCanvas(): void {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }
  // 保存canvas数据
  public saveCanvasData(): void {
    this.canvasData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  // 判断鼠标是否在图像上
  public isInPattren(x: number, y: number, sx: number, sy: number): void {
    this.pattrenArr.map((val, index) => {
      let retData: any = {};
      retData = val;
      let ret = retData.isPointInPath(x, y)
      if (ret) {
        const drow_obj = retData.drow_obj
        let obj = {
          x: drow_obj.x + (x - sx),
          y: drow_obj.y + (y - sy),
          w: drow_obj.w,
          h: drow_obj.h,
          type: 'm_clear',
        }
        this.drawRect(obj);
      }
    })
  }

  // 渲染canvas数据
  public drawCanvas(): void {
    if (this.canvasData) {
      this.ctx.putImageData(this.canvasData, 0, 0, 0, 0, this.canvas.width, this.canvas.height);
    }
  }

  // 矩形
  public drawRect(obj: any): void {
    this.drawCanvas();
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(obj.x, obj.y, obj.w, obj.h);
    this.ctx.closePath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = obj.color;
    this.ctx.stroke();
    this.ctx.restore();
    if (obj.type === 'm_up' || obj.type === 'm_clear') {
      this.ctx.drow_obj = obj;
      this.pattrenArr.push(this.ctx);
    }
  }

  // 铅笔
  public drawPen(obj: any): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(+obj.x + 0.5, +obj.y + 0.5);
    this.ctx.lineTo(+obj.ex + 0.5, +obj.ey + 0.5);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = obj.color;
    this.ctx.stroke();
    this.ctx.restore();
  }

  // 直线
  public drawLine(obj: any): void {
    this.drawCanvas();
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(+obj.x + 0.5, +obj.y + 0.5);
    this.ctx.lineTo(+obj.ex + 0.5, +obj.ey + 0.5);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = obj.color;
    this.ctx.stroke();
    this.ctx.restore();
  }

  // 圆
  public drawCire(obj: any): void {
    this.drawCanvas();
    this.ctx.save();
    this.ctx.beginPath();
    let r = Math.abs(obj.r);
    this.ctx.arc(obj.x, obj.y, r, 0, 2 * Math.PI);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = obj.color;
    this.ctx.stroke();
    this.ctx.restore();
  }

  // 橡皮
  public clear(obj: any): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(obj.ex, obj.ey, 20, 20);
    this.ctx.stroke();
    this.ctx.restore();
  }

  // 清屏
  public clearAll(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // 文字
  public drawTxt(obj: any): void {
    this.drawCanvas();
    this.ctx.fillStyle = obj.color;
    this.ctx.font = "40px serif";
    this.ctx.fillText(obj.txt, obj.x, obj.y);
  }
}
