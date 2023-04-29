import { Component } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css'],
  providers:[ArticleService, UploadService]
})
export class AddarticleComponent {
  
  public title:string;
  public article:Article 
  public status:string;
  public filesToUpload:Array<File>;
  public save_article:any;
  public url:string

  constructor(
    private _articleService:ArticleService,
    private _uploadService: UploadService
  ){
    this.title='Añadir artículo'
    this.article=new Article('','','','Sin talle','','','','','',0,0);
    this.status=''
    this.filesToUpload=[];
    this.save_article=null;
    this.url=Global.url
  }   

  onSubmit(form:any){
    
    //Guardar datos basicos
    this._articleService.saveArticle(this.article).subscribe(
      response=>{
        if(response.article){
          
          //Subir imagen
          this._uploadService.makeFileRequest(Global.url+'/upload-image/'+response.article._id,[],this.filesToUpload,'image')
          .then((result:any)=>{
            this.status='success';
            this.save_article=response.article;
            console.log(result);
            form.reset()
          })
        }
        else{this.status='failed'}
      },
      error=>{console.log(error)}
    );
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload=<Array<File>>fileInput.target.files;
  }

}