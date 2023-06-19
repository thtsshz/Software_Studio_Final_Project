const {ccclass, property} = cc._decorator;
import { DataManager } from "./DataManager";
import player from "./player";

@ccclass
export default class NewClass extends cc.Component {

    
    Player1: cc.Node = null;
    Player2: cc.Node = null;
    player1: player = null;
    player2: player = null;

    @property(player)
    Char1 : player = null;
    @property(player)
    Char2 : player = null;

    @property(cc.Label)
    p1health : cc.Label = null;
    @property(cc.Label)
    p2health : cc.Label = null;


    @property(cc.AudioClip)
    BGM1: cc.AudioClip = null;

    @property(cc.AudioClip)
    BGM2: cc.AudioClip = null;

    @property(cc.AudioClip)
    Accio: cc.AudioClip = null;

    @property(cc.AudioClip)
    Avada_kedavra: cc.AudioClip = null;
    
    @property(cc.AudioClip)
    Confringo: cc.AudioClip = null;

    @property(cc.AudioClip)
    Depulso: cc.AudioClip = null;

    @property(cc.AudioClip)
    Crucio: cc.AudioClip = null;

    @property(cc.AudioClip)
    Diffindo: cc.AudioClip = null;

    @property(cc.AudioClip)
    Disillusion: cc.AudioClip = null;

    @property(cc.AudioClip)
    Expelliarmus: cc.AudioClip = null;

    @property(cc.AudioClip)
    Glacius: cc.AudioClip = null;

    @property(cc.AudioClip)
    Incendio: cc.AudioClip = null;

    @property(cc.AudioClip)
    Levioso: cc.AudioClip = null;

    @property(cc.AudioClip)
    Stupefy: cc.AudioClip = null;

    private P1char = 0;
    private P2char = 0;

    P1S1: boolean = false;
    P1S2: boolean = false;
    P1S3: boolean = false;

    P2S1: boolean = false;
    P2S2: boolean = false;
    P2S3: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.loader.loadRes("BGM/hogwarts-legacy-everybody-grab-a-broom", (err, bgm) => {
            this.BGM1 = bgm;
            cc.audioEngine.playMusic(this.BGM1, true);
        })
        cc.loader.loadRes("BGM/BGM_anticipate_RookWood",() => {}, (err, bgm2) => {
            this.BGM2 = bgm2;
            //console.log(err);
            //cc.audioEngine.playEffect(this.BGM2, false);
        })

        

        if(this.P1char == 1 || this.P2char == 1) {

        }
        else if(this.P1char == 2 || this.P2char == 2) {

        }
        else if(this.P1char == 3 || this.P2char == 3) {

        }
        else if(this.P1char == 4 || this.P2char == 4) {

        }
        else if(this.P1char == 5 || this.P2char == 5) {

        }
    }

    start () {
        cc.find("Canvas/Player/player1").active = false;        
        cc.find("Canvas/Player/player2").active = false; 
        cc.find("Canvas/Player/player3").active = false; 
        cc.find("Canvas/Player/player4").active = false; 
        cc.find("Canvas/Player/player5").active = false;        
        cc.find("Canvas/Player/player6").active = false; 
        cc.find("Canvas/Player/player7").active = false; 
        cc.find("Canvas/Player/player8").active = false; 
        cc.find("Canvas/Player/player9").active = false; 
        this.P1char = 4;
        this.P2char = 3;
        let s = "player";
        if(DataManager.instance.UserRole == 10) {
            let char1 = DataManager.instance.UserChar.toString();
            cc.find("Canvas/Player/player"+char1).active = true;
            this.Player1 = cc.find("Canvas/Player/player"+char1);
            this.player1 = this.Player1.getComponent(player);

            char1 = DataManager.instance.UserChar2.toString();
            let char2 = cc.find("Canvas/Player/player"+char1);
            char2.active = true;
            char2.setPosition(622.9,275.859);
            char2.scaleX = -0.2;
            this.Player2 = char2;
            this.player2 = this.Player2.getComponent(player);
            console.log(s+DataManager.instance.UserChar.toString())
            console.log(s+DataManager.instance.UserChar2.toString())
        }
        else {
            if(DataManager.instance.UserRole == 1) {
                let char1 = DataManager.instance.UserChar.toString();
                let char2 = cc.find("Canvas/Player/player"+char1);
                this.Player2 = char2;
                this.player2 = this.Player2.getComponent(player);
                char2.active = true;
                char2.setPosition(622.9,275.859);
                char2.scaleX = -0.2;

                char1 = DataManager.instance.opponentChar.toString();
                char2 = cc.find("Canvas/Player/player"+char1);
                this.Player1 = char2;
                this.player1 = this.Player1.getComponent(player);
                char2.active = true;
            }
            else if(DataManager.instance.UserRole == 0) {
                let char1 = DataManager.instance.UserChar.toString();
                let char2 = cc.find("Canvas/Player/player"+char1);
                this.Player1 = cc.find("Canvas/Player/player"+char1);
                this.player1 = this.Player1.getComponent(player);
                char2.active = true;

                char1 = DataManager.instance.opponentChar.toString();
                char2 = cc.find("Canvas/Player/player"+char1);
                this.Player2 = char2;
                this.player2 = this.Player2.getComponent(player);
                char2.active = true;
                char2.setPosition(422,273);
                char2.scaleX = -0.2;
            }
            console.log(s+DataManager.instance.UserChar.toString())
        }
    }

    update (dt) {
        this.p1health.string = Math.trunc(this.player1.health).toString();
        this.p2health.string = Math.trunc(this.player2.health).toString();
        if(!this.player1.skill1)
            this.P1S1 = false;

        if(!this.player1.skill2)
            this.P1S2 = false;

        if(!this.player1.skill3)
            this.P1S3 = false;

        if(this.player1.skill1 && !this.P1S1) {
            this.P1S1 = true;
            cc.audioEngine.playEffect(this.Incendio, false);
        }
        if(this.player1.skill2 && !this.P1S2) {
            this.P1S2 = true;
            cc.audioEngine.playEffect(this.Glacius, false);
        }
        if(this.player1.skill3 && !this.P1S3) {
            this.P1S3 = true;
            cc.audioEngine.playEffect(this.Expelliarmus, false);
        }


        if(!this.player2.skill1)
            this.P2S1 = false;

        if(!this.player2.skill2)
            this.P2S2 = false;

        if(!this.player2.skill3)
            this.P2S3 = false;

        if(this.player2.skill1 && !this.P2S1) {
            this.P2S1 = true;
            cc.audioEngine.playEffect(this.Incendio, false);
        }
        if(this.player2.skill2 && !this.P2S2) {
            this.P2S2 = true;
            cc.audioEngine.playEffect(this.Glacius, false);
        }
        if(this.player2.skill3 && !this.P2S3) {
            this.P2S3 = true;
            cc.audioEngine.playEffect(this.Expelliarmus, false);
        }
    }
}
