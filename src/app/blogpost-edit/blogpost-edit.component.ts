import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective} from '@angular/forms';
import {BlogpostService} from '../blogpost.service';
import {ActivatedRoute} from '@angular/router';
import {Blogpost} from '../models/blogpost';

@Component({
  selector: 'app-blogpost-edit',
  templateUrl: './blogpost-edit.component.html',
  styleUrls: ['./blogpost-edit.component.css']
})
export class BlogpostEditComponent implements OnInit {

  editForm: FormGroup;
  blogpostId: string;
  blogpost: Blogpost;

  constructor(
    private fb: FormBuilder,
    private blogpostService: BlogpostService,
    private el: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.blogpostId = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogpostService.getBlogPostsById(this.blogpostId).subscribe(data => {
        this.blogpost = data
      },
      (err) => console.error(err));

    this.createForm()
  }

  createForm() {
    this.editForm = this.fb.group({
      title: '',
      subtitle: '',
      content: '',
      image: ''
    })
  }

  upload() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
    const fileCount: number = inputEl.files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      formData.append('image', inputEl.files.item(0));
      this.blogpostService.uploadImage(formData).subscribe(data => {
          console.log(data)
        },
        (err) => {
          console.error(err)
        })
    }
  }

  updateBlogpost(formDirective: FormGroupDirective) {
    if (this.editForm.valid) {
      console.log(this.editForm.value)
      this.blogpostService.updateBlogpost(this.blogpostId, this.editForm.value).subscribe(data => {
          this.hanldeSuccess(data, formDirective)
        },
        (error) => {
          this.hanldeError(error)
        })
    }
  }


  hanldeSuccess(data, formDirective) {
    console.log('Ok blog post updated !', data)
    this.editForm.reset()
    formDirective.resetForm()
    this.blogpostService.dispatchBlogpostCreated(data._id)
  }

  hanldeError(error) {
    console.error(error)
  }

}
