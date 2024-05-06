interface Rating {
    rate: number;
    count: number;
  }
  
  export interface Model {
    id: string;
    title: string;
    price: number;
    category_title: string;
    description: string;
    image: string;
    video: string;
    rating: Rating;
    qty: number;
    subTotal: number;
  }
  