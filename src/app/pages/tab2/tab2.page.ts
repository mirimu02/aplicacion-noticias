import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces';

import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  @ViewChild( IonInfiniteScroll ) infiniteScroll: IonInfiniteScroll;

  public categories: string[] = ['business','entertainment','general','healths','cience','sports','technology'];

  public selectedCategory: string = this.categories[0];

  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe( articles => {
        this.articles = [...this.articles, ...articles];
      })
      
  }

  segmentChanged( event: Event){
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe( articles => {
        this.articles = [...articles];
      })
  }

  loadData(){
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe(articles => {
          if (articles.length === this.articles.length){
            this.infiniteScroll.disabled=true;
            return;
          }

          this.articles = articles;
          this.infiniteScroll.complete()
        })
  }

  
}
