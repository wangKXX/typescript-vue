namespace validation {
  export interface BaseValidation {
    test(s: string): boolean;
  }

  export enum validationEnum {
    image = "/^image/",
    video = "/^video/",
    audio = "/^audio/",
    startWithSpace = "/^\s/",
    hasSpace = "/\s+/",
    isEndWithSpace = "/\s$/"
  }

  export class ImageValidation implements BaseValidation {
    test(s: string) {
      return new RegExp(validationEnum.image).test(s);
    }
  }

  export class VideoValidation implements BaseValidation {
    test(s: string) {
      return new RegExp(validationEnum.video).test(s);
    }
  }

  export class SpaceValidation implements BaseValidation {
    test(s: string) {
      return new RegExp(validationEnum.startWithSpace).test(s);
    }

    hasSpace(s: string) {
      return new RegExp(validationEnum.hasSpace).test(s);
    }
  }
};