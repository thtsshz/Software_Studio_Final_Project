// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
declare const firebase : any;
@ccclass
export default class CplayerFast extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    left_move:boolean=false;
    right_move:boolean=false;
    jump:boolean=false;
    on_ground:boolean=false;

    playerSpeed:number=0;

    private anim=null;
    private roomnumber : number = 0;
    private gametime : number = 0;
    private nextupdatetime : number = 0;

    private serverdata;

    role: number = 0;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);    
        this.anim=this.getComponent(cc.Animation);

        var nowdata = {
            userID: '1',
            roomID: 0,
            action: {
                left_move: false,
                right_move: false,
                on_ground: false,
                jump: false,
                attack: false
            }
        };
        const request = fetch('http://192.168.50.62:8080/action', {
            method: "POST",
            body: JSON.stringify(nowdata),
        }).then(res => {
            console.log("", res)
            return res.json()
        }).catch(err => {
            console.log("multiplayer manager error : ", err);
        }).then(data => {
            console.log("multiplayer manager receive data");
            this.serverdata = data;
        })
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
        if(this.gametime > this.nextupdatetime)this.nextupdatetime += 0.033;
        else return ;
        const promise = new Promise((res, rej) => {
            this.updatefromserver(dt);
            var tmp = 0;
            res(tmp);
        });
        promise.then(() => {
            this.playerupdate(dt);
        }).catch((err) => {
            console.log('eee', err);
        });
        // this.updatefromserver(dt);
        // this.playerupdate(dt);
    }

    updatefromserver(dt : number){
        
        var tmp = {
            roomID: 0
        }

        const request = fetch('http://192.168.50.62:8080/getstatuses', {
            method: "POST",
            body: JSON.stringify(tmp),
        }).then(res => {
            return res.json()
        }).catch(err => {
            console.log("multiplayer manager error : ", err);
        }).then(data => {
            // console.log("multiplayer manager receive data");
            // console.log(data);
            if(this.node.name == "player1"){
                
                this.node.x = data.players["1"].x;
                this.node.y = data.players["1"].y;
                // var nx = this.node.getComponent(cc.RigidBody).linearVelocity.x;
                // var ny = this.node.getComponent(cc.RigidBody).linearVelocity.y;
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(data.players["1"].vx, data.players["1"].vy);
                console.log("p1 update success");

            }else if(this.node.name == "player2"){

                this.node.x = data.players["2"].x;
                this.node.y = data.players["2"].y;
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(data.players["2"].vx, data.players["2"].vy);
                console.log("p2 update success");

            }

        })
    }
    playerupdate(dt : number){
        // console.log("playerupdate");
        this.playerSpeed=0;
        if(this.left_move) {
            this.playerSpeed=-400;
            this.node.scaleX=-0.1;  // modify node's X scale value to change facing direction
            // if(this.node.name=='player1'){
            //     if(!this.anim.getAnimationState('player_1_walk').isPlaying){
            //         this.anim.play("player_1_walk");
            //     }
            // }
            // else{
            //     if(!this.anim.getAnimationState('weasly_walk').isPlaying){
            //         this.anim.play("weasly_walk");
            //     } 
            // }
        } 
        else if(this.right_move) {
            this.playerSpeed=400;
            this.node.scaleX=0.1;  
            // if(this.node.name=='player1'){
            //     if(!this.anim.getAnimationState('player_1_walk').isPlaying){
            //         this.anim.play("player_1_walk");
            //     }
            // }
            // else{
            //     if(!this.anim.getAnimationState('weasly_walk').isPlaying){
            //         this.anim.play("weasly_walk");
            //     } 
            // }
        }
        if(this.jump){
            console.log("jump!");
            this.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,650);
            // this.jump=false;
        }
        this.node.x += this.playerSpeed *dt; 

        const promise = new Promise((res, rej) => {
            var nowdata = {
                userID: '1',
                roomID: 0,
                action: {
                    left_move: this.left_move,
                    right_move: this.right_move,
                    on_ground: this.on_ground,
                    jump: this.jump,
                    attack: false
                }
            };
            if(this.role == 1 && this.node.name == "player1"){
                nowdata.userID = '1';
                console.log("1");
            }
            if(this.role == 2 && this.node.name == "player2"){
                nowdata.userID = '2';
                console.log("2");
            }
            res(nowdata);
        });
        promise.then((data) => {
            const request = fetch('http://192.168.50.62:8080/action', {
                method: "POST",
                body: JSON.stringify(data),
            }).then(res => {
                // console.log("", res)
                return res.json()
            }).catch(err => {
                console.log("multiplayer manager error : ", err);
            }).then(data => {
                // console.log("multiplayer manager receive data");
                this.serverdata = data;
            })
            this.jump = false;
        });

        
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