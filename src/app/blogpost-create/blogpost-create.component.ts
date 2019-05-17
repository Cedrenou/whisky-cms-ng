import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective} from '@angular/forms';
import {BlogpostService} from '../blogpost.service';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent implements OnInit {

  creationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogpostService: BlogpostService,
    private el: ElementRef
  ) {
  }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.creationForm = this.fb.group({
      title: '',
      subtitle: '',
      content: '',
      image: ''
    })
  }

  upload() {
    // retrieve file upload HTML tag
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
    const fileCount: number = inputEl.files.length;

    if (fileCount > 0) {
      const formData = new FormData();
      formData.append('image', inputEl.files.item(0));
      this.blogpostService.uploadImage(formData).subscribe(data => console.log(data), error => console.error(error))
    }
    console.log(fileCount)
  }

  onCreateBlogpost(formDirective: FormGroupDirective) {
    if (this.creationForm.valid) {
      this.blogpostService
        .createBlogpost(this.creationForm.value)
        .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error))
    }
  }

  handleSuccess(data, formDirective) {
    console.log('Ok blog post created !', data);
    this.blogpostService.dispatchBlogpostCreated(data._id);
    this.creationForm.reset();
    formDirective.resetForm();
  }

  handleError(error) {
    console.error('KO blog post not created !', error)
  }
}
