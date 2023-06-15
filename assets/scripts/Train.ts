// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Train extends cc.Component {

    _waitDuration : number = 0.5;

    private _nextMoveTime = 0;

    onLoad () {}

    start () {
        this.node.setPosition(-2340, -415);
        this._nextMoveTime = cc.director.getTotalTime() / 1000.0;
    }

    update (dt) {
        if(this.node.position.x >= 2430) {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            this.node.setPosition(-2340, -415);
        }
        else {
            let currentTime = cc.director.getTotalTime() / 1000.0;

            if(currentTime >= this._nextMoveTime) {
                this._nextMoveTime = currentTime + this._waitDuration;
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(800,0);
                this._waitDuration = 15 + Math.random()*10;
            }
        }
    }
}
