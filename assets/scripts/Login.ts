const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private inputemail: string = "";
    private inputpassword: string = "";
    
    Login():void{
        firebase.auth().signInWithEmailAndPassword(this.inputemail, this.inputpassword)
        .then((userCredential) => {
            cc.director.loadScene("Login-check");
        })
        .catch(e => {
            alert('Invalid Email or Password');
            console.log(e.message);
        });
    }
    NewAccount():void{
        firebase.auth().createUserWithEmailAndPassword(this.inputemail, this.inputpassword)
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
