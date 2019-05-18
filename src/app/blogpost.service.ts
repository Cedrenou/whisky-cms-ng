import {Blogpost} from './models/blogpost';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  baseUrl = 'http://localhost:3000/api/v1/blog-posts';
  private blogpostCreated = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {
  }

  // CREATE
  createBlogpost(blogpost: Blogpost) {
    return this.http.post<Blogpost>(this.baseUrl, blogpost)
  }

  uploadImage(formData: FormData) {
    return this.http.post<any>(`${this.baseUrl}/images`, formData)
  }

  dispatchBlogpostCreated(id: string) {
    this.blogpostCreated.next(id)
  }

  handleBlogpostCreated() {
    return this.blogpostCreated.asObservable()
  }

  // READ
  getBlogposts(): Observable<Blogpost[]> {
    return this.http.get<Blogpost[]>(`${this.baseUrl}/`)
  }

  getBlogPostsById(id): Observable<Blogpost> {
    return this.http.get<Blogpost>(`${this.baseUrl}/${id}`)
  }

  // UPDATE

  updateBlogpost(id: string, blogPost: Blogpost) {
    return this.http.put(`${this.baseUrl}/${id}`, blogPost)
  }

  // DELETE
  deleteBlogPostsById(id: string) {
    return this.http.delete<Blogpost>(`${this.baseUrl}/${id}`)
  }

  deleteBlogPosts(ids: string[]) {
    const allIds = ids.join(','); // id1,id2,id3...

    return this.http.delete(`${this.baseUrl}/?ids=${allIds}`)
  }


}
