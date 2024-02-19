import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { UploadService } from '../../services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-edit',
  templateUrl: '../addarticle/addarticle.component.html',
  styleUrls: ['../addarticle/addarticle.component.css'],
  providers:[ArticleService,UploadService]
})
export class EditComponent implements OnInit{

  public title:string;
  public article:any;
  public filesToUpload:Array<File>;
  public save_article:any;
  public status:string;
  public url:string;

  constructor(
    private _articleService:ArticleService,
    private _uploadService:UploadService,
    private _route:ActivatedRoute,
    private _router:Router,
  ){
    this.title='Editar articulo',
    this.filesToUpload=[];
    this.status='';
    this.url=Global.url
  }

  ngOnInit(){
    this._route.params.subscribe(params=>{
      let idd=params['id'];
      this.getArticle(idd)
    });
  }

  getArticle(id:any){
    this._articleService.getArticle(id).subscribe(
      response=>{
        this.article=response.article; 
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  onSubmit(form:any){
    
    //Guardar datos basicos
    this._articleService.editArticle(this.article).subscribe(
      response=>{
        if(response.article){
          //Subir imagen
          if(this.filesToUpload.length!=0){    //importante poner !=0 si no hay ninguna imagen para subir
            this._uploadService.makeFileRequest(Global.url+'/upload-image/'+response.article._id,[],this.filesToUpload,'image')
            .then((result:any)=>{
              this.status='succes';
              this.save_article=result.article;
              this._router.navigate(['/productos'])
            })
          }
          else{
            this.save_article=response.article;
            this.status='success'
            this._router.navigate(['/productos'])
          }
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
