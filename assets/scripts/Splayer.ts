// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Splayer extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    left_move:boolean=false;
    right_move:boolean=false;
    jump:boolean=false;
    on_ground:boolean=false;

    playerSpeed:number=0;

    private anim=null;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;   
    }
    start () {

    }
    onBeginContact(contact,self,other){
        if(other.node.group=='Ground')
            this.on_ground=true;
    }
    update (dt) {
        this.playerSpeed=0;
        if(this.left_move) {
            this.playerSpeed=-400;
            this.node.scaleX=-0.1;  // modify node's X scale value to change facing direction
        } 
        else if(this.right_move) {
            this.playerSpeed=400;
            this.node.scaleX=0.1;  
        }
        if(this.jump){
            this.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,650);
            this.jump=false;
        }
        this.node.x += this.playerSpeed *dt; 
    }
}
