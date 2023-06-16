const {ccclass, property} = cc._decorator;
declare const firebase : any;
@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    btnmap1 (): void{
        cc.director.loadScene("Map1");
    }
    btnmap2 (): void{
        cc.director.loadScene("Map2");
    }
    btnsettings (): void{
        cc.director.loadScene("Settings");
    }
    btnlogout (): void{
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
