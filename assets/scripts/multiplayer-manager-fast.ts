import SplayerFast from "./SplayerFast";
import CplayerFast from "./CplayerFast";
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
class clientdata {
    left_move : number;
    right_move : number;
    on_ground : number;
    jump : number;
}
class serversend {
    userID : string;
    roomID : number;
    statuses : {
        '1' : {
            x : number;
            y : number;
            vx : number;
            vy : number;
        },
        '2' : {
            x : number;
            y : number;
            vx : number;
            vy : number;
        }
    }
}
@ccclass
export default class multiplayerFast extends cc.Component {

    @property(SplayerFast)
    player1 : SplayerFast = null;
    @property(SplayerFast)
    player2 : SplayerFast = null;
    @property(CplayerFast)
    Cplayer1 : CplayerFast = null;
    @property(CplayerFast)
    Cplayer2 : CplayerFast = null;
    @property(cc.Camera)
    camera : cc.Camera = null;
    @property(cc.Integer)
    role : number = 0;

    private roomnumber : number = 0;
    
    private dbtest : boolean = false;
    private gametime : number = 0;
    private nextupdatetime : number = 0;

    onLoad (): void{
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        var nowdata = {
            userID: '1',
            roomID: 0,
            action: {
                left_move: false,
                right_move: false,
                on_ground: true,
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
            console.log("multiplayer manager receive data", data);
            // this.nowdata = data;
        })
    }


    onKeyDown(event){
        if(event.keyCode == cc.macro.KEY.p){
            this.camera.node.x = 3000 - this.camera.node.x;
            console.log("key p pressed ");
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
        this.gametime += dt;
        if(this.gametime > this.nextupdatetime)this.nextupdatetime += 0.033;
        else return ;

        if(this.role == 1)this.serverupdate(dt);
        // this.allupdate(dt);
        // this.playerupdate(dt);
    }
    protected serverupdate(dt : number ): void{
        var serverdata : serversend = {
            userID : "1",
            roomID : 0,
            statuses : {
                "1" : {
                    x : this.player1.node.x,
                    y : this.player1.node.y,
                    vx : this.player1.getComponent(cc.RigidBody).linearVelocity.x,
                    vy : this.player1.getComponent(cc.RigidBody).linearVelocity.y
                },
                "2" : {
                    x : this.player2.node.x,
                    y : this.player2.node.y,
                    vx : this.player2.getComponent(cc.RigidBody).linearVelocity.x,
                    vy : this.player2.getComponent(cc.RigidBody).linearVelocity.y
                }
            }
        }
        const request1 = fetch('http://192.168.50.62:8080/update', {
            method: "POST",
            body: JSON.stringify(serverdata),
        }).then(res => {
            return res.json()
        }).catch(err => {
            console.log("multiplayer manager error : ", err);
        }).then(data => {
            console.log("server success upload data");
        });

        const promise = new Promise((res, rej) => {
            
            var data2 = {
                roomID : 0
            }
            const request = fetch('http://192.168.50.62:8080/getactions', {
                method: "POST",
                body: JSON.stringify(data2),
            }).then(res => {
                // console.log("", res)
                return res.json()
            }).catch(err => {
                console.log("multiplayer manager error : ", err);
            }).then(data => {
                // console.log("multiplayer manager receive data", data);
                res(data);
            });
        });
        promise.then((clientdata) => {
            // console.log("server success get status");
            console.log(clientdata["1"].left_move);
            console.log(clientdata["2"].left_move);

            this.player1.left_move = clientdata["1"].left_move;
            this.player1.right_move = clientdata["1"].right_move;
            this.player1.jump = clientdata["1"].jump;
            this.player1.on_ground = clientdata["1"].on_ground;

            this.player2.left_move = clientdata["2"].left_move;
            this.player2.right_move = clientdata["2"].right_move;
            this.player2.jump = clientdata["2"].jump;
            this.player2.on_ground = clientdata["2"].on_ground;

            
        }).catch(err => {
            console.log("multipler mgr recevive data promise error", err);
        });
    }
    protected allupdate(dt : number ): void{
        
    }
    protected playerupdate(dt : number ): void{
        
    }
}
