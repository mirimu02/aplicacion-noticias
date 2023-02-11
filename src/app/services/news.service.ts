import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { NewsResponse,Article} from '../interfaces';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // private articlesByCategoryAndPage: ArticlesByCategoryAndPage ={}

  constructor(private http: HttpClient) { }

  getTopHeadlines():Observable<Article[]>{
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`,{
      params: {apiKey}
    }).pipe(
      map( ({articles}) => articles)
    );
  }

  getTopHeadLinesByCategory(category: string, loadMore: boolean = false):Observable<Article[]>{

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}`,{
      params: {apiKey}
    }).pipe(
      map( ({articles}) => articles)
    );
  }

 
}
