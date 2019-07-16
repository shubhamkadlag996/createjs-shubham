import { _, createjs } from '../processingModules/';
import { TweenMax } from "gsap/TweenMax";
import { SCREEN } from './constants';

export default class FireWorks {
  constructor({ screenContainer }) {
    _.bindAll(this, [ 'showMenus' ]);
    this.screenContainer = screenContainer;
    this.screen = screen;
    this.createInitialShapes();
  }

  createInitialShapes() {
    const menuBar = new createjs.Container();
    menuBar.setBounds(0, 0, 200, 50);
    menuBar.x = (SCREEN.width / 2) - 100;
    menuBar.y = 100;
    this.screenContainer.addChild(menuBar);
    this.menuBar = menuBar;

    const rect = new createjs.Shape();
    rect.graphics.beginFill("#b99e9e").drawRect(0, 0, 200, 50);
    menuBar.addChild(rect);
    this.rect = rect;

    // creating triangular shape
    const triang = new createjs.Shape();
    triang.graphics.setStrokeStyle(1).beginFill('#fff').beginStroke('red')
      .moveTo(0, 0).lineTo(20, 0).lineTo(10, 20).lineTo(0, 0);
    triang.x = 170;
    triang.y = 15;
    menuBar.addChild(triang);
    this.triangle = triang;
    menuBar.cursor = 'pointer';
    menuBar.addEventListener('click', this.showMenus);
  }

  showMenus(event) {
    console.log(event.target);
  }

}
