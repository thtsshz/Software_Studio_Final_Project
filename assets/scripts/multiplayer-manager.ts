import Splayer from "./Splayer";
import Cplayer from "./Cplayer"
import player from "./player";
const {ccclass, property} = cc._decorator;
declare const firebase : any;
class pp{
    player1 : playerdt = null;
    player2 : playerdt = null;
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
@ccclass
export default class multiplayer extends cc.Component {

    @property(Splayer)
    player1 : Splayer = null;
    @property(Splayer)
    player2 : Splayer = null;
    @property(Cplayer)
    Cplayer1 : Cplayer = null;
    @property(Cplayer)
    Cplayer2 : Cplayer = null;
    @property(cc.Camera)
    camera : cc.Camera = null;
    @property(cc.Integer)
    role : number = 0;

    private roomnumber : number = 0;
    
    private dbtest : boolean = false;

    onLoad (): void{
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
       
        // const promise = new Promise((RES, rej) => {
        //     var tmp;
        //     firebase.database().ref("rooms/"+ this.roomnumber + "getid").on('value', (data, prevchildkey) => {
        //         tmp = data.val();
        //         RES(tmp);
        //     });
        // });
        // promise.then((data) => {
        //     console.log("data: ", data);
        //     if(data == "0"){
        //         this.role = 1;
        //         this.Cplayer1.role = 1;
        //         this.Cplayer2.role = 1;
        //         firebase.database().ref("rooms/"+ this.roomnumber+ "getid").set("1");
        //     }else{
        //         this.role = 2;
        //         this.Cplayer1.role = 2;
        //         this.Cplayer2.role = 2;
        //     }
        // });
    }
    onKeyDown(event){
        if(event.keyCode == cc.macro.KEY.p){
            this.camera.node.x = 3000 - this.camera.node.x;
        }else if(event.keyCode == cc.macro.KEY.n){
            this.role = 1;
            this.Cplayer1.role = 1;
            this.Cplayer2.role = 1;
        }
        else if(event.keyCode == cc.macro.KEY.m){
            this.role = 2;
            this.Cplayer1.role = 2;
            this.Cplayer2.role = 2;
        }
    }
    onKeyUp(event){
        if(event.keyCode == cc.macro.KEY.t){
            this.dbtest = false;
        }
    }
    start () {

    }

    protected update (dt : number): void {
        // console.log("dbtest : ", this.dbtest);
        // if(this.dbtest) firebase.database().ref("test").set(1);
        // else firebase.database().ref("test").set(0);
        if(this.role == 1)this.serverupdate(dt);
        this.allupdate(dt);
        this.playerupdate(dt);
    }
    protected serverupdate(dt : number ): void{
        const promise = new Promise((res, rej) => {
            var playerdata;
            firebase.database().ref("rooms/"+ this.roomnumber+"/clientinput").on('value', (data, prevchildkey) => {
                playerdata = data.val();
                //console.log(playerdata);
                res(playerdata);
            });

            // test
            // const data = {
            //     userID: this.role
            // }
            // const request = fetch('http://192.168.50.62:8080/createroom', {
            //     method: "POST",
            //     body: JSON.stringify(data),
            // }).then(res => {
            //     console.log("", res)
            //     return res.json()
            // }).catch(err => {
            //     console.log(err);
            // }).then(data => {
            //     console.log("onload check: ", data);
            //     res(data);
            // })
            // endtest
            
        });
        promise.then((playerdata: pp) => {
            this.player1.left_move = playerdata.player1.left_move;
            this.player1.right_move = playerdata.player1.right_move;
            this.player1.jump = playerdata.player1.jump;
            this.player1.on_ground = playerdata.player1.on_ground;

            this.player2.left_move = playerdata.player2.left_move;
            this.player2.right_move = playerdata.player2.right_move;
            this.player2.jump = playerdata.player2.jump;
            this.player2.on_ground = playerdata.player2.on_ground;

            var serverdata : doublecoord = {
                player1 : {
                    x : this.player1.node.x,
                    y : this.player1.node.y
                    // vx : this.player1.getComponent(cc.RigidBody).linearVelocity.x,
                    // vy : this.player1.getComponent(cc.RigidBody).linearVelocity.y,
                },
                player2 : {
                    x : this.player2.node.x,
                    y : this.player2.node.y
                    // vx : this.player2.getComponent(cc.RigidBody).linearVelocity.x,
                    // vy : this.player2.getComponent(cc.RigidBody).linearVelocity.y,
                }
            }
            firebase.database().ref("rooms/" + this.roomnumber + "/serverinput").set(serverdata);
        });
    }
    protected allupdate(dt : number ): void{
        
    }
    protected playerupdate(dt : number ): void{
        
    }
}
