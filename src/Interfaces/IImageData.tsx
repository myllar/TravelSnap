export interface IImageData {
  id: string;
  user: string;
  imageUrl: string;
  metadata: {
    imageName: any;
    userAccount: string;
    imageTitle: string;
    hashtag: string;
    latitude: number;
    longitude: number;
    description: string;
    comments: ICommentData[];
  };
}

export interface ICommentData {
  id: string;
  userId: string;
  text: string;
  timestamp: Date;
}