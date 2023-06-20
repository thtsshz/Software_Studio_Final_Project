// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DataManager } from "./DataManager";

const {ccclass, property} = cc._decorator;


@ccclass
export default class BattleIntro extends cc.Component {

    @property(cc.SpriteFrame)
    AbrahamRonen: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    AesopSharp: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    MatildaWeasly: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    EleazarFig: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    MudiwaOnai: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    ProfessorBlack: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    RookWood: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    GhostNick: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    GhostBloodyBaron: cc.SpriteFrame = null;

    @property(cc.Node)
    Player1: cc.Node = null;

    @property(cc.Node)
    Player2: cc.Node = null;

    onLoad () {}

    start () {
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
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
            else if(DataManager.instance.UserChar == 6)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.ProfessorBlack;
            else if(DataManager.instance.UserChar == 7)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.RookWood;
            else if(DataManager.instance.UserChar == 8)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.GhostNick;
            else if(DataManager.instance.UserChar == 9)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;

            if(DataManager.instance.opponentChar == 1)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            else if(DataManager.instance.opponentChar == 2)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            else if(DataManager.instance.opponentChar == 3)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            else if(DataManager.instance.opponentChar == 4)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            else if(DataManager.instance.opponentChar == 5)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
            else if(DataManager.instance.opponentChar == 6)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.ProfessorBlack;
            else if(DataManager.instance.opponentChar == 7)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.RookWood;
            else if(DataManager.instance.opponentChar == 8)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.GhostNick;
            else if(DataManager.instance.opponentChar == 9)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;
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
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
            else if(DataManager.instance.UserChar == 6)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.ProfessorBlack;
            else if(DataManager.instance.UserChar == 7)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.RookWood;
            else if(DataManager.instance.UserChar == 8)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.GhostNick;
            else if(DataManager.instance.UserChar == 9)
                this.Player1.getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;

            if(DataManager.instance.UserChar2 == 1)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            else if(DataManager.instance.UserChar2 == 2)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            else if(DataManager.instance.UserChar2 == 3)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            else if(DataManager.instance.UserChar2 == 4)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            else if(DataManager.instance.UserChar2 == 5)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
            else if(DataManager.instance.UserChar2 == 6)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.ProfessorBlack;
            else if(DataManager.instance.UserChar2 == 7)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.RookWood;
            else if(DataManager.instance.UserChar2 == 8)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.GhostNick;
            else if(DataManager.instance.UserChar2 == 9)
                this.Player2.getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;
                
        }

        this.scheduleOnce(() => {
            let action1 = cc.moveTo(1, -473, 31);
            let action2 = cc.moveTo(1, 548, 31);
            this.Player1.runAction(action1);
            this.Player2.runAction(action2)
        }, 0.5);

        this.scheduleOnce(() => {
            cc.audioEngine.stopMusic();
            if(DataManager.instance.UserRole == 10){
                if(DataManager.instance.Map == 1)
                    cc.director.loadScene("Map1");
                else 
                    cc.director.loadScene("Map2");
            }else{
                cc.director.loadScene("Map1");
            }
        }, 3)
    }

    // update (dt) {}
}
