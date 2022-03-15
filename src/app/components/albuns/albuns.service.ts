import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbunsService {

  static albunsUrl: string = environment.apiUrl + 'albums/'

  constructor(private _httpService: HttpClient) { }


  getAllAlbums(): Observable<IAlbum[]> {
    return this._httpService.get<IAlbum[]>(AlbunsService.albunsUrl);
  }

  getAlbunsImages(albumId: number): Observable<IAlbumPhotos[]> {
    return this._httpService.get<IAlbumPhotos[]>(AlbunsService.albunsUrl + `${albumId}/photos`);
  }


}
