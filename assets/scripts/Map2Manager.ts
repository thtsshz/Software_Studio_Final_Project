// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import player from "./player";

@ccclass
export default class NewClass extends cc.Component {

    @property(player)
    player1 : player = null;
    @property(player)
    player2 : player = null;

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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.loader.loadRes("BGM/hogwarts-legacy-all-roads-lead-to-hogsmeade", (err, bgm) => {
            this.BGM1 = bgm;
            cc.audioEngine.playMusic(this.BGM1, true);
        })
        cc.loader.loadRes("BGM/BGM_lost",() => {}, (err, bgm2) => {
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
        //cc.audioEngine.playMusic(this.BGM1, true);
        this.P1char = 4;
        this.P2char = 3;
    }

    // update (dt) {}
}
