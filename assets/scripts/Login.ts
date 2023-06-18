import game from "./game";
import { DataManager } from "./DataManager";

const {ccclass, property} = cc._decorator;
declare const firebase : any;
@ccclass
export default class Login extends cc.Component {

    private inputemail: string = "";
    private inputpassword: string = "";
    
    Login():void{
        firebase.auth().signInWithEmailAndPassword(this.inputemail, this.inputpassword)
        .then((userCredential) => {
            let uid = firebase.auth().currentUser.uid
            DataManager.instance.UserName = this.inputemail;
            DataManager.instance.UserUID = uid;
            DataManager.instance.UserChar = 0;
            //console.log(DataManager.instance.UserName);
            // let Room;
            // firebase.database().ref("rooms/0").once("value", (room) => {
            //     Room = room.val();
            // }).then(() => {
            //     if(Room.P1 == 1) {
            //         firebase.database().ref("rooms/0/P1").set(uid).then(() => {
            //             cc.director.loadScene("Select_character");  
            //         });
            //     }
            //     else if(Room.P2 == 1) {
            //         firebase.database().ref("rooms/0/P2").set(uid).then(() => {
            //             cc.director.loadScene("Select_character");
            //         });
            //     }
            //     cc.director.loadScene("Select_character");  
            // });
            
            cc.director.loadScene("Lobby");
        })
        .catch(e => {
            alert('Invalid Email or Password');
            console.log(e.message);
        });
    }
    NewAccount():void{
        firebase.auth().createUserWithEmailAndPassword(this.inputemail, this.inputpassword)
        .then((userCredential) => {
            let uid = firebase.auth().currentUser.uid
            firebase.database().ref("User/" + uid).set({Email: this.inputemail, Character: 0, isReady: false})
            .then((userCredential) => {
                DataManager.instance.UserName = this.inputemail;
                DataManager.instance.UserUID = uid;
                DataManager.instance.UserChar = 0;

                // let Room;
                // firebase.database().ref("rooms/0").once("value", (room) => {
                //     Room = room.val();
                // }).then(() => {
                //     if(Room.P1 == 1) {
                //         firebase.database().ref("rooms/0/P1").set(uid).then(() => {
                //             cc.director.loadScene("Select_character");  
                //         });
                //     }
                //     else if(Room.P2 == 1) {
                //         firebase.database().ref("rooms/0/P2").set(uid).then(() => {
                //             cc.director.loadScene("Select_character");
                //         });
                //     }
                //     cc.director.loadScene("Select_character");  
                // });
                cc.director.loadScene("Lobby");

            })
        })
        .catch(e => {
            alert('Invalid Email or Password');
            console.log(e.message);
        });
    }
    defaultlogin():void{
        firebase.auth().signInWithEmailAndPassword("aaa@gmail.com", "123456")
        .then((userCredential) => {
            cc.director.loadScene("Login-check");
        })
        .catch(e => {
            alert('Invalid Email or Password');
            console.log(e.message);
        });
    }
    updateemail(text, editbox, custom):void{
        this.inputemail = text;
    }
    updatepassword(text, editbox, custom):void{
        this.inputpassword = text;
    }
}
