
export interface IFirebaseResponse {
  userId?: string;
  error?: string;
  userName?: string;
  userAvatar?: string;
}
export interface BillProductProps {
  productName: string;
  productThumbnail: string;

  productType: string;

  productPrice: number;

  productAmount: number;
}



export interface FilterRadioProps {
  value: string;
  name: string;
}


