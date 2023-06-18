// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
declare const firebase : any;
import { DataManager } from "./DataManager";

@ccclass
export default class Single_SelectCharacter extends cc.Component {

    @property(cc.SpriteFrame)
    AbrahamRonen: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    AbrahamRonenSelect: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    AesopSharp: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    AesopSharpSelect: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    MatildaWeasly: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    MatildaWeaslySelect: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    EleazarFig: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    EleazarFigSelect: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    DinahHecat: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    DinahHecatSelect: cc.SpriteFrame = null;



    @property(cc.Button)
    ReadyButton: cc.Button = null;

    private P1selected = false;
    private P2selected = false;
    private P1char = 0;
    private P2char = 0;

    Room: any;
    Role;
    opponentID;
    opponentChar = 0;
    isReady: boolean = false;
    oppenentReady = false;
    isWaiting: boolean = true;

    onLoad () {
        this.P1selected = false;
        this.P2selected = false;
        this.P1char = 0;
        this.P2char = 0;
        this.ReadyButton.node.active = false;
    }

    start () {
    
    }

    update (dt) {
        
    }
    
    select1() {
        if(!this.P1selected) {
            this.P1char = 1;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "AbrahamRonen";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
        }
        else if(this.P1char != 1 && !this.P2selected){
            this.P2char = 1;
            let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
            node.getComponent(cc.Label).string = "AbrahamRonen";
            cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
        }
    }

    select2() {
        if(!this.P1selected) {
            this.P1char = 2;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "AesopSharp";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
        }
        else if(this.P1char != 2 && !this.P2selected){
            this.P2char = 2;
            let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
            node.getComponent(cc.Label).string = "AesopSharp";
            cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
        }
    }

    select3() {
        if(!this.P1selected) {
            this.P1char = 3;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "MatildaWeasly";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
        }
        else if(this.P1char != 3 && !this.P2selected){
            this.P2char = 3;
            let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
            node.getComponent(cc.Label).string = "MatildaWeasly";
            cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
        }
    }

    select4() {
        if(!this.P1selected) {
            this.P1char = 4;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "EleazarFig";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            
        }
        else if(this.P1char != 4 && !this.P2selected){
            this.P2char = 4;
            let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
            node.getComponent(cc.Label).string = "EleazarFig";
            cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
        }
    }

    select5() {
        if(!this.P1selected) {
            this.P1char = 5;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "DinahHecat";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.DinahHecat;
        }
        else if(this.P1char != 5 && !this.P2selected){
            this.P2char = 5;
            let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
            node.getComponent(cc.Label).string = "DinahHecat";
            cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.DinahHecat;
        }
    }

    P1select() {
        if(!this.P1selected) {
            this.P1selected = true;
            cc.find("Canvas/All_characters/SelectedChar/P1Select").getComponent(cc.Button).interactable = false;
            DataManager.instance.UserChar = this.P1char;

            if(this.P1char == 1) {
                cc.find("Canvas/All_characters/Character1/AbrahamRonen").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonenSelect;
            }
            else if(this.P1char == 2) {
                cc.find("Canvas/All_characters/Character2/AesopSharp").getComponent(cc.Sprite).spriteFrame = this.AesopSharpSelect;
            }
            else if(this.P1char == 3) {
                cc.find("Canvas/All_characters/Character3/MatildaWeasly").getComponent(cc.Sprite).spriteFrame = this.MatildaWeaslySelect;
            }
            else if(this.P1char == 4) {
                cc.find("Canvas/All_characters/Character4/EleazarFig").getComponent(cc.Sprite).spriteFrame = this.EleazarFigSelect;
            }
            else if(this.P1char == 5) {
                cc.find("Canvas/All_characters/Character5/DinahHecat").getComponent(cc.Sprite).spriteFrame = this.DinahHecatSelect;
            }
        }
    }

    P2select() {
        if(!this.P2selected) {
            this.P2selected = true;
            cc.find("Canvas/All_characters/Player2Char/P2Select").getComponent(cc.Button).interactable = false;
            firebase.database().ref("/").update({P2: this.P2char});
            DataManager.instance.UserChar2 = this.P2char;

            if(this.P2char == 1) {
                cc.find("Canvas/All_characters/Character1/AbrahamRonen").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonenSelect;
            }
            else if(this.P2char == 2) {
                cc.find("Canvas/All_characters/Character2/AesopSharp").getComponent(cc.Sprite).spriteFrame = this.AesopSharpSelect;
            }
            else if(this.P2char == 3) {
                cc.find("Canvas/All_characters/Character3/MatildaWeasly").getComponent(cc.Sprite).spriteFrame = this.MatildaWeaslySelect;
            }
            else if(this.P2char == 4) {
                cc.find("Canvas/All_characters/Character4/EleazarFig").getComponent(cc.Sprite).spriteFrame = this.EleazarFigSelect;
            }
            else if(this.P2char == 5) {
                cc.find("Canvas/All_characters/Character5/DinahHecat").getComponent(cc.Sprite).spriteFrame = this.DinahHecatSelect;
            }

            this.ReadyButton.node.active = true;
        }
    }

    Ready() {
        cc.director.loadScene("Single_Select_Map");
    }

}
