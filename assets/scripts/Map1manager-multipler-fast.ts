const {ccclass, property} = cc._decorator;
import { DataManager } from "./DataManager";
import Map1multiplayerC from "./Map1multiplayerC";
import Map1multiplayerS from "./Map1multiplayerS";
import player from "./player";

@ccclass
export default class Map1mgrMultiplayerF extends cc.Component {

    Player1: cc.Node = null;
    Player2: cc.Node = null;
    player1: Map1multiplayerC = null;
    player2: Map1multiplayerC = null;

    SPlayer1: cc.Node = null;
    SPlayer2: cc.Node = null;
    Splayer1: Map1multiplayerS = null;
    Splayer2: Map1multiplayerS = null;

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

    keyboarddata : keyboardstats = null;
    private server_sock = null;
    serverconnected = false;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.loader.loadRes("BGM/hogwarts-legacy-everybody-grab-a-broom", (err, bgm) => {
            this.BGM1 = bgm;
        })
        cc.loader.loadRes("BGM/BGM_anticipate_RookWood",() => {}, (err, bgm2) => {
            this.BGM2 = bgm2;
        })

        this.P1LineAudio2 = null;
        this.P2LineAudio2 = null;
        if(DataManager.instance.UserRole == 0) this.server_connect_to_db();
    }
    protected onDestroy(): void {
        this.server_sock.close();
    }
    server_connect_to_db(){
        if(this.server_sock) delete this.server_sock;
        this.server_sock = new WebSocket("ws://192.168.50.62:8081/server");
        this.server_sock.onopen = () => {
            console.log(`[server][open] Connected}`);
            this.serverconnected = true;
        }
        this.server_sock.onclose = (e) => {
            if (e.wasClean) {
                console.log(`[server][close] Connection closed, code=${e.code} reason=${e.reason}`);
            } else {
                console.log(`[server][close] Connection died, code=${e.code} reason=${e.reason}`);
            }
            this.serverconnected = false;
        }
        this.server_sock.onerror = (e) => {
            console.log(`[server][error] ${e.message}`);
        };

        this.server_sock.onmessage = (e) => {
            // console.log("[server][recv]", e.data, performance.now() - JSON.parse(e.data).ts);
            this.keyboarddata = JSON.parse(e.data);

            //update splayers.
            console.log("server receive data ! ", this.keyboarddata.name);
            if(this.keyboarddata.name == 0){
                if(this.keyboarddata.updown == 0)this.Splayer1.onKeyDown(this.keyboarddata.key);
                else this.Splayer1.onKeyUp(this.keyboarddata.key);
            }
            if(this.keyboarddata.name == 1){
                if(this.keyboarddata.updown == 0)this.Splayer2.onKeyDown(this.keyboarddata.key);
                else this.Splayer2.onKeyUp(this.keyboarddata.key);
            }
            
            // if(DataManager.instance.UserRole == 0 && this.keyboarddata.name == 1){
            //     if(this.keyboarddata.key == "s")this.player2.CustomKeyDown(cc.macro.KEY.s);
            // }
            // if(DataManager.instance.UserRole == 1 && this.keyboarddata.name == 0){
            //     if(this.keyboarddata.key == "down")this.player1.CustomKeyDown(cc.macro.KEY.down);
            // }
        }
    }

    uploaddata(){
        if(!this.serverconnected || DataManager.instance.UserRole)return ;
        var data : playerstatus = {
            0 : {
                x : this.Splayer1.node.x,
                y : this.Splayer1.node.y,
                health : this.Splayer1.health
            },
            1 : {
                x : this.Splayer2.node.x,
                y : this.Splayer2.node.y,
                health : this.Splayer2.health
            }
        }
        this.server_sock.send(JSON.stringify(data));
    }
    
    start () {
        console.log("start");

        cc.find("Canvas/Player/player1").active = false;        
        cc.find("Canvas/Player/player2").active = false; 
        cc.find("Canvas/Player/player3").active = false; 
        cc.find("Canvas/Player/player4").active = false; 
        cc.find("Canvas/Player/player5").active = false;        
        cc.find("Canvas/Player/player6").active = false; 
        cc.find("Canvas/Player/player7").active = false; 
        cc.find("Canvas/Player/player8").active = false; 
        cc.find("Canvas/Player/player9").active = false; 

        cc.find("Canvas/SPlayer/player1").active = false;        
        cc.find("Canvas/SPlayer/player2").active = false; 
        cc.find("Canvas/SPlayer/player3").active = false; 
        cc.find("Canvas/SPlayer/player4").active = false; 
        cc.find("Canvas/SPlayer/player5").active = false;        
        cc.find("Canvas/SPlayer/player6").active = false; 
        cc.find("Canvas/SPlayer/player7").active = false; 
        cc.find("Canvas/SPlayer/player8").active = false; 
        cc.find("Canvas/SPlayer/player9").active = false; 
        

        if(DataManager.instance.UserRole == 10) {
            this.P1char = DataManager.instance.UserChar;
            this.P2char = DataManager.instance.UserChar2;
        }
        else {
            if(DataManager.instance.UserRole == 0) {
                this.P1char = DataManager.instance.UserChar;
                this.P2char = DataManager.instance.opponentChar;
            }
            else {
                this.P2char = DataManager.instance.UserChar;
                this.P1char = DataManager.instance.opponentChar;
            }
        }
        let s = "player";
        if(DataManager.instance.UserRole == 10) {

            console.log("single player");

            let char1 = DataManager.instance.UserChar.toString();
            cc.find("Canvas/Player/player"+char1).active = true;
            this.Player1 = cc.find("Canvas/Player/player"+char1);
            this.player1 = this.Player1.getComponent(Map1multiplayerC);

            char1 = DataManager.instance.UserChar2.toString();
            let char2 = cc.find("Canvas/Player/player"+char1);
            char2.active = true;
            char2.setPosition(422,273);
            char2.scaleX = -0.2;
            this.Player2 = char2;
            this.player2 = this.Player2.getComponent(Map1multiplayerC);
            console.log(s+DataManager.instance.UserChar.toString())
            console.log(s+DataManager.instance.UserChar2.toString())
        }
        else {
            if(DataManager.instance.UserRole == 1) {
                let char1: string = DataManager.instance.UserChar.toString();
                console.log(char1);
                let char2 = cc.find("Canvas/Player/player"+char1);
                this.Player2 = char2;
                this.player2 = this.Player2.getComponent(Map1multiplayerC);
                char2.active = true;
                char2.setPosition(422,273);
                char2.scaleX = -0.2;
                
                char1 = DataManager.instance.opponentChar.toString();
                console.log(char1);
                char2 = cc.find("Canvas/Player/player"+char1);
                this.Player1 = char2;
                this.player1 = this.Player1.getComponent(Map1multiplayerC);
                char2.active = true;
                console.log("char : ", char1, char2)
                console.log(this.player1)
                console.log(this.Player1.getComponent(Map1multiplayerC))

                //#multi
                char1 = DataManager.instance.UserChar.toString();
                char2 = cc.find("Canvas/SPlayer/player"+char1);
                this.SPlayer2 = char2;
                this.Splayer2 = this.SPlayer2.getComponent(Map1multiplayerS);
                char2.active = true;
                char2.setPosition(422,273);
                char2.scaleX = -0.2;

                char1 = DataManager.instance.opponentChar.toString();
                char2 = cc.find("Canvas/SPlayer/player"+char1);
                this.SPlayer1 = char2;
                this.Splayer1 = this.SPlayer1.getComponent(Map1multiplayerS);
                char2.active = true;
                console.log(this.player1)
            }
            else if(DataManager.instance.UserRole == 0) {
                let char0 : string = DataManager.instance.UserChar.toString();
                console.log(char0);
                
                let char2 = cc.find("Canvas/Player/player"+char0);
                this.Player1 = cc.find("Canvas/Player/player"+char0);
                this.player1 = this.Player1.getComponent(Map1multiplayerC);
                char2.active = true;

                console.log("char : ", char0, char2)
                console.log(this.player1)
                console.log(this.Player1.getComponent(player))

                char0 = DataManager.instance.opponentChar.toString();
                console.log("cc", char0);
                char2 = cc.find("Canvas/Player/player"+char0);
                this.Player2 = char2;
                this.player2 = this.Player2.getComponent(Map1multiplayerC);
                char2.active = true;
                char2.setPosition(422,273);
                char2.scaleX = -0.2;

                //#multi
                char0 = DataManager.instance.UserChar.toString();
                char2 = cc.find("Canvas/SPlayer/player"+char0);
                this.SPlayer1 = cc.find("Canvas/SPlayer/player"+char0);
                this.Splayer1 = this.SPlayer1.getComponent(Map1multiplayerS);
                char2.active = true;

                char0 = DataManager.instance.opponentChar.toString();
                char2 = cc.find("Canvas/SPlayer/player"+char0);
                this.SPlayer2 = char2;
                this.Splayer2 = this.SPlayer2.getComponent(Map1multiplayerS);
                char2.active = true;
                char2.setPosition(422,273);
                char2.scaleX = -0.2;
                console.log(this.player1)
            }
            console.log(s+DataManager.instance.UserChar.toString())
        }

        this.loadSkills();
    }

    private nowtime : number = 0;
    private nextconnectiontime : number = 10;

    update (dt) {
        // return ;
        this.nowtime += dt;
        if(!this.serverconnected && this.nowtime >= this.nextconnectiontime){
            this.nextconnectiontime = this.nowtime + 1;
            console.log("connection failed, trying to connect to server...");
            this.server_connect_to_db();
        }

        this.uploaddata();

        if(this.player1 == null) console.log("player1 is null");
        else this.p1health.string = Math.trunc(this.player1.health).toString();
        if(this.player1 == null) console.log("player2 is null");
        else this.p2health.string = Math.trunc(this.player2.health).toString();
        if(!this.player1.normal_attack)
            this.P1Normal = false;

        if(!this.player1.skill1)
            this.P1S1 = false;

        if(!this.player1.skill2)
            this.P1S2 = false;

        if(!this.player1.skill3)
            this.P1S3 = false;

        if(this.player1.normal_attack && !this.P1Normal) {
            this.P1Normal = true;
            cc.audioEngine.playEffect(this.NormalAttack, false);
        }

        if(this.player1.skill1 && !this.P1S1) {
            this.P1S1 = true;
            cc.audioEngine.playEffect(this.P1skill1Audio, false);
        }
        if(this.player1.skill2 && !this.P1S2) {
            this.P1S2 = true;
            cc.audioEngine.playEffect(this.P1skill2Audio, false);
            if(this.P1LineAudio2 != null)
                cc.audioEngine.playEffect(this.P1LineAudio2, false);
        }
        if(this.player1.skill3 && !this.P1S3) {
            this.P1S3 = true;
            cc.audioEngine.playEffect(this.P1skill3Audio, false);
            cc.audioEngine.playEffect(this.P1LineAudio, false);
        }

        if(!this.player2.normal_attack)
            this.P2Normal = false;

        if(!this.player2.skill1)
            this.P2S1 = false;

        if(!this.player2.skill2)
            this.P2S2 = false;

        if(!this.player2.skill3)
            this.P2S3 = false;

        if(this.player2.normal_attack && !this.P2Normal) {
            this.P2Normal = true;
            cc.audioEngine.playEffect(this.NormalAttack, false);
        }

        if(this.player2.skill1 && !this.P2S1) {
            this.P2S1 = true;
            cc.audioEngine.playEffect(this.P2skill1Audio, false);
        }
        if(this.player2.skill2 && !this.P2S2) {
            this.P2S2 = true;
            cc.audioEngine.playEffect(this.P2skill2Audio, false);
            if(this.P2LineAudio2 != null)
                cc.audioEngine.playEffect(this.P2LineAudio2, false);
        }
        if(this.player2.skill3 && !this.P2S3) {
            this.P2S3 = true;
            cc.audioEngine.playEffect(this.P2skill3Audio, false);
            cc.audioEngine.playEffect(this.P2LineAudio, false);
        }
    }


    loadSkills() {
        if(this.P1char == 1) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.Depulso;
            this.P1skill3Audio = this.Accio;
            this.P1LineAudio = this.AccioLine;
            this.P1LineAudio2 = this.DepulsoLine;
            this.player2.skill3Effect = 6;
            this.player2.skill2Effect = 7;
        }
        else if(this.P1char == 2) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.Diffindo;
            this.P1skill3Audio = this.Confringo;
            this.P1LineAudio = this.ConfringoLine;
            this.P1LineAudio2 = this.DiffindoLine;
            this.player2.skill3Effect = 10;
            this.player2.skill2Effect = 10;
        }
        else if(this.P1char == 3) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Levioso;
            this.P1LineAudio = this.LeviosoLine;
            this.player2.skill3Effect = 5;
            this.player2.skill2Effect = 11;
        }
        else if(this.P1char == 4) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Stupefy;
            this.P1LineAudio = this.StupefyLine;
            this.player2.skill3Effect = 9;
            this.player2.skill2Effect = 11;
        }
        else if(this.P1char == 5) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Expelliarmus;
            this.P1LineAudio = this.ExpelliarmusLine;
            this.player2.skill3Effect = 4;
            this.player2.skill2Effect = 11;
        }
        else if(this.P1char == 6) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Glacius;
            this.P1LineAudio = this.GlaciusLine;
            this.player2.skill3Effect = 9;
            this.player2.skill2Effect = 11;
        }
        else if(this.P1char == 7) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Avada_kedavra;
            this.P1LineAudio = this.Avada_kedavraLine;
            this.player2.skill3Effect = 8;
            this.player2.skill2Effect = 11;
        }
        else if(this.P1char == 8) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Crucio;
            this.P1LineAudio = this.CrucioLine;
            this.player2.skill3Effect = 2;
            this.player2.skill2Effect = 11;
        }
        else if(this.P1char == 9) {
            this.P1skill1Audio = this.J;
            this.P1skill2Audio = this.K;
            this.P1skill3Audio = this.Incendio;
            this.P1LineAudio = this.IncendioLine;
            this.player2.skill3Effect = 3;
            this.player2.skill2Effect = 11;
        }


        if(this.P2char == 1) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.Depulso;
            this.P2skill3Audio = this.Accio;
            this.P2LineAudio = this.AccioLine;
            this.P2LineAudio2 = this.DepulsoLine;
            this.player1.skill3Effect = 6;
            this.player1.skill2Effect = 7;
        }
        else if(this.P2char == 2) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.Diffindo;
            this.P2skill3Audio = this.Confringo;
            this.P2LineAudio = this.ConfringoLine;
            this.P2LineAudio2 = this.DiffindoLine;
            this.player1.skill3Effect = 10;
            this.player1.skill2Effect = 10;
        }
        else if(this.P2char == 3) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Levioso;
            this.P2LineAudio = this.LeviosoLine;
            this.player1.skill3Effect = 5;
            this.player1.skill2Effect = 11;
        }
        else if(this.P2char == 4) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Stupefy;
            this.P2LineAudio = this.StupefyLine;
            this.player1.skill3Effect = 9;
            this.player1.skill2Effect = 11;
        }
        else if(this.P2char == 5) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Expelliarmus;
            this.P2LineAudio = this.ExpelliarmusLine;
            this.player1.skill3Effect = 4;
            this.player1.skill2Effect = 11;
        }
        else if(this.P2char == 6) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Glacius;
            this.P2LineAudio = this.GlaciusLine;
            this.player1.skill3Effect = 9;
            this.player1.skill2Effect = 11;
        }
        else if(this.P2char == 7) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Avada_kedavra;
            this.P2LineAudio = this.Avada_kedavraLine;
            this.player1.skill3Effect = 8;
            this.player1.skill2Effect = 11;
        }
        else if(this.P2char == 8) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Crucio;
            this.P2LineAudio = this.CrucioLine;
            this.player1.skill3Effect = 2;
            this.player1.skill2Effect = 11;
        }
        else if(this.P2char == 9) {
            this.P2skill1Audio = this.J;
            this.P2skill2Audio = this.K;
            this.P2skill3Audio = this.Incendio;
            this.P2LineAudio = this.IncendioLine;
            this.player1.skill3Effect = 3;
            this.player1.skill2Effect = 11;
        }
    }
}


class keyboardstats{
    name : number;
    character : number;
    key : string;
    updown : number;
}

class playerstatus{
    0 : {
        x : number;
        y : number; 
        health : number;
    };
    1 : {
        x : number;
        y : number;
        health : number;
    };
}



