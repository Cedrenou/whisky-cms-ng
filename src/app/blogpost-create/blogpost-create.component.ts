import {Component, OnInit} from '@angular/core';
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
    private blogpostService: BlogpostService
  ) {
  }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.creationForm = this.fb.group({
      title: '',
      subtitle: '',
      content: ''
    })
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
