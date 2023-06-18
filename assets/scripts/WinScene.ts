// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { DataManager } from "./DataManager";
const {ccclass, property} = cc._decorator;

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


    onLoad () {}

    start () {
        cc.audioEngine.playMusic(this.BGM, true);

        if(DataManager.instance.UserRole == 0 || DataManager.instance.UserRole == 1) {
            if(DataManager.instance.UserChar == 1)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            else if(DataManager.instance.UserChar == 2)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            else if(DataManager.instance.UserChar == 3)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            else if(DataManager.instance.UserChar == 4)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            else if(DataManager.instance.UserChar == 5)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.DinahHecat;

            if(DataManager.instance.opponentChar == 1)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            else if(DataManager.instance.opponentChar == 2)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            else if(DataManager.instance.opponentChar == 3)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            else if(DataManager.instance.opponentChar == 4)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            else if(DataManager.instance.opponentChar == 5)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.DinahHecat;
            console.log(DataManager.instance.UserChar, DataManager.instance.UserChar2);
        }
        else {
            
            if(DataManager.instance.UserChar == 1)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            else if(DataManager.instance.UserChar == 2)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            else if(DataManager.instance.UserChar == 3)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            else if(DataManager.instance.UserChar == 4)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            else if(DataManager.instance.UserChar == 5)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.DinahHecat;

            if(DataManager.instance.UserChar2 == 1)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            else if(DataManager.instance.UserChar2 == 2)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            else if(DataManager.instance.UserChar2 == 3)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            else if(DataManager.instance.UserChar2 == 4)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            else if(DataManager.instance.UserChar2 == 5)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.DinahHecat;
                
        }


        if(DataManager.instance.Result) {
            this.WinLabel.node.setPosition(-386, 320);
            this.LoseLabel.node.setPosition(457, 320);
        }
        else{
            this.WinLabel.node.setPosition(457, 320);
            this.LoseLabel.node.setPosition(-386, 320);
        }
    }

    // update (dt) {}

    ReturnB() {
        cc.audioEngine.stopMusic();
        cc.director.loadScene("Lobby");
    }
}