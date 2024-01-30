import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[ArticleService]
})

export class SearchComponent implements OnInit{
  public url:string;
  public all_articles:Article[];
  public status:boolean;

  constructor(
    private _articleService:ArticleService,
    private _item:AppComponent //para acceder a AppComponent y luego a AppComponent.item_search del app.components.ts
  ){
    this.all_articles=_item.all_articles
    this.url=Global.url;
    this.status=false;
  }
  ngOnInit(){
  }

  //para renovar el array que viene de app.component, cada vez que haya un cambio en este componente, es la unica forma hasta ahora para que tome los cambios en el app.component
  ngDoCheck(){
    if(this.all_articles!=this._item.all_articles){
        this.all_articles=this._item.all_articles
      }
    this.status=this._item.status //para que se actualice el status cada vez que hay un cambio
  }
}