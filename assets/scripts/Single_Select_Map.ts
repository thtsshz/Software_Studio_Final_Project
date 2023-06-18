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
export default class Single_SelectMap extends cc.Component {

    // onLoad () {}
    Room: any;
    Role: any;
    Map = 0;
    isLoad: boolean = false;

    start () {
    }

    update (dt) {

    }

    Select1() {
        DataManager.instance.Map = 1;
        cc.director.loadScene("BattleIntro");
    }

    Select2() {
        DataManager.instance.Map = 2;
        cc.director.loadScene("BattleIntro");
    }
}
