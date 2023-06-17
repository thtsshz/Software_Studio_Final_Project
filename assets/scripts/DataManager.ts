// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export class DataManager {

    private static _instance: DataManager;
    public static get instance() {
        if(!this._instance) {
            this._instance = new DataManager()
        }
        return this._instance;
    }

    public UserUID;
    public UserName;
    public UserChar;
}
