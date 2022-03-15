import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsTableService } from './posts-table.service';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss']
})
export class PostsTableComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'title', 'actions']
  allPosts: IPosts[] = [];
  postComment: IPostComments[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public dataSource: MatTableDataSource<IPosts>;


  public isEditing: boolean = false;
  public isLoading: boolean = false;
  public post: IPosts = new Post();


  constructor(
    private _postsService: PostsTableService,
    private _modalService: NgbModal,
    private _messageService: SnackBarService,
  ) {
    this.getAllPosts();
  }

  ngOnInit() {
  }

  getAllPosts() {
    this._postsService.getAllPosts().toPromise()
      .then(posts => {
        this.allPosts = posts;
        this.dataSource = new MatTableDataSource<IPosts>(this.allPosts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }

  searchByTitle(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openModal(modalContent: any, post?: IPosts, size: string = 'lg') {
    if (post) {
      this.post = post;
    }
    this._modalService.open(modalContent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: size
    });
  }


  closeModal() {
    this._modalService.dismissAll();
    this.post = new Post();
  }

  deletePost() {
    this.isLoading = true;
    this._postsService.deletePost(this.post).toPromise()
      .then(response => {
        const indexPost = this.allPosts.findIndex(_post => _post.id === this.post.id);
        this.allPosts.splice(indexPost, indexPost + 1);
        this._messageService.showMessage('Post Eliminado com sucesso');
        this.closeModal();
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      })
  }

  createOrUpdatePost() {
    this.isLoading = true;
    if (this.isEditing)
      this._postsService.editPost(this.post).toPromise()
        .then(respost => {
          this._messageService.showMessage('Post Editado com sucesso!');
          this.closeModal();
          this.isLoading = false;
        })
    else
      this._postsService.createPost(this.post).toPromise()
        .then(response => {
          this.allPosts.unshift(response);
          this._messageService.showMessage('Post Criado Com Sucesso');
          this.isLoading = false;
          this.closeModal();
        })
  }


  getPostComments(post: IPosts) {
    this._postsService.getPostComents(post.id).toPromise()
      .then(comments => {
        this.postComment = comments;
      })
  }


}


export class Post implements IPosts {
  id: number;
  userId: number;
  title: string;
  body: string;


  constructor() {
    this.id = 101;
    this.body = '';
    this.userId = 1;
  }

}
