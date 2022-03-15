import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlbunsService } from './albuns.service';

@Component({
  selector: 'app-albuns',
  templateUrl: './albuns.component.html',
  styleUrls: ['./albuns.component.scss']
})
export class AlbunsComponent implements OnInit {

  allAlbuns: IAlbum[] = [];
  photos: IAlbumPhotos[] = [];
  public isLoadingImages: boolean = false;

  constructor(
    private _albunsServices: AlbunsService,
    private _modalServices: NgbModal,
  ) { }

  ngOnInit() {
    this.getAllAlbuns();
  }


  getAllAlbuns() {
    this._albunsServices.getAllAlbums().toPromise()
      .then(_albuns => {
        _albuns.forEach(album => album.photosLenght = 50);
        this.allAlbuns = _albuns;
      })
  }

  showImages(content: HTMLElement) {
    this._modalServices.open(content, {
      centered: true,
      size: 'lg'
    })

  }


  getPhotos(albumId: number) {
    this.isLoadingImages = true;
    this._albunsServices.getAlbunsImages(albumId).toPromise()
      .then(_photos => {
        this.photos = _photos;
        this.isLoadingImages = false;
      })

  }

}
