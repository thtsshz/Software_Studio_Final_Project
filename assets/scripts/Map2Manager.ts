const { ccclass, property } = cc._decorator;
import { DataManager } from "./DataManager";
import player from "./player";

@ccclass
export default class Map2Manager extends cc.Component {


    Player1: cc.Node = null;
    Player2: cc.Node = null;
    player1: player = null;
    player2: player = null;

    @property(player)
    Char1: player = null;
    @property(player)
    Char2: player = null;

    @property(cc.Label)
    p1health: cc.Label = null;
    @property(cc.Label)
    p2health: cc.Label = null;


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

    @property(cc.AudioClip)
    NormalAttack: cc.AudioClip = null;

    @property(cc.AudioClip)
    K: cc.AudioClip = null;

    @property(cc.AudioClip)
    J: cc.AudioClip = null;

    @property(cc.AudioClip)
    AccioLine: cc.AudioClip = null;

    @property(cc.AudioClip)
    Avada_kedavraLine: cc.AudioClip = null;

    @property(cc.AudioClip)
    ConfringoLine: cc.AudioClip = null;

    @property(cc.AudioClip)
    DepulsoLine: cc.AudioClip = null;

    @property(cc.AudioClip)
    CrucioLine: cc.AudioClip = null;

    @property(cc.AudioClip)
    DiffindoLine: cc.AudioClip = null;

    @property(cc.AudioClip)
    ExpelliarmusLine: cc.AudioClip = null;

    @property(cc.AudioClip)
    GlaciusLine: cc.AudioClip = null;

    @property(cc.AudioClip)
    IncendioLine: cc.AudioClip = null;

    @property(cc.AudioClip)
    LeviosoLine: cc.AudioClip = null;

    @property(cc.AudioClip)
    StupefyLine: cc.AudioClip = null;

    P1skill1Audio: cc.AudioClip;
    P1skill2Audio: cc.AudioClip;
    P1skill3Audio: cc.AudioClip;
    P1LineAudio: cc.AudioClip;
    P1LineAudio2: cc.AudioClip = null;
    P2skill1Audio: cc.AudioClip;
    P2skill2Audio: cc.AudioClip;
    P2skill3Audio: cc.AudioClip;
    P2LineAudio: cc.AudioClip;
    P2LineAudio2: cc.AudioClip = null;

    private P1char = 0;
    private P2char = 0;

    P1S1: boolean = false;
    P1S2: boolean = false;
    P1S3: boolean = false;
    P1Normal: boolean = false;

    P2S1: boolean = false;
    P2S2: boolean = false;
    P2S3: boolean = false;
    P2Normal: boolean = false;

    private preP1health = 0;
    private preP2health = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.loader.loadRes("BGM/hogwarts-legacy-all-roads-lead-to-hogsmeade", (err, bgm) => {
            this.BGM1 = bgm;
            cc.audioEngine.playMusic(this.BGM1, true);
        })
        cc.loader.loadRes("BGM/BGM_anticipate_RookWood",() => {}, (err, bgm2) => {
            this.BGM2 = bgm2;
            //console.log(err);
            //cc.audioEngine.playEffect(this.BGM2, false);
        })

        this.P1LineAudio2 = null;
        this.P2LineAudio2 = null;

        // if(DataManager.instance.UserRole == 10) {
        //     this.P1char = DataManager.instance.UserChar;
        //     this.P2char = DataManager.instance.UserChar2;
        // }
        // else {
        //     this.P1char = DataManager.instance.UserChar;
        //     this.P2char = DataManager.instance.opponentChar;
        // }


    }

    start() {
        cc.find("Canvas/Player/player1").active = false;
        cc.find("Canvas/Player/player2").active = false;
        cc.find("Canvas/Player/player3").active = false;
        cc.find("Canvas/Player/player4").active = false;
        cc.find("Canvas/Player/player5").active = false;
        cc.find("Canvas/Player/player6").active = false;
        cc.find("Canvas/Player/player7").active = false;
        cc.find("Canvas/Player/player8").active = false;
        cc.find("Canvas/Player/player9").active = false;



        if (DataManager.instance.UserRole == 10) {
            this.P1char = DataManager.instance.UserChar;
            this.P2char = DataManager.instance.UserChar2;
        }
        else {
            this.P1char = DataManager.instance.UserChar;
            this.P2char = DataManager.instance.opponentChar;
        }
        let s = "player";
        if (DataManager.instance.UserRole == 10) {
            let char1 = DataManager.instance.UserChar.toString();
            cc.find("Canvas/Player/player" + char1).active = true;
            this.Player1 = cc.find("Canvas/Player/player" + char1);
            this.player1 = this.Player1.getComponent(player);

            char1 = DataManager.instance.UserChar2.toString();
            let char2 = cc.find("Canvas/Player/player" + char1);
            char2.active = true;
            char2.setPosition(622.9, 275.859);
            char2.scaleX = -0.2;
            this.Player2 = char2;
            this.player2 = this.Player2.getComponent(player);
            console.log(s + DataManager.instance.UserChar.toString())
            console.log(s + DataManager.instance.UserChar2.toString())
        }
        else {
            if (DataManager.instance.UserRole == 1) {
                let char1 = DataManager.instance.UserChar.toString();
                let char2 = cc.find("Canvas/Player/player" + char1);
                this.Player2 = char2;
                this.player2 = this.Player2.getComponent(player);
                char2.active = true;
                char2.setPosition(622.9, 275.859);
                char2.scaleX = -0.2;

                char1 = DataManager.instance.opponentChar.toString();
                char2 = cc.find("Canvas/Player/player" + char1);
                this.Player1 = char2;
                this.player1 = this.Player1.getComponent(player);
                char2.active = true;
            }
            else if (DataManager.instance.UserRole == 0) {
                let char1 = DataManager.instance.UserChar.toString();
                let char2 = cc.find("Canvas/Player/player" + char1);
                this.Player1 = cc.find("Canvas/Player/player" + char1);
                this.player1 = this.Player1.getComponent(player);
                char2.active = true;

                char1 = DataManager.instance.opponentChar.toString();
                char2 = cc.find("Canvas/Player/player" + char1);
                this.Player2 = char2;
                this.player2 = this.Player2.getComponent(player);
                char2.active = true;
                char2.setPosition(422, 273);
                char2.scaleX = -0.2;
            }
            console.log(s + DataManager.instance.UserChar.toString())
        }

        this.loadSkills();
    }

    update(dt) {
        //health UI
        if (this.preP1health != this.player1.health) {
            var diff = this.preP1health - this.player1.health;
            if (diff > 0) this.UI_health_action("light", 1);
            else if (diff > 100) this.UI_health_action("middle", 1);
            else if (diff > 300) this.UI_health_action("high", 1);
            this.preP1health = this.player1.health;
        }
        if (this.preP2health != this.player2.health) {
            var diff = this.preP2health - this.player2.health;
            if (diff > 0) this.UI_health_action("light", 2);
            else if (diff > 100) this.UI_health_action("middle", 2);
            else if (diff > 300) this.UI_health_action("high", 2);
            this.preP2health = this.player2.health;
        }
        this.p1health.string = Math.trunc(this.player1.health).toString();
        this.p2health.string = Math.trunc(this.player2.health).toString();
        if (!this.player1.normal_attack)
            this.P1Normal = false;

        if (!this.player1.skill1)
            this.P1S1 = false;

        if (!this.player1.skill2)
            this.P1S2 = false;

        if (!this.player1.skill3)
            this.P1S3 = false;

        if (this.player1.normal_attack && !this.P1Normal) {
            this.P1Normal = true;
            cc.audioEngine.playEffect(this.NormalAttack, false);
        }

        if (this.player1.skill1 && !this.P1S1) {
            this.P1S1 = true;
            cc.audioEngine.playEffect(this.P1skill1Audio, false);
        }
        if (this.player1.skill2 && !this.P1S2) {
            this.P1S2 = true;
            cc.audioEngine.playEffect(this.P1skill2Audio, false);
            if (this.P1LineAudio2 != null)
                cc.audioEngine.playEffect(this.P1LineAudio2, false);
        }
        if (this.player1.skill3 && !this.P1S3) {
            this.P1S3 = true;
            cc.audioEngine.playEffect(this.P1skill3Audio, false);
            cc.audioEngine.playEffect(this.P1LineAudio, false);
        }

        if (!this.player2.normal_attack)
            this.P2Normal = false;

        if (!this.player2.skill1)
            this.P2S1 = false;

        if (!this.player2.skill2)
            this.P2S2 = false;

        if (!this.player2.skill3)
            this.P2S3 = false;

        if (this.player2.normal_attack && !this.P2Normal) {
            this.P2Normal = true;
            cc.audioEngine.playEffect(this.NormalAttack, false);
        }

        if (this.player2.skill1 && !this.P2S1) {
            this.P2S1 = true;
            cc.audioEngine.playEffect(this.P2skill1Audio, false);
        }
        if (this.player2.skill2 && !this.P2S2) {
            this.P2S2 = true;
            cc.audioEngine.playEffect(this.P2skill2Audio, false);
            if (this.P2LineAudio2 != null)
                cc.audioEngine.playEffect(this.P2LineAudio2, false);
        }
        if (this.player2.skill3 && !this.P2S3) {
            this.P2S3 = true;
            cc.audioEngine.playEffect(this.P2skill3Audio, false);
            cc.audioEngine.playEffect(this.P2LineAudio, false);
        }
    }


    loadSkills() {
        if (this.P1char == 1) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.Depulso;
            this.P1skill3Audio = this.Accio;
            this.P1LineAudio = this.AccioLine;
            this.P1LineAudio2 = this.DepulsoLine;
            this.player2.skill3Effect = 6;
            this.player2.skill2Effect = 7;
        }
        else if (this.P1char == 2) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.Diffindo;
            this.P1skill3Audio = this.Confringo;
            this.P1LineAudio = this.ConfringoLine;
            this.P1LineAudio2 = this.DiffindoLine;
            this.player2.skill3Effect = 10;
            this.player2.skill2Effect = 10;
        }
        else if (this.P1char == 3) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Levioso;
            this.P1LineAudio = this.LeviosoLine;
            this.player2.skill3Effect = 5;
            this.player2.skill2Effect = 11;
        }
        else if (this.P1char == 4) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Stupefy;
            this.P1LineAudio = this.StupefyLine;
            this.player2.skill3Effect = 9;
            this.player2.skill2Effect = 11;
        }
        else if (this.P1char == 5) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Expelliarmus;
            this.P1LineAudio = this.ExpelliarmusLine;
            this.player2.skill3Effect = 4;
            this.player2.skill2Effect = 11;
        }
        else if (this.P1char == 6) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Glacius;
            this.P1LineAudio = this.GlaciusLine;
            this.player2.skill3Effect = 9;
            this.player2.skill2Effect = 11;
        }
        else if (this.P1char == 7) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Avada_kedavra;
            this.P1LineAudio = this.Avada_kedavraLine;
            this.player2.skill3Effect = 8;
            this.player2.skill2Effect = 11;
        }
        else if (this.P1char == 8) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Crucio;
            this.P1LineAudio = this.CrucioLine;
            this.player2.skill3Effect = 2;
            this.player2.skill2Effect = 11;
        }
        else if (this.P1char == 9) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Incendio;
            this.P1LineAudio = this.IncendioLine;
            this.player2.skill3Effect = 3;
            this.player2.skill2Effect = 11;
        }


        if (this.P2char == 1) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.Depulso;
            this.P2skill3Audio = this.Accio;
            this.P2LineAudio = this.AccioLine;
            this.P2LineAudio2 = this.DepulsoLine;
            this.player1.skill3Effect = 6;
            this.player1.skill2Effect = 7;
        }
        else if (this.P2char == 2) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.Diffindo;
            this.P2skill3Audio = this.Confringo;
            this.P2LineAudio = this.ConfringoLine;
            this.P2LineAudio2 = this.DiffindoLine;
            this.player1.skill3Effect = 10;
            this.player1.skill2Effect = 10;
        }
        else if (this.P2char == 3) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Levioso;
            this.P2LineAudio = this.LeviosoLine;
            this.player1.skill3Effect = 5;
            this.player1.skill2Effect = 11;
        }
        else if (this.P2char == 4) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Stupefy;
            this.P2LineAudio = this.StupefyLine;
            this.player1.skill3Effect = 9;
            this.player1.skill2Effect = 11;
        }
        else if (this.P2char == 5) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Expelliarmus;
            this.P2LineAudio = this.ExpelliarmusLine;
            this.player1.skill3Effect = 4;
            this.player1.skill2Effect = 11;
        }
        else if (this.P2char == 6) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Glacius;
            this.P2LineAudio = this.GlaciusLine;
            this.player1.skill3Effect = 9;
            this.player1.skill2Effect = 11;
        }
        else if (this.P2char == 7) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Avada_kedavra;
            this.P2LineAudio = this.Avada_kedavraLine;
            this.player1.skill3Effect = 8;
            this.player1.skill2Effect = 11;
        }
        else if (this.P2char == 8) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Crucio;
            this.P2LineAudio = this.CrucioLine;
            this.player1.skill3Effect = 2;
            this.player1.skill2Effect = 11;
        }
        else if (this.P2char == 9) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Incendio;
            this.P2LineAudio = this.IncendioLine;
            this.player1.skill3Effect = 3;
            this.player1.skill2Effect = 11;
        }
    }
    UI_health_action(mode: string, player: number) {
        var P1h = cc.find("Canvas/UI/P1health/p1h").getComponent(cc.Label);
        var P2h = cc.find("Canvas/UI/P2health/p2h").getComponent(cc.Label);
        console.log("P1h: ", P1h);

        var Ph = (player == 1) ? P1h : P2h;
        var seq;
        var degree;
        if (mode == "light") degree = 5;
        else if (mode == "middle") degree = 10;
        else if (mode == "high") degree = 15;
        var up = cc.moveBy(0.1, cc.v2(0, degree));
        var down = cc.moveBy(0.1, cc.v2(0, 0 - degree * 2));
        var left = cc.moveBy(0.1, cc.v2(0 - degree, degree));
        var right = cc.moveBy(0.1, cc.v2(2 * degree, 0));
        var back = cc.moveBy(0.1, cc.v2(0 - degree, 0));
        seq = cc.sequence(up, down, left, right, back);
        Ph.node.runAction(seq);
    }
}









