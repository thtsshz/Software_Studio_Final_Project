const { ccclass, property } = cc._decorator;
import { DataManager } from "./DataManager";

class keyboardstats{
    name : number;
    character : number;
    keyw : number;
    keya : number;
    keys : number;
    keyd : number;
    keyr : number;
    keyt : number;
    keyy : number;
    keyup : number;
    keydown : number;
    keyleft : number;
    keyright : number;
    keyj : number;
    keyk : number;
    keyl : number;
}

@ccclass
export default class Map1multiplayerS extends cc.Component {

    @property(cc.ProgressBar)
    progressbar: cc.ProgressBar = null;
    @property(cc.ProgressBar)
    progressbar2: cc.ProgressBar = null;

    @property(cc.ParticleSystem)
    private GatherParticle: cc.ParticleSystem = null;

    // @property(cc.Camera)
    // camera: cc.Camera = null;
    // LIFE-CYCLE CALLBACKS:
    left_move: boolean = false;
    right_move: boolean = false;
    down_move: boolean = false;
    up_move: boolean = false;
    jump: boolean = false;
    on_ground: boolean = false;
    attack: boolean = false;
    can_attack: boolean = true;
    moveable: boolean = true;
    floating: boolean = false;
    continuedamage: boolean = false;
    skillpush: boolean = false;
    on_broom: boolean = false;

    playerSpeed: number = 0;
    playerSpeed_y: number = 0;
    attack_time: number = 1.5;
    skill_time1: number = 3;
    skill_time2: number = 4;
    skill_time3: number = 5;
    private anim = null;

    health: number = 500;
    MaxHealth: number = 5000;

    skill1: boolean = false;
    skill2: boolean = false;
    skill3: boolean = false;
    normal_attack: boolean = false;

    skill1_Cooldown: boolean = false;
    skill2_Cooldown: boolean = false;
    skill3_Cooldown: boolean = false;

    skill3Effect: number;
    skill2Effect: number;

    inAttack: boolean = false;
    keyboarddata : keyboardstats = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.anim = this.getComponent(cc.Animation);
        DataManager.instance.gameover = false;
    }
    cancel_basic_attack() {
        console.log('cancel_basic_attack');

        this.node.getChildByName('BasicAttack').active = false;
        this.node.getChildByName('J').active = false;
        this.node.getChildByName('K').active = false;
        this.node.getChildByName('L').active = false;
    }
    active_basic_attack() {
        console.log('active_basic_attack');
        this.scheduleOnce(() => {
            this.inAttack = false;
        }, 1);
        if (this.skill1) {
            this.skill1 = false;
            this.node.getChildByName('J').active = true;
        }
        else if (this.skill2) {
            this.skill2 = false;
            this.node.getChildByName('K').active = true;
        }
        else if (this.skill3) {
            this.skill3 = false;
            this.node.getChildByName('L').active = true;
        }
        else {
            this.normal_attack = false;
            this.node.getChildByName('BasicAttack').active = true;

        }

    }
    onKeyDown(key : string) {
        
        if(DataManager.instance.gameover) return ;

        if (this.node.name == ('player' + DataManager.instance.UserChar.toString())) {
            if (key == "up" && this.on_ground == true) {//jump
                this.jump = true;
                this.on_ground = false;
            }
            else if(key == "up" && this.on_broom){
                this.down_move=false;
                this.up_move=true;
            }
            else if (key == "left") {//left
                this.right_move = false;
                this.left_move = true;
            }
            else if (key == "right") {//right
                this.right_move = true;
                this.left_move = false;
            }
            if(key == "down" && this.on_broom){
                this.down_move = true;
                this.up_move=false;
            }
            else if (key == "down" && !this.inAttack) {//skill
                if (this.can_attack) {
                    this.inAttack = true;
                    this.attack = true;
                    this.can_attack = false;
                    this.normal_attack = true;
                    // this.node.getChildByName('BasicAttack').active=true;

                    if (!this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                        this.anim.play(this.node.name + '_basic_attack');
                    }
                    // this.scheduleOnce(function(){
                    //     this.node.getChildByName('BasicAttack').active=false;
                    // },this.skill_time);
                    this.scheduleOnce(
                        function () { this.can_attack = true }, this.attack_time
                    );

                    //particle system
                    this.scheduleOnce(
                        function () {
                            console.log(this.GatherParticle);
                            this.GatherParticle.resetSystem();
                        }, 0.15
                    );
                    this.scheduleOnce(
                        function () {
                            this.GatherParticle.stopSystem();
                        }, 0.5
                    );
                }
            }
            if (key == "ctrl") {
                // console.log('gather');
                // this.progressbar.getComponent('ProgressBar').progressbar
                this.progressbar.progress += 0.02;
            }
            if (key == "j" && !this.skill1_Cooldown && !this.inAttack) {
                this.inAttack = true;
                this.skill1_Cooldown = true;
                this.scheduleOnce(() => {
                    this.skill1_Cooldown = false;
                }, this.skill_time1);
                this.skill1 = true;
                if (!this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                    this.anim.play(this.node.name + '_basic_attack');
                }
            }
            if (key == "k" && !this.skill2_Cooldown && !this.inAttack) {
                this.inAttack = true;
                this.skill2_Cooldown = true;
                this.scheduleOnce(() => {
                    this.skill2_Cooldown = false;
                }, this.skill_time2);
                this.skill2 = true;
                if (!this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                    this.anim.play(this.node.name + '_basic_attack');
                }
            }
            if (key == "l" && this.progressbar.progress >= 1 && !this.skill3_Cooldown && !this.inAttack) {
                this.inAttack = true;
                this.skill3_Cooldown = true;
                this.progressbar.progress = 0;
                this.scheduleOnce(() => {
                    this.skill3_Cooldown = false;
                }, this.skill_time3);
                this.skill3 = true;
                if (!this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                    this.anim.play(this.node.name + '_basic_attack');
                }
            }
        }
        else {
            if (key == "w" && this.on_ground == true) {//w jump
                this.jump = true;
                this.on_ground = false;
            }
            else if(key == "w" && this.on_broom){
                this.down_move=false;
                this.up_move=true;
            }
            else if (key == "a") {//left
                this.right_move = false;
                this.left_move = true;
            }
            else if (key == "d") {//right
                this.right_move = true;
                this.left_move = false;
            }
            if(key == "s" && this.on_broom){
                this.down_move = true;
                this.up_move=false;
            }
            else if (key == "s" && !this.inAttack) {//skill
                if (this.can_attack) {
                    this.inAttack = true;
                    this.attack = true;
                    this.can_attack = false;
                    this.normal_attack = true;
                    // this.node.getChildByName('BasicAttack').active=true;

                    if (!this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                        this.anim.play(this.node.name + '_basic_attack');
                    }
                    // this.scheduleOnce(function(){
                    //     this.node.getChildByName('BasicAttack').active=false;
                    // },this.skill_time);
                    this.scheduleOnce(
                        function () { this.can_attack = true }, this.attack_time
                    );

                    //particle system
                    this.scheduleOnce(
                        function () {
                            console.log(this.GatherParticle);
                            this.GatherParticle.resetSystem();
                        }, 0.15
                    );
                    this.scheduleOnce(
                        function () {
                            this.GatherParticle.stopSystem();
                        }, 0.5
                    );
                }
            }
            if (key == "z") {
                // console.log('gather');
                // this.progressbar.getComponent('ProgressBar').progressbar
                this.progressbar2.progress += 0.02;
            }
            if (key == "r" && !this.skill1_Cooldown && !this.inAttack) {
                this.inAttack = true;
                this.skill1_Cooldown = true;
                this.scheduleOnce(() => {
                    this.skill1_Cooldown = false;
                }, this.skill_time1);
                this.skill1 = true;
                if (!this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                    this.anim.play(this.node.name + '_basic_attack');
                }
            }
            if (key == "t" && !this.skill2_Cooldown && !this.inAttack) {
                this.inAttack = true;
                this.skill2_Cooldown = true;
                this.scheduleOnce(() => {
                    this.skill2_Cooldown = false;
                }, this.skill_time2);
                this.skill2 = true;
                if (!this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                    this.anim.play(this.node.name + '_basic_attack');
                }
            }
            if (key == "y" && this.progressbar2.progress >= 1 && !this.skill3_Cooldown && !this.inAttack) {
                this.inAttack = true;
                this.skill3_Cooldown = true;
                this.progressbar2.progress = 0;
                this.scheduleOnce(() => {
                    this.skill3_Cooldown = false;
                }, this.skill_time3);
                this.skill3 = true;
                if (!this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                    this.anim.play(this.node.name + '_basic_attack');
                }
            }

        }

    }
    onKeyUp(key: string) {
        if (this.node.name == ('player' + DataManager.instance.UserChar.toString())) {
            if (key == "up") {//jump
                this.jump = false;
                this.up_move=false;
            }
            else if (key == "left") {//left
                this.left_move = false;
                this.anim.stop(this.node.name + "_walk");
            }
            else if (key == "right") {//right
                this.right_move = false;
                this.anim.stop(this.node.name + "_walk");
            }
            else if (key == "down"){
                this.down_move=false;
            }
        }
        else {
            if (key == "w") {//w jump
                this.jump = false;
                this.up_move=false;

            }
            else if (key == "a") {//left
                this.left_move = false;
                this.anim.stop(this.node.name + "_walk");
            }
            else if (key == "d") {//right
                this.right_move = false;
                this.anim.stop(this.node.name + "_walk");
            }
            else if(key == "s"){
                this.down_move=false;
            }
        }

    }

    start() {
        if(this.node.name == ('player' + DataManager.instance.UserChar.toString())) {
            this.node.getChildByName("J").getComponent(cc.PhysicsBoxCollider).tag = 3;
            this.node.getChildByName("K").getComponent(cc.PhysicsBoxCollider).tag = 3;
            this.node.getChildByName("L").getComponent(cc.PhysicsBoxCollider).tag = 3;
        }
        else {
            this.node.getChildByName("J").getComponent(cc.PhysicsBoxCollider).tag = 4;
            this.node.getChildByName("K").getComponent(cc.PhysicsBoxCollider).tag = 4;
            this.node.getChildByName("L").getComponent(cc.PhysicsBoxCollider).tag = 4;
        }
    }
    onBeginContact(contact, self, other) {
        // console.log(contact.getWorldManifold().normal.y);
        if(this.node.name == ('player' + DataManager.instance.UserChar.toString())) {
            if(other.tag == 3)
                return;
        }
        else {
            if(other.tag == 4)
                return;
        }

        if(other.node.name=='Broom'&&this.on_broom==false){
            this.on_broom=true;
            console.log('contact broom');
            this.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0);
            this.scheduleOnce(function(){
                this.on_broom=false;
                console.log('discontact broom');
            },5);
        }
        if(other.node.name=='floor'){
            this.health = 0;
            return ;
        }
        if (contact.getWorldManifold().normal.y > 0.9) {
            // console.log(other.node.name);

            if (other.node.name == 'House1' || other.node.name == 'Collider1_1' || other.node.name == 'Collider1_2' || other.node.name == 'Collider2_1' || other.node.name == 'Collider2_2' || other.node.name == 'Collider2_3' || other.node.name == 'Collider2_4' || other.node.name == 'Collider2_5') {
                contact.disabled = true;
                console.log(contact.disable);
                // console.log('disable');

                return;
            }
        }
        if (contact.getWorldManifold().normal.y < -0.9 && other.node.group == 'Ground')
            this.on_ground = true;

        if (other.node.name == 'BasicAttack') {
            this.contactskill(1);
        } else if (other.node.name == 'J') {
            this.contactskill(11);
        } else if (other.node.name == 'K') {
            this.contactskill(this.skill2Effect);
        } else if (other.node.name == 'L') {
            this.contactskill(this.skill3Effect);
        }

        if (other.node.name == "Bread") {
            if (this.health + 100 < this.MaxHealth) this.health += 100;
            else this.health = this.MaxHealth;
            other.node.destroy();
        } else if (other.node.name == "Meat") {
            // speed *= 1.5
            // this.playerSpeed *= 1.5;
            other.node.destroy();
        } else if (other.node.name == "Potion") {
            //gather energy
            other.node.destroy();
        } else if (other.node.name == "Poisson") {
            //reduce energy
            other.node.destroy();
        }
    }
    contactskill(skilltype: number): void {
        // let action = cc.sequence(cc.moveBy(0.01, 30, 3), cc.moveBy(0.01, -30, -3)).repeat(5);
        // this.camera.node.runAction(action);
        if (skilltype == 1) {       // basic attack
            this.health -= 300;
        } else if (skilltype == 2) { // cannot move + damage
            this.health -= 200;
            this.moveable = false;
            this.scheduleOnce(function () {
                this.moveable = true;
            }, 2);
        } else if (skilltype == 3) { // continue damage
            this.schedule(function () {
                this.health -= 30;
            }, 0.5, 10, 0);
        } else if (skilltype == 4) { // cannnot attack + damage
            this.health -= 100;
            this.inAttack = true;
            this.scheduleOnce(function () {
                this.inAttack = false;
            }, 4);
        } else if (skilltype == 5) { // floating
            this.health -= 100;
            this.moveable = false;
            this.floating = true;
            this.scheduleOnce(function () {
                this.moveable = true;
                this.floating = false;
            }, 2);
        } else if (skilltype == 6) { // damage + push right 
            this.health -= 100;
            this.skillpush = true;
            this.scheduleOnce(() => {
                this.skillpush = false;
            }, 0.2)
            this.playerSpeed = 6000;
        } else if (skilltype == 7) { // damage + push left
            this.health -= 100;
            this.skillpush = true;
            this.scheduleOnce(() => {
                this.skillpush = false;
            }, 0.2)
            this.playerSpeed = -6000;
        } else if (skilltype == 8) { // kill
            this.health = 0;
        } else if (skilltype == 9) { // stunn + damage
            this.health -= 150;
            this.inAttack = true;
            this.moveable = false;
            this.scheduleOnce(function () {
                this.inAttack = false;
                this.moveable = true;
            }, 3);
        } else if (skilltype == 10) { // high damage
            this.health -= 400;
        } else if (skilltype == 11){ // slightly higher damage
            this.health -= 150;
        }
    }
    // onPreSolve(contact,self,other){
    //     if(contact.getWorldManifold().normal.y>0.9){
    //         console.log(other.node.name);

    //         if(other.node.name=='House1'||other.node.name=='Collider1_1'||other.node.name=='Collider1_2'||other.node.name=='Collider2_1'||other.node.name=='Collider2_2'||other.node.name=='Collider2_3'||other.node.name=='Collider2_4'||other.node.name=='Collider2_5'){
    //             contact.disabled=true;
    //             console.log(contact.disable);
    //             console.log('disable');
    //             return;
    //         }
    //     }

    // }
    onEndContact(contact, self, other) {
        // console.log(other.node.group);
        // console.log(other.node.name);
        if (other.node.group == 'Ground')
            this.on_ground = false;
    }
    update(dt) {

        if(DataManager.instance.gameover) return ;

        if(this.health <= 0){
            DataManager.instance.gameover = true;
            this.health = 0 ;
            console.log(this.node.name, " is killed!");

            if(DataManager.instance.UserRole == 0)
                DataManager.instance.Result = false;
            else if(DataManager.instance.UserRole == 1) 
                DataManager.instance.Result = true;
            else {
                if(this.node.name == ("player"+DataManager.instance.UserChar.toString()))
                    DataManager.instance.Result = false;
                else
                    DataManager.instance.Result = true;
            }

            this.anim.play(this.node.name + '_dead');
            this.scheduleOnce(function(){
                cc.director.loadScene("EndScene");
            }, 2);
            return ;
        }

        if (!this.skillpush) this.playerSpeed = 0;
        if(this.on_broom){
            if (!this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                this.anim.play(this.node.name + "_idle");
            }

            this.getComponent(cc.RigidBody).gravityScale=0;
            if(this.left_move){
                this.playerSpeed -= 200;
                this.node.scaleX = -0.2;
            }
            else if(this.right_move){
                this.playerSpeed += 200;
                this.node.scaleX = 0.2;

            }
            console.log('update: on broom');
            if(this.down_move){
                this.playerSpeed_y=-200;
            }
            else if(this.up_move){
                this.playerSpeed_y=200;
            }
            // this.node.x+=this.playerSpeed*dt;
            // this.node.y+=this.playerSpeed_y*dt;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed, this.playerSpeed_y);
            return;
        }
        else{
            this.getComponent(cc.RigidBody).gravityScale=3;
            if (this.left_move) {
                this.playerSpeed -= 400;
                this.node.scaleX = -0.2;  // modify node's X scale value to change facing direction
                console.log(this.node.name + '_walk');
                if (!this.anim.getAnimationState(this.node.name + '_walk').isPlaying && !this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                    this.anim.play(this.node.name + '_walk');
                }
            }
            else if (this.right_move) {
                this.playerSpeed += 400;
                this.node.scaleX = 0.2;
                if (!this.anim.getAnimationState(this.node.name + '_walk').isPlaying && !this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                    this.anim.play(this.node.name + '_walk');
                }
            }
            else {
                if (!this.anim.getAnimationState(this.node.name + '_basic_attack').isPlaying) {
                    this.anim.play(this.node.name + "_idle");
                }
            }

        }
        if (this.floating) {
            console.log("floating!");
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 300);
        }
        if (this.moveable == false) {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.getComponent(cc.RigidBody).linearVelocity.y);
            return;
        }

        if (this.jump) {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 950);
            this.jump = false;
        }

        //this.node.x += this.playerSpeed *dt; 
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed, this.getComponent(cc.RigidBody).linearVelocity.y);
    }
}
