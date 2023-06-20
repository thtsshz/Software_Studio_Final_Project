// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
declare const firebase : any;
import { DataManager } from "./DataManager";

@ccclass
export default class Lobby extends cc.Component {

    @property(cc.SpriteFrame)
    greenwifi : cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    redx : cc.SpriteFrame = null;

    uid: any;
    
    private serveravailable : boolean = false;
    private server_sock = null;

    onLoad () {
        cc.find("Canvas/Connection").getComponent(cc.Sprite).spriteFrame = this.redx;
        cc.find("Canvas/MultiPlayer").getComponent(cc.Button).interactable= false;
    }

    start () {
        this.uid = DataManager.instance.UserUID;
        DataManager.instance.Map = -1;
        DataManager.instance.MultiplayerRoomID = -1
        DataManager.instance.Result = false;
        DataManager.instance.UserChar = -1;
        DataManager.instance.UserChar2 = -1;
        DataManager.instance.UserRole = 10;
        DataManager.instance.opponentChar = -1;
    }

    private nowtime : number = 0;
    private nextconnectiontime : number = 10;

    update (dt) {
        this.nowtime += dt;
        if(!this.serveravailable && this.nowtime >= this.nextconnectiontime){
            this.nextconnectiontime = this.nowtime + 5;
            console.log("connection failed, trying to connect to server...");
        }

    }

    Single() {
        cc.director.loadScene("Single_Select_Character");
    }

    Multi() {
        // let Room;
        // firebase.database().ref("rooms/0").once("value", (room) => {
        //     Room = room.val();
        // }).then(() => {
        //     if(Room.P1 == 1) {
        //         firebase.database().ref("rooms/0/P1").set(this.uid).then(() => {
        //             cc.director.loadScene("Select_character");  
        //         });
        //     }
        //     else if(Room.P2 == 1) {
        //         firebase.database().ref("rooms/0/P2").set(this.uid).then(() => {
        //             cc.director.loadScene("Select_character");
        //         });
        //     }
        //     else {
        //         alert("Room is full!!");
        //     }
        // }).catch(err => {
        //     console.log(err);
        // });

        cc.director.loadScene("Join_room");
    }

    Setting() {
        cc.director.loadScene("Settings");
    }

    Logout() {
        firebase.auth().signOut()
        .then(() => {
            DataManager.instance.UserUID = 0;
            alert('logout success!');
            cc.director.loadScene("Login");
        })
        .catch(e => {
            alert("error!\n" + e.message);
        });
    }

    Leader() {
        cc.director.loadScene("LeaderBoard");
    }
}
