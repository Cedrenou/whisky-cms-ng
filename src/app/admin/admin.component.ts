import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Blogpost} from '../models/blogpost';
import {BlogpostService} from '../blogpost.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // blogPosts$: Observable<Blogpost[]>;
  allBlogPosts: Blogpost[];

  constructor(
    private blogPostService: BlogpostService
  ) {
  }

  ngOnInit() {
    // this.blogPosts$ = this.blogPostService.getBlogposts();
    this.blogPostService.getBlogposts().subscribe((data) => this.refresh(data))
    this.blogPostService.handleBlogpostCreated().subscribe(data => {
      console.log('AdminComponent received : ', data);
      this.refresh(data);
    })
  }

  deleteBlogPosts(selectedOptions) {
    const ids = selectedOptions.map(x => x.value);
    if (ids.length === 1) {
      this.blogPostService.deleteBlogPostsById(ids[0]).subscribe(data => this.refresh(data), err => this.handleError(err))
    } else {
      return this.blogPostService.deleteBlogPosts(ids).subscribe(data => this.refresh(data), err => this.handleError(err))
    }
  }

  refresh(data) {
    console.log('data', data);
    this.blogPostService.getBlogposts().subscribe(data => {
      this.allBlogPosts = data
    })
  }

  handleError(error) {
    console.error(error)
  }

}
