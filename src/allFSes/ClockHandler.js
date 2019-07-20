import { TweenMax } from 'gsap/TweenMax';
import { _, createjs } from '../../processingModules';
import { SCREEN } from '../constants';

const DIGITALCLOCK = {
  width: 120,
  height: 50,
};
const ANALOGCLOCK = {
  width: 250,
  height: 250,
};
const CLOCKHOURS = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'];

export default class ClockHandler {
  constructor({ screenContainer }) {
    this.screenContainer = screenContainer;
    this.currentClockIndex = 0;
    this.createDigitalClock();
    this.createAnalogClock();
    this.addEvents();
  }

  createDigitalClock() {
    const digitalContainer = new createjs.Container();
    digitalContainer.x = (SCREEN.width / 2) - (DIGITALCLOCK.width / 2);
    digitalContainer.y = 400;
    digitalContainer.setBounds(0, 0, DIGITALCLOCK.width, DIGITALCLOCK.height);
    this.screenContainer.addChild(digitalContainer);

    const shape = new createjs.Shape();
    shape.graphics.beginStroke('blue').drawRect(0, 0, DIGITALCLOCK.width, DIGITALCLOCK.height);
    digitalContainer.addChild(shape);

    const text = new createjs.Text(CLOCKHOURS[this.currentClockIndex], '40px Arial', '#000');
    text.textBaseline = 'middle';
    text.textAlign = 'center';
    text.x = (DIGITALCLOCK.width / 2);
    text.y = (DIGITALCLOCK.height / 2);
    digitalContainer.addChild(text);

    this.clockValue = text;

    const createTriangle = () => {
      const triang = new createjs.Shape();
      triang.graphics.setStrokeStyle(1).beginFill('red').beginStroke('red')
        .moveTo(0, 0)
        .lineTo(20, 0)
        .lineTo(10, 20)
        .lineTo(0, 0);
      digitalContainer.addChild(triang);
      triang.cursor = 'pointer';
      return triang;
    };

    this.upTriangle = createTriangle();
    this.upTriangle.y = 5;
    this.upTriangle.x = 20;
    this.upTriangle.scaleY = -1;

    this.downTriangle = createTriangle();
    this.downTriangle.y = 40;
    this.downTriangle.x = 20;
  }

  createAnalogClock() {
    const analogContainer = new createjs.Container();
    analogContainer.x = (SCREEN.width / 2) - (ANALOGCLOCK.width / 2);
    analogContainer.y = 100;
    analogContainer.setBounds(0, 0, ANALOGCLOCK.width, ANALOGCLOCK.height);
    this.screenContainer.addChild(analogContainer);

    const outerShape = new createjs.Shape();
    outerShape.graphics.setStrokeStyle(2).beginStroke('black').drawCircle(0, 0, (ANALOGCLOCK.width / 2));
    outerShape.x = ANALOGCLOCK.width / 2;
    outerShape.y = ANALOGCLOCK.height / 2;
    analogContainer.addChild(outerShape);

    const centerOfClock = new createjs.Shape();
    centerOfClock.graphics.beginFill('black').drawCircle(0, 0, 2);
    centerOfClock.x = ANALOGCLOCK.width / 2;
    centerOfClock.y = ANALOGCLOCK.height / 2;
    analogContainer.addChild(centerOfClock);

    // adding numbers on clock

    const createText = (value) => {
      const text = new createjs.Text(value, '20px Arial', '#000');
      text.textBaseline = 'middle';
      text.textAlign = 'center';
      text.x = centerOfClock.x;
      text.y = centerOfClock.y;
      analogContainer.addChild(text);
      return text;
    };

    let currentAngle = -60;
    for (let i = 1; i <= 12; i++) {
      const angle = currentAngle * (Math.PI / 180);
      const text = createText(`${i}`);
      text.x += Math.cos(angle) * ((ANALOGCLOCK.width - 25) / 2);
      text.y += Math.sin(angle) * ((ANALOGCLOCK.width - 25) / 2);
      currentAngle += 30;
    }

    const createHands = (width, rotation) => {
      const hands = new createjs.Shape();
      hands.graphics.setStrokeStyle(2).beginStroke('black')
        .moveTo(0, 0)
        .lineTo(width, 0);
      hands.x = centerOfClock.x;
      hands.y = centerOfClock.y;
      hands.rotation = rotation;
      analogContainer.addChild(hands);
      return hands;
    };
    this.hrHand = createHands(80, -60);
    this.minHand = createHands(100, -90);
  }

  addEvents() {
    this.upTriangle.addEventListener('click', () => {
      this.hrHand.rotation += 30;
      this.currentClockIndex++;
      if (this.currentClockIndex === CLOCKHOURS.length) {
        this.currentClockIndex = 0;
      }
      this.updateClock();
    });
    this.downTriangle.addEventListener('click', () => {
      this.hrHand.rotation -= 30;
      this.currentClockIndex--;
      if (this.currentClockIndex < 0) {
        this.currentClockIndex = CLOCKHOURS.length - 1;
      }
      this.updateClock();
    });
  }

  updateClock() {
    this.clockValue.text = CLOCKHOURS[this.currentClockIndex];
  }
}
