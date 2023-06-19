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
export default class LeaderBoard extends cc.Component {
    

    names: string[] = [];
    score: number[] = [];

    onLoad () {

    }

    start () {
        firebase.database().ref("User").on("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                // var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                    // console.log(childData.email);
                    // console.log(childData.score);
                this.names.push(childData.Email);
                this.score.push(childData.WinCount);
            });

            for(let i=0; i<this.names.length; i++){
                for(let j=i+1; j<this.names.length; j++){
                    if(this.score[j]>this.score[i]){
                        this.swap(i,j);
                    }
                }
            }
            for(let i=1; i<=5; i++){
                if(i>this.names.length) {
                    cc.find("Canvas/List/L" + i.toString() + "/Label" + i.toString()).getComponent(cc.Label).string = "None"
                    cc.find("Canvas/List/L" + i.toString() + "/Score" + i.toString()).getComponent(cc.Label).string = "NA"
                    continue;
                }
                cc.find("Canvas/List/L" + i.toString() + "/Label" + i.toString()).getComponent(cc.Label).string = this.names[i-1]
                cc.find("Canvas/List/L" + i.toString() + "/Score" + i.toString()).getComponent(cc.Label).string = this.score[i-1].toString();
            }
        })
    }

    update (dt) {}

    swap(i,j){
        var tmp=this.score[j];
        this.score[j]=this.score[i];
        this.score[i]=tmp;
        var tmp2=this.names[j];
        this.names[j]=this.names[i];
        this.names[i]=tmp2;
    }

    ReButton() {
        cc.director.loadScene("Lobby");
    }
}
