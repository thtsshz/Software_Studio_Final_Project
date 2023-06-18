const { ccclass, property } = cc._decorator;
import { DataManager } from "./DataManager";

@ccclass
export default class Settings extends cc.Component {

    @property(cc.Label)
    BKvol : cc.Label = null;
    @property(cc.Label)
    EFvol : cc.Label = null;

    onLoad() {
        this.BackBtnInit();
        cc.find("Canvas/BgVolumeSlide").getComponent(cc.Slider).progress = DataManager.instance.BackgroundVolume;
        cc.find("Canvas/EffectVolumeSlide").getComponent(cc.Slider).progress = DataManager.instance.EffectVolume;
    }

    update(dt) {
        let bgvolume = cc.find("Canvas/BgVolumeSlide").getComponent(cc.Slider);
        let Effectvolume = cc.find("Canvas/EffectVolumeSlide").getComponent(cc.Slider);
        DataManager.instance.BackgroundVolume = bgvolume.progress;
        DataManager.instance.EffectVolume = Effectvolume.progress;
        this.BKvol.string = Math.trunc(bgvolume.progress * 100).toString();
        this.EFvol.string = Math.trunc(Effectvolume.progress * 100).toString();
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
        cc.director.loadScene("Lobby");
    }

}
