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

    uid: any;

    // onLoad () {}

    start () {
        this.uid = DataManager.instance.UserUID;
    }

    // update (dt) {}

    Single() {
        cc.director.loadScene("Single_Select_Character");
    }

    Multi() {
        let Room;
        firebase.database().ref("rooms/0").once("value", (room) => {
            Room = room.val();
        }).then(() => {
            if(Room.P1 == 1) {
                firebase.database().ref("rooms/0/P1").set(this.uid).then(() => {
                    cc.director.loadScene("Select_character");  
                });
            }
            else if(Room.P2 == 1) {
                firebase.database().ref("rooms/0/P2").set(this.uid).then(() => {
                    cc.director.loadScene("Select_character");
                });
            }
            else {
                alert("Room is full!!");
            }
        });

        //cc.director.loadScene("Select_character");
    }

    Setting() {
        cc.director.loadScene("Settings");
    }

    Logout() {
        firebase.auth().signOut()
        .then(() => {
            alert('logout success!');
            cc.director.loadScene("Login");
        })
        .catch(e => {
            alert("error!\n" + e.message);
        });
    }
}
