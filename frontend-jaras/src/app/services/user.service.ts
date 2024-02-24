import { Injectable } from "@angular/core";
import{HttpClient, HttpHeaders, HttpStatusCode} from '@angular/common/http' //estos dos modulos son para hacer peticiones ajax a una url externa y modificar las cabeceras de esas peticiones
import { Observable } from "rxjs"; //para recoger la informacion que nos devuelva el api rest cuando hagamos una peticion
import { Global } from "./global";
import { User } from "../models/user";

@Injectable()
export class UserService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.urlUser;
    }

    saveUser(user:User): Observable<any>{
        let params=JSON.stringify(user); 
        let headers=new HttpHeaders().set('Content-Type','application/json');
       
        return this._http.post(this.url+'/save-user',params,{headers:headers});
    }

    sendMail(user:User): Observable<any>{
        let params=JSON.stringify(user); 
        let headers=new HttpHeaders().set('Content-Type','application/json');
       
        return this._http.post(this.url+'/send-mail',params,{headers:headers});
    }
    

    confirmUser(token:any):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/user/confirm/'+token,{headers:headers})
    }

    getUser(id:any):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/user/'+id,{headers:headers})
    }

    getUsers():Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'/users',{headers:headers})
    }

    editUser(user:any):Observable<any>{
        let params=JSON.stringify(user);
        let id=user._id
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'/user/'+id,params,{headers:headers})
    }
}
