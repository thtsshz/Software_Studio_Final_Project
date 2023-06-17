// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import { DataManager } from "./DataManager";
declare const firebase : any;

@ccclass
export default class SelectMap extends cc.Component {

    // onLoad () {}
    Room: any;
    Role: any;
    Map = 0;
    isLoad: boolean = false;

    start () {
        firebase.database().ref("rooms/0").once("value", (room) => {
            this.Room = room.val();
            console.log(this.Room);
        }).then(() => {
            if(this.Room.P1 == DataManager.instance.UserUID) {
                this.Role = 0;
            }
            else {
                this.Role = 1;
            }
            alert(this.Role);
            this.Map = this.Room.Map;
            firebase.database().ref("rooms/0/Map").on("value", (room) => {
                this.Map = room.val();
                //console.log(this.Room);
            })
        })
        
    }

    update (dt) {
        if(this.Map == 1 && !this.isLoad) {
            this.isLoad = true;
            alert("CC");
            cc.director.loadScene("Map1");
            if(this.Role == 0) 
                firebase.database().ref("rooms/0/P1").set(1);
            else
                firebase.database().ref("rooms/0/P2").set(1);

            this.scheduleOnce(() =>{
                firebase.database().ref("rooms/0/Map").set(0);
            }, 1)
        }
        else if(this.Map == 2 && !this.isLoad) {
            this.isLoad = true;
            alert("BB");
            cc.director.loadScene("Map2");
            if(this.Role == 0)
                firebase.database().ref("rooms/0/P1").set(1);
            else
                firebase.database().ref("rooms/0/P2").set(1);

            this.scheduleOnce(() =>{
                firebase.database().ref("rooms/0/Map").set(0);
            }, 1)
        }
    }

    Select1() {
        if(this.Role == 0) {
            firebase.database().ref("rooms/0/Map").set(1);
            alert("AAA");
        }
    }

    Select2() {
        if(this.Role == 0) {
            firebase.database().ref("rooms/0/Map").set(2);
        }
    }
}
