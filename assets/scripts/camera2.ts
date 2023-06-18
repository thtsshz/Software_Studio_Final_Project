// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    cnt=0;
    finish=0;
    start () {
        
    }

    update (dt) {
        if(this.getComponent(cc.Camera).zoomRatio>2)  
            this.getComponent(cc.Camera).zoomRatio-=0.04;
        else{
            if(this.cnt==0){
                let action=cc.sequence(cc.moveBy(1,-395,-190).easing(cc.easeCircleActionOut()),cc.moveBy(1,905,365).easing(cc.easeCircleActionOut()),cc.moveBy(1,-510,-175).easing(cc.easeCircleActionOut()));
                this.node.runAction(action);
                this.cnt++;
                this.scheduleOnce(function(){
                    this.finish=1;
                },2);
            }
        }
        if(this.finish){
            this.getComponent(cc.Camera).zoomRatio=Math.max(this.getComponent(cc.Camera).zoomRatio-0.01,1);
            if(this.getComponent(cc.Camera).zoomRatio<=1)
                this.finish=0;
        
        }
    }
}
