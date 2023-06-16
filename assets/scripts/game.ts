const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    // start () {}
    // update (dt) {}
    startbtn() : void{
        cc.director.loadScene("Login");
    }
}
