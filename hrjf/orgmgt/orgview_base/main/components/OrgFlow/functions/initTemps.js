import drawPoint from './drawPoint';

export default function initTemps(){
    this.tempData.forEach(item=>drawPoint.call(this,item));    
}
