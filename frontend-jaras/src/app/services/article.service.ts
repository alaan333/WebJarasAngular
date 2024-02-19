import { Injectable } from "@angular/core";
import{HttpClient, HttpHeaders} from '@angular/common/http' //estos dos modulos son para hacer peticiones ajax a una url externa y modificar las cabeceras de esas peticiones
import { Observable } from "rxjs"; //para recoger la informacion que nos devuelva el api rest cuando hagamos una peticion
import { Article } from "../models/article";
import { Global } from "./global";

@Injectable()
export class ArticleService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }

    testService(){
        return 'Probando servicio de angular'
    }

    saveArticle(article:Article): Observable<any>{
        let params=JSON.stringify(article); //para que article se transforme en un objeto json
        let headers=new HttpHeaders().set('Content-Type','application/json'); 

        return this._http.post(this.url+'/save-article',params,{headers:headers});
    }

    getArticle(id:any):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/article/'+id,{headers:headers})
    }

    getArticles():Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'/articles',{headers:headers})
    }

    deleteArticle(id:any):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'/article/'+id,{headers:headers})
    }

    editArticle(article:any):Observable<any>{
        let params=JSON.stringify(article);
        let id=article._id
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'/article/'+id,params,{headers:headers})
    }
}
