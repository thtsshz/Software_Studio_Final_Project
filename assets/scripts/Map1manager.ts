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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        this.p1health.string = Math.trunc(this.player1.health).toString();
        this.p2health.string = Math.trunc(this.player2.health).toString();
    }
}
