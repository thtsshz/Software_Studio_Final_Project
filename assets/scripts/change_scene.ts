const {ccclass, property} = cc._decorator;

@ccclass
export default class change_scene extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    start () {
        this.getComponent(cc.VideoPlayer).play();
        this.scheduleOnce(function(){
                cc.director.loadScene("Lobby");
        },14);

    }
    update (dt) {

    }
}
