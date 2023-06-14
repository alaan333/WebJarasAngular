import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ArticleService]
})
export class DetailComponent implements OnInit{
  public url: string;
  public article:any

  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route:ActivatedRoute
  ){
    this.url=Global.url
    this.article=Object
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this.getArticle(id)
    })
  }

  getArticle(id:any){
    this._articleService.getArticle(id).subscribe(
      response=>{
        this.article=response.article;
      },
      error=>{
        console.log(error)
      }      
    )
  }
  deleteArticle(id:any){
    var result=confirm('Desea borrar el articulo?')
    if (result){
      this._articleService.deleteArticle(id).subscribe(
        response=>{
          if(response.article){
            this._router.navigate(['/productos'])
          }
        },
        error=>{
          console.log(error)
        }      
      )
    }
    
  }
  
}
