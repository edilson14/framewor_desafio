interface IPosts {
  id: number;
  userId: number;
  title: string;
  body: string;
}


interface IPostComments {
  postId: number;
  id: number;
  name: string;
  body: string;
  email: string;
}


declare class Post implements IPosts {
  id: number;
  userId: number;
  title: string;
  body: string;
}
