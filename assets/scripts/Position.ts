// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Position extends cc.Component {

    initX: number;
    initY: number;

    onLoad () {
        this.initX = this.node.position.x;
        this.initY = this.node.position.y;
    }

    start () {

    }

    update (dt) {
        this.node.setPosition(this.initX, this.initY);
    }
}
