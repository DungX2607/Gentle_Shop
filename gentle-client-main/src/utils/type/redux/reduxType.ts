import { BillProductInput } from "../../../generated/graphql";
import { PriceFieldsProps } from "../../../pages/admin/createProduct";

// Auth
export interface AuthProps {
  isHidden: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  userAvatar: string;
  type: string;
}

// Local
export interface LocalProps {
  countProps: number;
  writeCommentProps: WriteCommentProps | null;
  productInCommentProps: ProductInCommentProps | null;
  paymentProps: PaymentProps | null;
  editProductPriceProps: EditProductPriceProps | null;
  kinds:ProductKindProps[],
  brands:ProductBrandProps[],
  billProductsFromLocal:BillProductInput[]
}


export interface ProductKindProps{
  id:number,
  name:string
}
export interface ProductBrandProps{
  id:number,
  name:string
}





export interface EditProductPriceProps {
  priceFieldProps: PriceFieldsProps[];
  productId: number;
}

export interface WriteCommentProps {
  products: ProductInCommentProps[];
  billId: number;
}

export interface ProductInCommentProps {
  productName: string;
  productThumbnail: string;
}

export interface PaymentProps {
  listCart: BillProductInput[];
  totalPrice: number;
}
