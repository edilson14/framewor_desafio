
interface IAlbum {
  userId: number;
  id: number;
  title: string;
  photosLenght: number;
}


interface IAlbumPhotos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
