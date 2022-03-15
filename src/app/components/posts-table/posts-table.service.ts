import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsTableService {

  static postsUrl: string = environment.apiUrl + 'posts';

  constructor(private _http: HttpClient) { }

  /**
   * retorna todos os posts que estão no banco
   * @returns {IPosts[]} array contendos os post
   */
  getAllPosts(): Observable<IPosts[]> {
    return this._http.get<IPosts[]>(PostsTableService.postsUrl);
  }



  getPostComents(postId: number): Observable<IPostComments[]> {
    return this._http.get<IPostComments[]>(PostsTableService.postsUrl + `/${postId}/comments`)
  }

  createPost(post: IPosts): Observable<IPosts> {
    delete post.id;
    return this._http.post<IPosts>(PostsTableService.postsUrl, JSON.stringify(post));
  }

  editPost(post: IPosts): Observable<IPosts> {
    return this._http.put<IPosts>(PostsTableService.postsUrl + `/${post.id}`, JSON.stringify(post));
  }

  deletePost(post: IPosts) {
    return this._http.delete(PostsTableService.postsUrl + `/${post.id}`);
  }
}
