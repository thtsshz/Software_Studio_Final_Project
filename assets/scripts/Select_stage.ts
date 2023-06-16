const { ccclass, property } = cc._decorator;
declare const firebase: any;


@ccclass
export default class SelectStageMgr extends cc.Component {

    onLoad() {
        this.Map1BtnInit();
        this.Map2BtnInit();
        this.SettingBtnInit();
        this.LogoutBtnInit();
        cc.director.preloadScene("Stage1", function () {
            console.log("Stage1 is preloaded");
        });
        cc.director.preloadScene("Stage2", function () {
            console.log("Stage2 is preloaded");
        });
        cc.director.preloadScene("Settings", function () {
            console.log("Settings is preloaded");
        });
        cc.director.preloadScene("game", function () {
            console.log("game is preloaded");
        });
    }

    Map1BtnInit() {
        let Map1btn = new cc.Component.EventHandler();
        Map1btn.target = this.node;
        Map1btn.component = "Select_stage";
        Map1btn.handler = "loadMap_1";
        cc.find("Canvas/Map_1_btn").getComponent(cc.Button).clickEvents.push(Map1btn);
    }

    loadMap_1() {
        cc.director.loadScene("Stage1");
    }

    Map2BtnInit() {
        let Map2btn = new cc.Component.EventHandler();
        Map2btn.target = this.node;
        Map2btn.component = "Select_stage";
        Map2btn.handler = "loadMap_2";
        cc.find("Canvas/Map_2_btn").getComponent(cc.Button).clickEvents.push(Map2btn);
    }

    loadMap_2() {
        cc.director.loadScene("Stage2");
    }

    SettingBtnInit() {
        let Setbtn = new cc.Component.EventHandler();
        Setbtn.target = this.node;
        Setbtn.component = "Select_stage";
        Setbtn.handler = "loadSetting";
        cc.find("Canvas/Setting").getComponent(cc.Button).clickEvents.push(Setbtn);
    }

    loadSetting() {
        cc.director.loadScene("Settings");
    }

    LogoutBtnInit() {
        let Logoutbtn = new cc.Component.EventHandler();
        Logoutbtn.target = this.node;
        Logoutbtn.component = "Select_stage";
        Logoutbtn.handler = "Logout";
        cc.find("Canvas/Logout").getComponent(cc.Button).clickEvents.push(Logoutbtn);
    }

    Logout() {
        firebase.auth().signOut().then(e => {
            console.log("log out successfully");
            cc.director.loadScene("game");
        }).catch(e => {
            console.log("log out error");
        });
    }

}
