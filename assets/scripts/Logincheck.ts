const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    protected onLoad(): void {
        const user = firebase.auth().currentUser;
        cc.find("Canvas/Email").getComponent(cc.Label).string = user.email;
    }
    Logout():void{
        firebase.auth().signOut()
        .then(() => {
            alert('logout success!');
            cc.director.loadScene("Login");
        })
        .catch(e => {
            alert("error!\n" + e.message);
        });
    }
    multiplayertest():void{
        cc.director.loadScene("multiplayer-test");
    }
    // start () {}
    update (dt) {
        // const promise = new Promise((res, rej) => {
        //     firebase.database().ref("test").on('value', (data, prevchildkey) => {
        //         var tmp = data.val();
        //         res(tmp);
        //     });
        // });
        // promise.then((data) => {
        //     if(data)console.log(data);
        // });
    }
}
