// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { DataManager } from "./DataManager";
const { ccclass, property } = cc._decorator;
declare const firebase: any;

@ccclass
export default class WinScene extends cc.Component {

    @property(cc.SpriteFrame)
    AbrahamRonen: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    AesopSharp: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    MatildaWeasly: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    EleazarFig: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    DinahHecat: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    MudiwaOnai: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    Black: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    GhostBloodyBaron: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    GhostNick: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    RookWood: cc.SpriteFrame = null;


    @property(cc.Node)
    Player1: cc.Node = null;

    @property(cc.Node)
    Player2: cc.Node = null;

    @property(cc.Label)
    WinLabel: cc.Label = null;

    @property(cc.Label)
    LoseLabel: cc.Label = null;

    @property(cc.AudioClip)
    BGM: cc.AudioClip = null;

    @property(cc.AudioClip)
    MainBGM: cc.AudioClip = null;


    onLoad() { }

    start() {
        cc.audioEngine.playMusic(this.BGM, true);

        if (DataManager.instance.UserRole == 0 || DataManager.instance.UserRole == 1) {
            if (DataManager.instance.UserChar == 1)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            else if (DataManager.instance.UserChar == 2)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            else if (DataManager.instance.UserChar == 3)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            else if (DataManager.instance.UserChar == 4)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            else if (DataManager.instance.UserChar == 5)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
            else if (DataManager.instance.UserChar == 6)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.Black;
            else if (DataManager.instance.UserChar == 7)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.RookWood;
            else if (DataManager.instance.UserChar == 8)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.GhostNick;
            else if (DataManager.instance.UserChar == 9)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;

            if (DataManager.instance.opponentChar == 1)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            else if (DataManager.instance.opponentChar == 2)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            else if (DataManager.instance.opponentChar == 3)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            else if (DataManager.instance.opponentChar == 4)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            else if (DataManager.instance.opponentChar == 5)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
            else if (DataManager.instance.opponentChar == 6)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.Black;
            else if (DataManager.instance.opponentChar == 7)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.RookWood;
            else if (DataManager.instance.opponentChar == 8)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.GhostNick;
            else if (DataManager.instance.opponentChar == 9)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;
            console.log(DataManager.instance.UserChar, DataManager.instance.UserChar2);
        }
        else {

            if (DataManager.instance.UserChar == 1)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            else if (DataManager.instance.UserChar == 2)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            else if (DataManager.instance.UserChar == 3)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            else if (DataManager.instance.UserChar == 4)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            else if (DataManager.instance.UserChar == 5)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
            else if (DataManager.instance.UserChar == 6)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.Black;
            else if (DataManager.instance.UserChar == 7)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.RookWood;
            else if (DataManager.instance.UserChar == 8)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.GhostNick;
            else if (DataManager.instance.UserChar == 9)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;

            if (DataManager.instance.UserChar2 == 1)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            else if (DataManager.instance.UserChar2 == 2)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            else if (DataManager.instance.UserChar2 == 3)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            else if (DataManager.instance.UserChar2 == 4)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            else if (DataManager.instance.UserChar2 == 5)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
            else if (DataManager.instance.UserChar2 == 6)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.Black;
            else if (DataManager.instance.UserChar2 == 7)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.RookWood;
            else if (DataManager.instance.UserChar2 == 8)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.GhostNick;
            else if (DataManager.instance.UserChar2 == 9)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;

        }

        let action = cc.sequence(cc.moveBy(0.1, 150, 150), cc.moveBy(0.1 - 150, -150)).repeat(5);

        if (DataManager.instance.Result) {
            this.WinLabel.node.setPosition(-386, 320);
            this.LoseLabel.node.setPosition(457, 320);
              this.Player2.getChildByName('red_scar').active=true;
            this.scheduleOnce(function () {

                //console.log(this.Player2.position.x);
                this.Player2.getChildByName('red_scar').active=true;

            }, 1);
            if (DataManager.instance.UserRole == 0 || DataManager.instance.UserRole == 1) {
                firebase.database().ref("User/" + DataManager.instance.UserUID).update({ WinCount: DataManager.instance.WinCount + 1 })
                    .then().catch((e) => { console.log(e.message) });
                // alert("AA");
            }

        }
        else {
            //this.Player1.getChildByName('red_scar').active=true;

            this.WinLabel.node.setPosition(457, 320);
            this.LoseLabel.node.setPosition(-386, 320);
            this.scheduleOnce(function () {
                this.Player1.getChildByName('red_scar').active=true;

                // this.Player1.runAction(action);

            }, 1);
        }
    }

    update (dt) {
        //console.log(this.Player2.position.x, this.Player2.position.y);
    }

    ReturnB() {
        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(this.MainBGM, true);
        cc.director.loadScene("Lobby");
    }
}
