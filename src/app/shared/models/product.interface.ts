interface Rating {
  rate: number;
  count: number;
}

export interface Product {
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

export interface ProductCheckout {  
  title?: string;  
  image?: string;
  price?: number;    
}
