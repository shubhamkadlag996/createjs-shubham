import axios from 'axios';
import { _, createjs } from '../processingModules';
import MCQs from './MCQs';
import ClockHandler from './allFSes/ClockHandler';

const stage = new createjs.Stage('myCanvas');
createjs.Ticker.on('tick', () => {
  stage.update();
});
const screenContainer = new createjs.Container();
stage.addChild(screenContainer);
stage.enableMouseOver(); // to use cursor propertise

let filesArr;
// -------------------fetching server data--------------------------
axios.get('http://localhost:3000/api/', {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((response) => {
    filesArr = response.data;
    _.remove(filesArr, name => name === 'index');
    const mcq = new ClockHandler({ screenContainer, filesArr });
  })
  .catch((error) => {
    console.log(error);
  });
//-------------------------------------------------------------------------------------------
