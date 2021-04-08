export enum actionTypes {
    SEND_URL = "[BigImage] Send Url",
    RESET_URL = "[BigImage] Reset Url",
    PANEL_USER = "[UserData] Panel User"
}

export class SendUrl {
    readonly type = actionTypes.SEND_URL;
    constructor(public payload:string){}
}

export class ResetUrl {
    readonly type = actionTypes.RESET_URL;
}

export class PanelUser{
    readonly type = actionTypes.PANEL_USER;
    constructor(public payload:string){}
}
export type Action = SendUrl | ResetUrl | PanelUser;