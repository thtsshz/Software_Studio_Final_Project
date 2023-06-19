// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    other_node :cc.Node;
    contact:boolean=false;
    start () {

    }
    onBeginContact(contact, self, other) {
        if(this.contact)
            return;
        for(var i=1;i<=9;i++){
            if(other.node.name==('player'+i.toString())){
                console.log('hit'+' '+other.node.name);
                this.contact=true;
                this.other_node=other.node;
                this.scheduleOnce(function(){
                    this.node.destroy();
                },4.99);
            }
        }
    }
    update (dt) {
        if(this.contact){
            this.node.x=this.other_node.x;
            this.node.y=this.other_node.y-140;
        }
    }
}
