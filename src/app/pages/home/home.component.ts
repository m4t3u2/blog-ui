import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public errorMessage = '';
  public posts: Post[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.buscarTodosPosts();
  }

  private buscarTodosPosts(): void {
    this.postService.getAllPublic().subscribe(data => {
      this.posts = data;
    },
      err => {
        this.errorMessage = err.error;
      });
  }

}
