export class Auth{

    constructor(auth:boolean,accessToken:string, reason:string){
        this.auth=auth;
        this.accessToken=accessToken;
        this.reason= reason;
    }

    auth:boolean;
    accessToken:string;
    reason: string;
}