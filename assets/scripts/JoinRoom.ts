const {ccclass, property} = cc._decorator;
import { DataManager } from "./DataManager";
declare const firebase : any;
@ccclass
export default class joinroom extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    private JoinRoomID : string;

    onLoad () {
        DataManager.instance.MultiplayerRoomID = -1;
    }

    start () {

    }
    BtnBack(): void{
        cc.director.loadScene("Lobby");
    }
    CreateRoom(): void{

        // const request = fetch('http://192.168.50.62:8080/createroom', {
        //     method: "POST",
        //     body: JSON.stringify({userID : DataManager.instance.UserUID}),
        // }).then(res => {
        //     // console.log("", res)
        //     return res.json()
        // }).catch(err => {
        //     alert("connection error");
        //     console.log(err);
        // }).then(res => {

            console.log("RoomID: ", 0);
            firebase.database().ref("rooms/" + "0").set({Map:0, P1:DataManager.instance.UserUID, P2:1})
            .then(data => {
                DataManager.instance.MultiplayerRoomID = parseInt("0");  
                alert(DataManager.instance.MultiplayerRoomID);
                console.log(DataManager.instance.MultiplayerRoomID);
                cc.director.loadScene("Select_character");
            }).catch(err => {
                console.log(err);
            });

        // });
    }
    JoinRoom(): void{
        console.log(this.JoinRoomID);

        let Room;
        firebase.database().ref("rooms/" + this.JoinRoomID).once("value", (room) => {
            Room = room.val();
        }).then(() => {
            if(Room.P1 == 1) {
                firebase.database().ref("rooms/" + this.JoinRoomID + "/P1").set(DataManager.instance.UserUID).then(() => {
                    cc.director.loadScene("Select_character");  
                });
            }
            else if(Room.P2 == 1) {
                firebase.database().ref("rooms/" + this.JoinRoomID + "/P2").set(DataManager.instance.UserUID).then(() => {
                    DataManager.instance.MultiplayerRoomID = Number(this.JoinRoomID);
                    cc.director.loadScene("Select_character");
                });
            }
            else {
                alert("Room is full!!");
            }
        }).catch(err => {
            console.log(err);
        });
    }
    updateinput(text, editbox, custom):void{
        this.JoinRoomID = text;
    }
    // update (dt) {}
}
