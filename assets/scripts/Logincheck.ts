const {ccclass, property} = cc._decorator;
declare const firebase : any;
@ccclass
export default class NewClass extends cc.Component {

    protected onLoad(): void {
        const user = firebase.auth().currentUser;
        cc.find("Canvas/Email").getComponent(cc.Label).string = user.uid;

        
        const data = {
            userID: "1"
        }
        const request = fetch('http://192.168.50.62:8080/createroom', {
            method: "POST",
            body: JSON.stringify(data),
        }).then(res => {
            console.log("", res)
            return res.json()
        }).catch(err => {
            console.log(err);
        }).then(res => {
            console.log("onload check: ", res);
            // document.getElementById('response').innerHTML = JSON.stringify(res);
        })
        data.userID = "2";
        const request2 = fetch('http://192.168.50.62:8080/joinroom', {
            method: "POST",
            body: JSON.stringify(data),
        }).then(res => {
            console.log("", res)
            return res.json()
        }).catch(err => {
            console.log(err);
        }).then(res => {
            console.log("onload check: ", res);
            // document.getElementById('response').innerHTML = JSON.stringify(res);
        })

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
    multiplayertestfast():void{
        cc.director.loadScene("multiplayer-test-fast");
    }
    start () {
        console.log('start : ');
        fetch("http://192.168.50.62:8080/ping").then((response: Response) => {
            return response.text()
        }).then((value) => {
            console.log("res : ", value);
        })
    }
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
