import { Component, OnInit } from '@angular/core';
import {BlogpostService} from '../blogpost.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Blogpost} from '../models/blogpost';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {
  blogPost$: Observable<Blogpost>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogPostService: BlogpostService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogPost$ = this.blogPostService.getBlogPostsById(id)
  }

}
