import { _, createjs } from '../processingModules/';
import FireWorks from './allFSes/FireWorks';
import MCQs from './MCQs';
import axios from 'axios';
let filesArr;
//-------------------fetching server data--------------------------
axios.get('http://localhost:3000/api/',{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
    })
    .then((response)=>{
      console.log(response.data);
      filesArr = response.data;
    })
    .catch((error) => {
        console.log(error);
    });
//-------------------------------------------------------------------------------------------
createjs.Ticker.on("tick", () => {
  stage.update();
});
const stage = new createjs.Stage("myCanvas");
const screenContainer = new createjs.Container();
stage.addChild(screenContainer);
stage.enableMouseOver(); // to use cursor propertise

const mcq = new MCQs({ screenContainer, filesArr });
