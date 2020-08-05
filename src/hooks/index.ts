import vue from "vue";
import Component from "vue-class-component";

Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate",
]);

@Component
export default class Hooks extends vue {
  private beforeRouteEnter(to: any, from: any, next: any) {
    // ...
    next();
  }

  private beforeRouteLeave(to: any, from: any, next: any) {
    // ...
    next();
  }

  private beforeRouteUodate(to: any, from: any, next: any) {
    next();
  }
}
