const { ccclass, property } = cc._decorator;

@ccclass
export default class Settings extends cc.Component {

    onLoad() {
        this.BackBtnInit();
    }

    update(dt) {
        let bgvolume = cc.find("Canvas/BgVolumeSlide").getComponent(cc.Slider);
        let Effectvolume = cc.find("Canvas/BgVolumeSlide").getComponent(cc.Slider);
        // TODO (not test)
        cc.audioEngine.setMusicVolume(bgvolume.progress);
        cc.audioEngine.setEffectsVolume(Effectvolume.progress)
    }

    BackBtnInit() {
        let Backbtn = new cc.Component.EventHandler();
        Backbtn.target = this.node;
        Backbtn.component = "Settings";
        Backbtn.handler = "loadSelectStage";
        cc.find("Canvas/Back").getComponent(cc.Button).clickEvents.push(Backbtn);
    }

    loadSelectStage() {
        cc.director.loadScene("Select_stage");
    }

}
