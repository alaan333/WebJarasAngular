//servicio para subir archivos
import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService{
    public url:string;

    constructor(){
        this.url=Global.url;
    }

    // Este metodo me va a permitir hacer una peticion ajax clasica, en la cual vamos a adjuntar un archivo para subir
    makeFileRequest(url:string,params:Array<string>,files:Array<File>, name:string){
        return new Promise(function(resolve,reject){
            var formData:any= new FormData();
            var xhr=new XMLHttpRequest();  //objeto de peticiones asincronas de javascript
            for(var i=0; i<files.length;i++){           //for para recorrer el array de archivos que está llegando
                formData.append(name,files[i], files[i].name);
            }
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        resolve(JSON.parse(xhr.response));
                    }
                    else{
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST',url,true);
            xhr.send(formData)
        })
    }
}