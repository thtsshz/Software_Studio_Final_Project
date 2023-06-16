// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
//825.613 585.964
@ccclass
export default class player extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.ProgressBar)
    progressbar:cc.ProgressBar=null;
    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    left_move:boolean=false;
    right_move:boolean=false;
    jump:boolean=false;
    on_ground:boolean=false;
    attack:boolean=false;
    can_attack:boolean=true;

    playerSpeed:number=0;
    attack_time:number=3;
    skill_time:number=1.5;
    private anim=null;

    health : number = 500;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);    
        this.anim=this.getComponent(cc.Animation);
    }
    cancel_basic_attack(){
        console.log('cancel_basic_attack');
        
        this.node.getChildByName('BasicAttack').active=false;
        this.node.getChildByName('FireRay').active=false;
    }
    active_basic_attack(){
        if(this.progressbar.progress>=1){
            this.progressbar.progress=0;
            this.node.getChildByName('FireRay').active=true;
        }
        else{
            this.node.getChildByName('BasicAttack').active=true;

        }
        
    }
    onKeyDown(event) {
        // if(event.keyCode == cc.macro.KEY.u){
        //     this.health += 10;
        // }
        if(this.node.name=='player1'){
            if(event.keyCode == cc.macro.KEY.up&&this.on_ground==true){//jump
                this.jump=true;
                this.on_ground=false;
            }
            else if(event.keyCode==cc.macro.KEY.left){//left
                this.right_move=false;
                this.left_move=true;
            }
            else if(event.keyCode==cc.macro.KEY.right){//right
                this.right_move=true;
                this.left_move=false;
            }
            if(event.keyCode==cc.macro.KEY.down){//skill
                if(this.can_attack){
                    this.attack=true;
                    this.can_attack=false;
                    // this.node.getChildByName('BasicAttack').active=true;

                    if(!this.anim.getAnimationState('player_1_basic_attack').isPlaying){
                        this.anim.play("player_1_basic_attack");
                    }
                    // this.scheduleOnce(function(){
                    //     this.node.getChildByName('BasicAttack').active=false;
                    // },this.skill_time);
                    this.scheduleOnce(
                        function(){this.can_attack=true},this.attack_time
                    );
                }
            }
            if(event.keyCode==cc.macro.KEY.ctrl){
                // console.log('gather');
                // this.progressbar.getComponent('ProgressBar').progressbar
                this.progressbar.progress+=0.02;
            }
        }
        else{
            if(event.keyCode == cc.macro.KEY.w&&this.on_ground==true){//w jump
                this.jump=true;
                this.on_ground=false;
            }
            else if(event.keyCode==cc.macro.KEY.a){//left
                this.right_move=false;
                this.left_move=true;
            }
            else if(event.keyCode==cc.macro.KEY.d){//right
                this.right_move=true;
                this.left_move=false;
            }
            else if(event.keyCode==cc.macro.KEY.s){//skill
                if(this.can_attack){
                    this.attack=true;
                    this.can_attack=false;
                    this.node.getChildByName('Red power').active=true;

                    if(!this.anim.getAnimationState('weasly_attack').isPlaying){
                        this.anim.play("weasly_attack");
                    } 
                    this.scheduleOnce(function(){
                        this.node.getChildByName('Red power').active=false;
                    },this.skill_time);
                    this.scheduleOnce(
                        function(){this.can_attack=true},this.attack_time
                    );
                }
            }
        }
        
    }
    onKeyUp(event){
        if(this.node.name=='player1'){
            if(event.keyCode == cc.macro.KEY.up){//jump
                this.jump=false;
            }
            else if(event.keyCode==cc.macro.KEY.left){//left
                this.left_move=false;
                this.anim.stop("player_1_walk");
            }
            else if(event.keyCode==cc.macro.KEY.right){//right
                this.right_move=false;
                this.anim.stop("player_1_walk");
            }
        }
        else{
            if(event.keyCode == cc.macro.KEY.w){//w jump
                this.jump=false;
            }
            else if(event.keyCode==cc.macro.KEY.a){//left
                this.left_move=false;
                this.anim.stop("weasly_walk");
            }
            else if(event.keyCode==cc.macro.KEY.d){//right
                this.right_move=false;
                this.anim.stop("weasly_walk");
            }
        }
        
    }
    start () {

    }
    onBeginContact(contact,self,other){
        // console.log(contact.getWorldManifold().normal.y);
        if(contact.getWorldManifold().normal.y==-1&&other.node.group=='Ground')
            this.on_ground=true;
        console.log(other.node.name);
        if(other.node.name=='BasicAttack'){
            this.health-=100;
        }
    }
    update (dt) {
        this.playerSpeed=0;
        if(this.left_move) {
            this.playerSpeed=-400;
            this.node.scaleX=-0.2;  // modify node's X scale value to change facing direction
            if(this.node.name=='player1'){
                if(!this.anim.getAnimationState('player_1_walk').isPlaying&&!this.anim.getAnimationState('player_1_basic_attack').isPlaying){
                    this.anim.play("player_1_walk");
                }
            }
            else{
                if(!this.anim.getAnimationState('weasly_walk').isPlaying){
                    this.anim.play("weasly_walk");
                } 
            }
            
            
        } 
        else if(this.right_move) {
            this.playerSpeed=400;
            this.node.scaleX=0.2;  
            if(this.node.name=='player1'){
                if(!this.anim.getAnimationState('player_1_walk').isPlaying&&!this.anim.getAnimationState('player_1_basic_attack').isPlaying){
                    this.anim.play("player_1_walk");
                }
            }
            else{
                if(!this.anim.getAnimationState('weasly_walk').isPlaying){
                    this.anim.play("weasly_walk");
                } 
            }
        }
        else{
            if(this.node.name=='player1'){
                if(!this.anim.getAnimationState('player_1_basic_attack').isPlaying){
                    this.anim.play("player_1_idle");
                }
            }
            else{
                if(!this.anim.getAnimationState('weasly_idle').isPlaying){
                    this.anim.play("weasly_idle");
                } 
            }
        }
        if(this.jump){
            this.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,950);
            this.jump=false;
        }
        //this.node.x += this.playerSpeed *dt; 
        this.getComponent(cc.RigidBody).linearVelocity=cc.v2(this.playerSpeed, this.getComponent(cc.RigidBody).linearVelocity.y);
    }
}
