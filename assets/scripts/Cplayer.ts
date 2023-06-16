// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
declare const firebase : any;
@ccclass
export default class Cplayer extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    left_move:boolean=false;
    right_move:boolean=false;
    jump:boolean=false;
    on_ground:boolean=false;

    playerSpeed:number=0;

    private anim=null;
    private roomnumber : number = 9487;
    private gametime : number = 0;
    private nextupdatetime : number = 0;

    role: number = 0;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);    
        this.anim=this.getComponent(cc.Animation);
    }
    onKeyDown(event) {
        if(this.node.name=='player1'){
            if(event.keyCode == cc.macro.KEY.up&&this.on_ground==true){//jump
                this.jump=true;
                this.on_ground=false;
            }
            else if(event.keyCode==cc.macro.KEY.left){//left
                this.right_move=false;
                this.left_move=true;
            }
            else if(event.keyCode==cc.macro.KEY.right){//right
                this.right_move=true;
                this.left_move=false;
            }
        }
        else{
            if(event.keyCode == cc.macro.KEY.w&&this.on_ground==true){//w jump
                this.jump=true;
                this.on_ground=false;
            }
            else if(event.keyCode==cc.macro.KEY.a){//left
                this.right_move=false;
                this.left_move=true;
            }
            else if(event.keyCode==cc.macro.KEY.d){//right
                this.right_move=true;
                this.left_move=false;
            }
        }
        
    }
    onKeyUp(event){
        if(this.node.name=='player1'){
            if(event.keyCode == cc.macro.KEY.up){//jump
                this.jump=false;
            }
            else if(event.keyCode==cc.macro.KEY.left){//left
                this.left_move=false;
                this.anim.stop("player_1_walk");
            }
            else if(event.keyCode==cc.macro.KEY.right){//right
                this.right_move=false;
                this.anim.stop("player_1_walk");
            }
        }
        else{
            if(event.keyCode == cc.macro.KEY.w){//w jump
                this.jump=false;
            }
            else if(event.keyCode==cc.macro.KEY.a){//left
                this.left_move=false;
                this.anim.stop("weasly_walk");
            }
            else if(event.keyCode==cc.macro.KEY.d){//right
                this.right_move=false;
                this.anim.stop("weasly_walk");
            }
        }
        
        
    }
    start () {

    }
    onBeginContact(contact,self,other){
        if(other.node.group=='Ground')
            this.on_ground=true;
    }
    update (dt) {
        this.gametime += dt;
        const promise = new Promise((res, rej) => {
            this.updatefromserver(dt);
            var tmp = 0;
            res(tmp);
        });
        promise.then(() => {
            this.playerupdate(dt);
        });
        // this.updatefromserver(dt);
        // this.playerupdate(dt);
    }
    updatefromserver(dt : number){
        // if(this.gametime < this.nextupdatetime)return ;
        // else this.nextupdatetime += 0.2;
        const promise = new Promise((res, rej) => {
            firebase.database().ref("rooms/"+ this.roomnumber + "/serverinput").on('value', (data, prevchildkey) => {
                var tmp = data.val();
                res(tmp);
            });
        });
        promise.then((data : doublecoord) => {
            // console.log("cc: ",data);
            if(this.node.name == "player1"){
                this.node.x = data.player1.x;
                this.node.y = data.player1.y;
                // this.node.getComponent(cc.RigidBody).linearVelocity.x = data.player1.vx;
                // this.node.getComponent(cc.RigidBody).linearVelocity.y = data.player1.vy;
            }else if(this.node.name == "player2"){
                this.node.x = data.player2.x;
                this.node.y = data.player2.y;
                // this.node.getComponent(cc.RigidBody).linearVelocity.x = data.player2.vx;
                // this.node.getComponent(cc.RigidBody).linearVelocity.y = data.player2.vy;
            }
        });
    }
    playerupdate(dt : number){
        this.playerSpeed=0;
        if(this.left_move) {
            this.playerSpeed=-400;
            this.node.scaleX=-0.1;  // modify node's X scale value to change facing direction
            if(this.node.name=='player1'){
                if(!this.anim.getAnimationState('player_1_walk').isPlaying){
                    this.anim.play("player_1_walk");
                }
            }
            else{
                if(!this.anim.getAnimationState('weasly_walk').isPlaying){
                    this.anim.play("weasly_walk");
                } 
            }
        } 
        else if(this.right_move) {
            this.playerSpeed=400;
            this.node.scaleX=0.1;  
            if(this.node.name=='player1'){
                if(!this.anim.getAnimationState('player_1_walk').isPlaying){
                    this.anim.play("player_1_walk");
                }
            }
            else{
                if(!this.anim.getAnimationState('weasly_walk').isPlaying){
                    this.anim.play("weasly_walk");
                } 
            }
        }
        if(this.jump){
            this.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,650);
            // this.jump=false;
        }
        this.node.x += this.playerSpeed *dt; 

        if(this.role == 1 && this.node.name == "player1"){
            var nowdata1 : playerdt = {
                left_move : this.left_move,
                right_move : this.right_move,
                jump : this.jump,
                on_ground : this.on_ground
            };
            // console.log("player1 : ", nowdata1);
            console.log("1");
            firebase.database().ref("rooms/" + this.roomnumber + "/clientinput/player1").set(nowdata1);
        }
        if(this.role == 2 && this.node.name == "player2"){
            var nowdata2 : playerdt = {
                left_move : this.left_move,
                right_move :  this.right_move,
                jump : this.jump,
                on_ground : this.on_ground
            };
            // console.log("player2 : ", nowdata2);
            console.log("2");
            firebase.database().ref("rooms/" + this.roomnumber + "/clientinput/player2").set(nowdata2);
        }
        this.jump = false;
    }
}


class playerdt {
    left_move : boolean = false;
    right_move : boolean = false;
    jump : boolean = false;
    on_ground : boolean = false;
}

class coord {
    x : number = null;
    y : number = null;
    // vx : number = null;
    // vy : number = null;
}
class doublecoord {
    player1 : coord = null;
    player2 : coord = null;
}