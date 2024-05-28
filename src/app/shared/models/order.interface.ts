export interface Messages {
  first_message: string;
  second_message: string;
  third_message: string;
  fourth_message: string;
  fifth_message: string;
  sixth_message: string;
  seventh_message: string;
  eighth_message: string;
  nineth_message: string;
  tenth_message: string;
  eleventh_message: string;
  twelfth_message: string;
  thirteenth_message: string;
  fourteenth_message: string;
  fifteenth_message: string;
  sixteenth_message: string;
};

export interface Images {
  first_image?: string | null;
  second_image?: string | null;
  third_image?: string | null;
  fourth_image?: string | null;
  fifth_image?: string | null;
  // first_image: string;
  // second_image: string;
  // third_image: string;
  // fourth_image: string;
  // fifth_image: string;
};

export interface Order {
  id: string;
  // tematic: string;
  order_state: string;
  payment_state: string;
  payment_attempt_number: number;
  // state_payment: number;
  // path: string;    
  model_id: string;
  model_composition: string;
  model_title: string;
  model_image: string;
  model_price: number;
  model_total_messages: number;
  model_total_images: number;
  messages?: Messages | undefined;
  images?: Images | undefined;
  video_rendered_url: string;
  video_rendered_url_with_watermark: string;
}

export interface NewOrder {
  // id: string;
  // tematic: string;
  order_state?: string;
  // payment_access_until: Date;
  // state_payment: number;
  // path: string;    
  model_id?: string;
  model_composition?: string;
  model_title: string;
  model_image: string;
  model_price: number;
  model_total_messages: number;
  model_total_images: number;
  messages?: Messages | undefined;
  images?: Images | undefined;
  video_rendered_url?: string;
}

export interface UpdatedOrder {
  id: string;
  // tematic: string;
  // order_state?: string;
  // // payment_access_until: Date;
  // // state_payment: number;
  // // path: string;    
  // model_id?: string;
  // model_composition?: string;
  // model_title: string;
  // model_image: string;
  // model_price?: number;
  messages?: Messages | undefined;
  images?: Images | undefined;
  // video_rendered_url?: string;
}

// export interface Order2 {
//   // id: string;
//   // tematic: string;
//   // state: number;
//   // state_payment: number;
//   // path: string;    
//   model_id: string;
//   model_composition: string;
//   // messages?: Messages | undefined;
//   // images?: Images | undefined;
//   video_rendered_url: string;
// }
