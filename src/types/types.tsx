export interface IRestaurant {
  _id: string;
  address: string;
  averageRating?: number;
  imageUrl: string;
  name: string;
  reviews: IReview[];
}

export interface IReview {
  _id: string;
  date: Date;
  comment: string;
  rating: number;
  user: IUser;
}

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}
