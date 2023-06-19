import game from "./game";
import { DataManager } from "./DataManager";

const {ccclass, property} = cc._decorator;
declare const firebase : any;
@ccclass
export default class Login extends cc.Component {

    private inputemail: string = "";
    private inputpassword: string = "";

    @property(cc.AudioClip)
    BGM: cc.AudioClip = null;

    start() {
        
    }
    
    Login():void{
        firebase.auth().signInWithEmailAndPassword(this.inputemail, this.inputpassword)
        .then((userCredential) => {
            let uid = firebase.auth().currentUser.uid
            DataManager.instance.UserName = this.inputemail;
            DataManager.instance.UserUID = uid;
            DataManager.instance.UserChar = 0;
            
            firebase.database().ref("User/" + DataManager.instance.UserUID).once("value", (snap) => {
                DataManager.instance.WinCount = snap.val().WinCount;
            }).then(() => {
                //alert(DataManager.instance.WinCount);
                cc.director.loadScene("change_scene");
            }).catch(e => {
                console.log(e.message);
            });
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
            
            //cc.director.loadScene("change_scene");
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
            firebase.database().ref("User/" + uid).set({Email: this.inputemail, Character: 0, isReady: false, WinCount: 0})
            .then((userCredential) => {
                DataManager.instance.UserName = this.inputemail;
                DataManager.instance.UserUID = uid;
                DataManager.instance.UserChar = 0;
                DataManager.instance.WinCount = 0;
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
    loginA():void{
        firebase.auth().signInWithEmailAndPassword("a@gmail.com", "aaaaaa")
        .then((userCredential) => {
            let uid = firebase.auth().currentUser.uid
            DataManager.instance.UserName = this.inputemail;
            DataManager.instance.UserUID = uid;
            DataManager.instance.UserChar = 0;
            firebase.database().ref("User/" + DataManager.instance.UserUID).once("value", (snap) => {
                DataManager.instance.WinCount = snap.val().WinCount;
            }).then(() => {
                //alert(DataManager.instance.WinCount);
                cc.director.loadScene("Lobby");
            }).catch(e => {
                console.log(e.message);
            });
        })
        .catch(e => {
            alert('Invalid Email or Password');
            console.log(e.message);
        });
    }
    loginB():void{
        firebase.auth().signInWithEmailAndPassword("b@gmail.com", "bbbbbb")
        .then((userCredential) => {
            let uid = firebase.auth().currentUser.uid
            DataManager.instance.UserName = this.inputemail;
            DataManager.instance.UserUID = uid;
            DataManager.instance.UserChar = 0;
            firebase.database().ref("User/" + DataManager.instance.UserUID).once("value", (snap) => {
                DataManager.instance.WinCount = snap.val().WinCount;
            }).then(() => {
                //alert(DataManager.instance.WinCount);
                cc.director.loadScene("Lobby");
            }).catch(e => {
                console.log(e.message);
            });
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
