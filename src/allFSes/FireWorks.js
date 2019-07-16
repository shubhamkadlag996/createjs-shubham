import { _, createjs } from '../../processingModules/';
import { TweenMax } from "gsap/TweenMax";
import { SCREEN } from '../constants';

export default class FireWorks {
  constructor({ screenContainer }) {
    _.bindAll(this, [ 'fireOnIt' ]);
    this.screenContainer = screenContainer;
    this.screen = screen;
    this.counter = 0;
    this.maxCount = 5;
    this.createInitialBall();
  }

  createInitialBall() {
    const fire = new createjs.Shape();
    fire.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 20);
    fire.x = SCREEN.width / 2;
    fire.y = SCREEN.height / 2;
    this.screenContainer.addChild(fire);
    fire.cursor = 'pointer';
    this.fire = fire;
    fire.addEventListener('click', this.fireOnIt);
  }

  fireOnIt(e) {
    this.fire.set({ mouseEnabled: false, mouseChildren: false });
    this.fireIt(e);
    const id = setInterval(() => {
      this.counter++;
      this.fireIt(e);
      if (this.counter === this.maxCount) {
        clearInterval(id);
      }
    }, 600);
  }

  fireIt(event) {
    for (let i = 0; i < 500; i++) {
      // const shape = event.target.clone();
      const shape = new createjs.Shape();
      shape.graphics.beginFill("DeepSkyBlue").drawRect(0, 0, 10, 2);
      shape.x = event.target.x;
      shape.y = event.target.y;
      const x = _.random(0, screen.width);
      const y = _.random(0, screen.height);
      shape.rotation = this.findAngle(shape.x, shape.y, x, y);
      this.screenContainer.addChild(shape);
      TweenMax.to(shape, 0.8, {
        x,
        y,
        onComplete: () => {
          this.screenContainer.removeChild(shape);
          if (this.counter === this.maxCount) {
            this.counter = 0;
            this.fire.set({ mouseEnabled: true, mouseChildren: true });
          }
        },
      });
    }
  }

  findAngle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    return theta;
  }

}
