import { Component } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-jaras';
  
  ngOnInit(): void {
    $(document).ready(function(){
  
      var theme=$('#theme');
        $('.theme-pink').click(function(){
        theme.attr('href','assets/css/pink-style.css')
        });
        $('.theme-blue').click(function(){
          theme.attr('href','assets/css/blue-style.css')
          });
        $('.theme-green').click(function(){
        theme.attr('href','assets/css/green-style.css')
        })
    });
  }
}
