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
export default class SelectCharacter extends cc.Component {

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
    MudiwaOnai: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    MudiwaOnaiSelect: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    ProfessorBlack: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    ProfessorBlackSelect: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    RookWood: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    RookWoodSelect: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    GhostNick: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    GhostNickSelect: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    GhostBloodyBaron: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    GhostBloodyBaronSelect: cc.SpriteFrame = null;



    @property(cc.Button)
    ReadyButton: cc.Button = null;

    @property(cc.Button)
    WaitLabel: cc.Button = null;

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
        this.WaitLabel.node.active = false;
    }

    start () {
        firebase.database().ref("rooms/" + DataManager.instance.MultiplayerRoomID.toString()).once("value", (room) => {
            this.Room = room.val();
        }).then(() => {
            if(this.Room.P2 == 1) {
                this.WaitLabel.node.active = true;
                this.isWaiting = true;
                firebase.database().ref("rooms/" + DataManager.instance.MultiplayerRoomID.toString()).on("value", (room) => {
                    this.Room = room.val();
                    if(this.Room.P2 != 1) {
                        this.WaitLabel.node.active = false;
                        this.isWaiting = false;
                        this.getOpponent();
                    }
                })
            }
            else {
                this.getOpponent();
                this.isWaiting = false;
            }
            // console.log(DataManager.instance.UserName);
            // if(this.Room[0] == DataManager.instance.UserUID) {
            //     this.opponentID = this.Room[1];
            //     this.Role = 0;
            // }
            // else {
            //     this.opponentID = this.Room[0];
            //     this.Role = 1;
            // }

            // firebase.database().ref("User/" + this.opponentID).on("value", (snap) => {
            //     this.opponentChar = snap.val().Character;
            //     this.oppenentReady = snap.val().isReady;
            //     console.log(this.opponentChar);
            //     cc.find("Canvas/All_characters/Character1/AbrahamRonen").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            //     cc.find("Canvas/All_characters/Character2/AesopSharp").getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            //     cc.find("Canvas/All_characters/Character3/MatildaWeasly").getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            //     cc.find("Canvas/All_characters/Character4/EleazarFig").getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            //     cc.find("Canvas/All_characters/Character5/DinahHecat").getComponent(cc.Sprite).spriteFrame = this.DinahHecat;
            //     cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = null;

            //     if(this.opponentChar == 1) {
            //         cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            //         cc.find("Canvas/All_characters/Character1/AbrahamRonen").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonenSelect;
            //     }
            //     else if(this.opponentChar == 2) {
            //         cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            //         cc.find("Canvas/All_characters/Character2/AesopSharp").getComponent(cc.Sprite).spriteFrame = this.AesopSharpSelect;
            //     }
            //     else if(this.opponentChar == 3) {
            //         cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            //         cc.find("Canvas/All_characters/Character3/MatildaWeasly").getComponent(cc.Sprite).spriteFrame = this.MatildaWeaslySelect;
            //     }
            //     else if(this.opponentChar == 4) {
            //         cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            //         cc.find("Canvas/All_characters/Character4/EleazarFig").getComponent(cc.Sprite).spriteFrame = this.EleazarFigSelect;
            //     }
            //     else if(this.opponentChar == 5) {
            //         cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.DinahHecat;
            //         cc.find("Canvas/All_characters/Character5/DinahHecat").getComponent(cc.Sprite).spriteFrame = this.DinahHecatSelect;
            //     }

            //     if(this.oppenentReady && this.isReady) {
            //         this.scheduleOnce(() => {
            //             if(!this.Role) {
            //                 firebase.database().ref("rooms/0/0").set(1);
            //             }
            //             else {
            //                 firebase.database().ref("rooms/0/1").set(1);
            //             }
            //             firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 0, isReady: false});
            //             cc.director.loadScene("Select_map");
            //         }, 1)
            //     }
            // })
        })
    }

    getOpponent() {
        console.log(DataManager.instance.UserName);
            if(this.Room.P1 == DataManager.instance.UserUID) {
                this.opponentID = this.Room.P2;
                this.Role = 0;
            }
            else {
                this.opponentID = this.Room.P1;
                this.Role = 1;
            }

        firebase.database().ref("User/" + this.opponentID).on("value", (snap) => {
            this.opponentChar = snap.val().Character;
            this.oppenentReady = snap.val().isReady;
            console.log(this.opponentChar);
            if(this.opponentChar != 0)
                DataManager.instance.opponentChar = this.opponentChar;
            cc.find("Canvas/All_characters/Character1/AbrahamRonen").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            cc.find("Canvas/All_characters/Character2/AesopSharp").getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            cc.find("Canvas/All_characters/Character3/MatildaWeasly").getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            cc.find("Canvas/All_characters/Character4/EleazarFig").getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            cc.find("Canvas/All_characters/Character5/MudiwaOnai").getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
            cc.find("Canvas/All_characters/Character6/MudiwaOnai").getComponent(cc.Sprite).spriteFrame = this.ProfessorBlack;
            cc.find("Canvas/All_characters/Character7/AesopSharp").getComponent(cc.Sprite).spriteFrame = this.RookWood;
            cc.find("Canvas/All_characters/Character8/MatildaWeasly").getComponent(cc.Sprite).spriteFrame = this.GhostNick;
            cc.find("Canvas/All_characters/Character9/EleazarFig").getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;
            
            cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = null;

            if(this.opponentChar == 1) {
                cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
                cc.find("Canvas/All_characters/Character1/AbrahamRonen").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonenSelect;
            }
            else if(this.opponentChar == 2) {
                cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
                cc.find("Canvas/All_characters/Character2/AesopSharp").getComponent(cc.Sprite).spriteFrame = this.AesopSharpSelect;
            }
            else if(this.opponentChar == 3) {
                cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
                cc.find("Canvas/All_characters/Character3/MatildaWeasly").getComponent(cc.Sprite).spriteFrame = this.MatildaWeaslySelect;
            }
            else if(this.opponentChar == 4) {
                cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
                cc.find("Canvas/All_characters/Character4/EleazarFig").getComponent(cc.Sprite).spriteFrame = this.EleazarFigSelect;
            }
            else if(this.opponentChar == 5) {
                cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
                cc.find("Canvas/All_characters/Character5/MudiwaOnai").getComponent(cc.Sprite).spriteFrame = this.MudiwaOnaiSelect;
            }
            else if(this.opponentChar == 6) {
                cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.ProfessorBlack;
                cc.find("Canvas/All_characters/Character6/MudiwaOnai").getComponent(cc.Sprite).spriteFrame = this.ProfessorBlackSelect;
            }
            else if(this.opponentChar == 7) {
                cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.RookWood;
                cc.find("Canvas/All_characters/Character7/AesopSharp").getComponent(cc.Sprite).spriteFrame = this.RookWoodSelect;
            }
            else if(this.opponentChar == 8) {
                cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.GhostNick;
                cc.find("Canvas/All_characters/Character8/MatildaWeasly").getComponent(cc.Sprite).spriteFrame = this.GhostNickSelect;
            }
            else if(this.opponentChar == 9) {
                cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;
                cc.find("Canvas/All_characters/Character9/EleazarFig").getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaronSelect;
            }

            if(this.oppenentReady && this.isReady) {
                this.scheduleOnce(() => {
                    // if(!this.Role) {
                    //     firebase.database().ref("rooms/0/0").set(1);
                    // }
                    // else {
                    //     firebase.database().ref("rooms/0/1").set(1);
                    // }
                    firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 0, isReady: false});
                    cc.director.loadScene("Select_map");
                }, 0.8)
            }
        })
    }

    update (dt) {
        // if(this.oppenentReady && this.isReady) {
        //     this.scheduleOnce(() => {
        //         if(!this.Role) {
        //             firebase.database().ref("rooms/0/0").set(1);
        //         }
        //         else {
        //             firebase.database().ref("rooms/0/1").set(1);
        //         }
        //         firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 0, isReady: false});
        //         cc.director.loadScene("Select_stage");
        //     }, 1)

        // }
    }
    
    select1() {
        if(!this.isWaiting && !this.P1selected && this.opponentChar!=1) {
            this.P1char = 1;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "AbrahamRonen";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
            firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 1});
        }
        // else if(this.P1char != 1 && !this.P2selected){
        //     this.P2char = 1;
        //     let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
        //     node.getComponent(cc.Label).string = "AbrahamRonen";
        //     cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonen;
        // }
    }

    select2() {
        if(!this.isWaiting && !this.P1selected && this.opponentChar!=2) {
            this.P1char = 2;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "AesopSharp";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
            firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 2});
        }
        // else if(this.P1char != 2 && !this.P2selected){
        //     this.P2char = 2;
        //     let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
        //     node.getComponent(cc.Label).string = "AesopSharp";
        //     cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.AesopSharp;
        // }
    }

    select3() {
        if(!this.isWaiting && !this.P1selected && this.opponentChar!=3) {
            this.P1char = 3;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "MatildaWeasly";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
            firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 3});
        }
        // else if(this.P1char != 3 && !this.P2selected){
        //     this.P2char = 3;
        //     let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
        //     node.getComponent(cc.Label).string = "MatildaWeasly";
        //     cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.MatildaWeasly;
        // }
    }

    select4() {
        if(!this.isWaiting && !this.P1selected && this.opponentChar!=4) {
            this.P1char = 4;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "EleazarFig";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
            firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 4});
        }
        // else if(this.P1char != 4 && !this.P2selected){
        //     this.P2char = 4;
        //     let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
        //     node.getComponent(cc.Label).string = "EleazarFig";
        //     cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.EleazarFig;
        // }
    }

    select5() {
        if(!this.isWaiting && !this.P1selected && this.opponentChar!=5) {
            this.P1char = 5;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "MudiwaOnai";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
            firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 5});
        }
        // else if(this.P1char != 5 && !this.P2selected){
        //     this.P2char = 5;
        //     let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
        //     node.getComponent(cc.Label).string = "DinahHecat";
        //     cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.DinahHecat;
        // }
    }

    select6() {
        if(!this.isWaiting && !this.P1selected && this.opponentChar!=6) {
            this.P1char = 6;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "Professor Black";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.ProfessorBlack;
            firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 6});
        }
        // else if(this.P1char != 5 && !this.P2selected){
        //     this.P2char = 5;
        //     let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
        //     node.getComponent(cc.Label).string = "DinahHecat";
        //     cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.DinahHecat;
        // }
    }

    select7() {
        if(!this.isWaiting && !this.P1selected && this.opponentChar!=7) {
            this.P1char = 7;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "RookWood";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.RookWood;
            firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 7});
        }
        // else if(this.P1char != 5 && !this.P2selected){
        //     this.P2char = 5;
        //     let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
        //     node.getComponent(cc.Label).string = "DinahHecat";
        //     cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.DinahHecat;
        // }
    }

    select8() {
        if(!this.isWaiting && !this.P1selected && this.opponentChar!=8) {
            this.P1char = 8;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "Ghost Nick";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.GhostNick;
            firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 8});
        }
        // else if(this.P1char != 5 && !this.P2selected){
        //     this.P2char = 5;
        //     let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
        //     node.getComponent(cc.Label).string = "DinahHecat";
        //     cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.DinahHecat;
        // }
    }

    select9() {
        if(!this.isWaiting && !this.P1selected && this.opponentChar!=9) {
            this.P1char = 9;
            let node = cc.find("Canvas/All_characters/SelectedChar/head/namebg/name");
            node.getComponent(cc.Label).string = "Ghost Bloody Baron";
            cc.find("Canvas/All_characters/SelectedChar/head").getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;
            firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 9});
        }
        // else if(this.P1char != 5 && !this.P2selected){
        //     this.P2char = 5;
        //     let node = cc.find("Canvas/All_characters/Player2Char/head/namebg/name");
        //     node.getComponent(cc.Label).string = "DinahHecat";
        //     cc.find("Canvas/All_characters/Player2Char/head").getComponent(cc.Sprite).spriteFrame = this.DinahHecat;
        // }
    }

    P1select() {
        if(!this.P1selected) {
            this.P1selected = true;
            cc.find("Canvas/All_characters/SelectedChar/P1Select").getComponent(cc.Button).interactable = false;
            firebase.database().ref("/").update({P1: this.P1char});
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
                cc.find("Canvas/All_characters/Character5/MudiwaOnai").getComponent(cc.Sprite).spriteFrame = this.MudiwaOnai;
            }
            else if(this.P1char == 6) {
                cc.find("Canvas/All_characters/Character6/MudiwaOnai").getComponent(cc.Sprite).spriteFrame = this.ProfessorBlack;
            }
            else if(this.P1char == 7) {
                cc.find("Canvas/All_characters/Character7/AesopSharp").getComponent(cc.Sprite).spriteFrame = this.RookWood;
            }
            else if(this.P1char == 8) {
                cc.find("Canvas/All_characters/Character8/MatildaWeasly").getComponent(cc.Sprite).spriteFrame = this.GhostNick;
            }
            else if(this.P1char == 9) {
                cc.find("Canvas/All_characters/Character9/EleazarFig").getComponent(cc.Sprite).spriteFrame = this.GhostBloodyBaron;
            }
            this.isReady = true;
            firebase.database().ref("User/" + DataManager.instance.UserUID).update({isReady: true}).then(() => {
                if(this.oppenentReady && this.isReady) {
                    //this.scheduleOnce(() => {
                        // if(!this.Role) {
                        //     firebase.database().ref("rooms/0/0").set(1);
                        // }
                        // else {
                        //     firebase.database().ref("rooms/0/1").set(1);
                        // }
                        firebase.database().ref("User/" + DataManager.instance.UserUID).update({Character: 0, isReady: false}).then(() => {
                            this.scheduleOnce(() => {
                                cc.director.loadScene("Select_map");
                            }, 1)
                        });
                        
                    //}, 1)
        
                }
                    
            })
        }
        
    }

    // P2select() {
    //     if(!this.P2selected) {
    //         this.P2selected = true;
    //         cc.find("Canvas/All_characters/Player2Char/P2Select").getComponent(cc.Button).interactable = false;
    //         firebase.database().ref("/").update({P2: this.P2char});

    //         if(this.P2char == 1) {
    //             cc.find("Canvas/All_characters/Character1/AbrahamRonen").getComponent(cc.Sprite).spriteFrame = this.AbrahamRonenSelect;
    //         }
    //         else if(this.P2char == 2) {
    //             cc.find("Canvas/All_characters/Character2/AesopSharp").getComponent(cc.Sprite).spriteFrame = this.AesopSharpSelect;
    //         }
    //         else if(this.P2char == 3) {
    //             cc.find("Canvas/All_characters/Character3/MatildaWeasly").getComponent(cc.Sprite).spriteFrame = this.MatildaWeaslySelect;
    //         }
    //         else if(this.P2char == 4) {
    //             cc.find("Canvas/All_characters/Character4/EleazarFig").getComponent(cc.Sprite).spriteFrame = this.EleazarFigSelect;
    //         }
    //         else if(this.P2char == 5) {
    //             cc.find("Canvas/All_characters/Character5/DinahHecat").getComponent(cc.Sprite).spriteFrame = this.DinahHecatSelect;
    //         }

    //         this.ReadyButton.node.active = true;
    //     }
    // }

    // Ready() {
    //     cc.director.loadScene("Select_stage");
    // }

}
