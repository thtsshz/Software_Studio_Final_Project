// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class FloatingGround extends cc.Component {

    @property(cc.Node)
    FloatingGround : cc.Node = null;

    Touched: boolean = false;
    initPosX = 0;
    initPosY = 0;
    GinitPosX = 0;
    GinitPosY = 0;
    actionSeq

    onLoad () {

    }

    start () {
        this.initPosX = this.node.position.x;
        this.initPosY = this.node.position.y;
        this.GinitPosX = this.FloatingGround.position.x;
        this.GinitPosY = this.FloatingGround.position.y;
        this.actionSeq = cc.sequence(cc.moveBy(0.05, 5, 0), cc.moveBy(0.1, -10,0), cc.moveBy(0.05, 5, 0)).repeat(7);
    }

    update (dt) {
        //console.log(this.node.position.x, this.node.position.y);
    }

    onBeginContact(contact, self, other) {
        
        if(!this.Touched) {
            let waitTime = Math.random() * 3;
            this.Touched = true;
            this.scheduleOnce(() => {
                this.FloatingGround.runAction(this.actionSeq);
            }, waitTime+0.6)
            
            this.scheduleOnce(() => {
                this.Touched = false;
                this.node.setPosition(0, 3000);
                this.FloatingGround.setPosition(0, 3300);
            }, waitTime+2);

            this.scheduleOnce(() => {
                this.FloatingGround.setPosition(this.GinitPosX, this.GinitPosY);
                this.node.setPosition(this.initPosX, this.initPosY);
                
                this.actionSeq = cc.sequence(cc.moveBy(0.05, 5, 0), cc.moveBy(0.1, -10,0), cc.moveBy(0.05, 5, 0)).repeat(7);
            }, waitTime * 2 + 5);
        }
    }
}
