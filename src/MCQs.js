import { _, createjs } from '../processingModules/';
import { TimelineMax } from "gsap/TimelineMax";
import { SCREEN, MCQ } from './constants';
import { allFSes } from './allFSes';

const { MENUWIDTH, MENUHEIGHT } = MCQ;

export default class MCQs {
  constructor({ screenContainer, filesArr = 'no any files' }) {
    _.bindAll(this, [ 'showMenus' ]);
    this.screenContainer = screenContainer;
    this.screen = screen;
    this.filesArr = filesArr;
    this.menuCards = [];
    this.menuDisplayed = false;
    this.createInitialShapes();
    this.createAllMenus();
    window.display = this;
  }

  createInitialShapes() {
    const menuBar = new createjs.Container();
    menuBar.setBounds(0, 0, MENUWIDTH, MENUHEIGHT);
    menuBar.x = (SCREEN.width / 2) - (MENUWIDTH / 2);
    menuBar.y = 100;
    this.screenContainer.addChild(menuBar);
    this.menuBar = menuBar;

    const rect = new createjs.Shape();
    rect.graphics.setStrokeStyle(1).beginStroke('red').beginFill("#b99e9e").drawRect(0, 0, MENUWIDTH, MENUHEIGHT);
    menuBar.addChild(rect);
    this.rect = rect;

    // creating triangular shape
    const triang = new createjs.Shape();
    triang.graphics.setStrokeStyle(1).beginFill('#fff').beginStroke('red')
      .moveTo(0, 0).lineTo(20, 0).lineTo(10, 20).lineTo(0, 0);
    triang.x = 170;
    triang.y = 15;
    triang.setBounds(0, 0, 20, 20);
    menuBar.addChild(triang);
    this.triangle = triang;
    rect.cursor = 'pointer';
    rect.addEventListener('click', this.showMenus);
  }

  createAllMenus() {
    this.menuCardsContainer = new createjs.Container();
    this.menuBar.addChild(this.menuCardsContainer);
    this.menuCardsContainer.setBounds(0, 0, MENUWIDTH, 200);
    this.menuCardsContainer.y = MENUHEIGHT;
    this.menuCardsContainer.alpha = 0;
    _.forEach(this.filesArr, (name, i) => {
      const container = new createjs.Container();
      container.y = MENUHEIGHT * i;
      this.menuCardsContainer.addChild(container);

      const rect = new createjs.Shape();
      rect.graphics.setStrokeStyle(1).beginStroke('red').beginFill("#b99e9e").drawRect(0, 0, MENUWIDTH, MENUHEIGHT);
      container.rect = rect;
      container.addChild(rect);

      var text = new createjs.Text(name, "20px Arial", "#e6e1e1");
      text.textBaseline = "middle";
      text.textAlign = "center";
      text.x = MENUWIDTH / 2;
      text.y = MENUHEIGHT / 2;
      container.addChild(text);
      container.fileName = name;

      container.cursor = 'pointer';
      container.addEventListener('click', () => {
        this.screenContainer.removeChild(this.menuBar);
        const obj = new allFSes[name]({ screenContainer: this.screenContainer });
      });

      this.menuCards.push(container);
    });
  }

  showMenus(event) {
    this.enable = false;
    const tl = new TimelineMax({ onComplete: () => { this.enable = true; } });
    let alpha = 1;
    let scaleY = -1;
    let y = this.triangle.y + this.triangle.getBounds().height;
    if (this.menuDisplayed) {
      alpha = 0;
      scaleY = 1;
      y = this.triangle.y - this.triangle.getBounds().height;
    }
    tl.to(this.menuCardsContainer, 0.2, { alpha }, '0');
    tl.to(this.triangle, 0.2, { scaleY, y }, '0');
    this.menuDisplayed = !this.menuDisplayed;
  }

  set enable(flag) {
    this.menuBar.set({ mouseEnabled: flag, mouseChildren: flag })
  }

}
