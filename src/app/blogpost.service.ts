import {Blogpost} from './models/blogpost';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  baseUrl = 'http://localhost:3000/api/v1/';

  constructor(
    private http: HttpClient
  ) {
  }

  getBlogposts(): Observable<Blogpost[]> {
    return this.http.get<Blogpost[]>(`${this.baseUrl}/blog-posts`)
  }

  getBlogPostsById(id): Observable<Blogpost> {
    return this.http.get<Blogpost>(`${this.baseUrl}/blog-posts/${id}`)
  }
}
