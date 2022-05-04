import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Admin = {
  __typename?: 'Admin';
  adminId: Scalars['String'];
  adminName: Scalars['String'];
  adminType?: Maybe<Scalars['String']>;
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  feedbacks: Array<Feedback>;
  id: Scalars['Float'];
};

export type AuthInput = {
  type?: InputMaybe<Scalars['String']>;
  userAvartar?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
  userName?: InputMaybe<Scalars['String']>;
};

export type Bill = {
  __typename?: 'Bill';
  billProducts: Array<BillProduct>;
  billStatus?: Maybe<Scalars['String']>;
  commentPrice: Scalars['Float'];
  createdAt: Scalars['String'];
  customer: Customer;
  deliveryPrice: Scalars['Float'];
  id: Scalars['Float'];
  introduceCode?: Maybe<Scalars['Float']>;
  introducePrice: Scalars['Float'];
  isCommented?: Maybe<Scalars['Boolean']>;
  notice?: Maybe<Scalars['String']>;
  paymentDown?: Maybe<Scalars['Float']>;
  paymentType: Scalars['String'];
  totalPrice: Scalars['Float'];
  user?: Maybe<User>;
};

export type BillCancelReason = {
  __typename?: 'BillCancelReason';
  createdAt: Scalars['DateTime'];
  customer: Customer;
  id: Scalars['Float'];
  reason: Scalars['String'];
};

export type BillInput = {
  customer: CustomerInput;
  deliveryPrice: Scalars['Float'];
  introduceCode?: InputMaybe<Scalars['Float']>;
  notice?: InputMaybe<Scalars['String']>;
  paymentType: Scalars['String'];
  products: Array<BillProductInput>;
};

export type BillProduct = {
  __typename?: 'BillProduct';
  bill: Bill;
  id: Scalars['Float'];
  priceIdForLocal?: Maybe<Scalars['Float']>;
  productAmount: Scalars['Float'];
  productName: Scalars['String'];
  productPrice: Scalars['Float'];
  productThumbnail: Scalars['String'];
  productType: Scalars['String'];
};

export type BillProductInput = {
  priceIdForLocal?: InputMaybe<Scalars['Float']>;
  productAmount: Scalars['Float'];
  productName: Scalars['String'];
  productPrice: Scalars['Float'];
  productThumbnail: Scalars['String'];
  productType: Scalars['String'];
};

export type BillResponse = IResponse & {
  __typename?: 'BillResponse';
  bill?: Maybe<Bill>;
  bills?: Maybe<Array<Bill>>;
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Brand = {
  __typename?: 'Brand';
  brandName: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
  kind: ProductKind;
  productClasses: Array<ProductClass>;
  products?: Maybe<Array<Product>>;
  thumbnail: Scalars['String'];
};

export type BrandInput = {
  brandName: Scalars['String'];
  description: Scalars['String'];
  kindId: Scalars['Float'];
  productClassId: Scalars['Float'];
  thumbnail: Scalars['String'];
};

export type BrandResponse = IResponse & {
  __typename?: 'BrandResponse';
  brandWithProduct?: Maybe<Brand>;
  brands?: Maybe<Array<Brand>>;
  code: Scalars['Float'];
  kind?: Maybe<ProductKind>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CartCode = {
  __typename?: 'CartCode';
  cartCode: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  productCarts: Array<CartProduct>;
  userId: Scalars['Float'];
};

export type CartProduct = {
  __typename?: 'CartProduct';
  amount: Scalars['Float'];
  cartCode: CartCode;
  id: Scalars['Float'];
  price: Price;
};

export type CartProductResponse = IResponse & {
  __typename?: 'CartProductResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  products?: Maybe<Array<BillProduct>>;
  success: Scalars['Boolean'];
};

export type CommentInput = {
  billId: Scalars['Float'];
  content: Scalars['String'];
  imagesComment: Array<Scalars['String']>;
  rating: Scalars['Float'];
};

export type CommentResponse = IResponse & {
  __typename?: 'CommentResponse';
  code: Scalars['Float'];
  comment?: Maybe<UserComment>;
  comments?: Maybe<Array<UserComment>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Customer = {
  __typename?: 'Customer';
  address: Scalars['String'];
  billCancelReason?: Maybe<Array<BillCancelReason>>;
  bills: Array<Bill>;
  city: Scalars['String'];
  customerName: Scalars['String'];
  customerPhone: Scalars['String'];
  id: Scalars['Float'];
  province: Scalars['String'];
  rejectedAmount?: Maybe<Scalars['Float']>;
};

export type CustomerInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  customerName: Scalars['String'];
  customerPhone: Scalars['String'];
  province: Scalars['String'];
};

export type DashboardResponse = IResponse & {
  __typename?: 'DashboardResponse';
  cancel?: Maybe<Scalars['Float']>;
  code: Scalars['Float'];
  commentNoFeedback?: Maybe<Scalars['Float']>;
  confirmWaiting?: Maybe<Scalars['Float']>;
  confirmed?: Maybe<Scalars['Float']>;
  delivering?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  packed?: Maybe<Scalars['Float']>;
  success: Scalars['Boolean'];
  takeMoneyField?: Maybe<Scalars['Float']>;
};

export type Feedback = {
  __typename?: 'Feedback';
  admin: Admin;
  comment: Array<UserComment>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
};

export type FeedbackInput = {
  commentId: Scalars['Float'];
  content: Scalars['String'];
};

export type GiftResponse = IResponse & {
  __typename?: 'GiftResponse';
  code: Scalars['Float'];
  gift?: Maybe<Price>;
  gifts?: Maybe<Array<Price>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type IResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type KindBrandClassResponse = IResponse & {
  __typename?: 'KindBrandClassResponse';
  brands?: Maybe<Array<Brand>>;
  classes?: Maybe<Array<ProductClass>>;
  code: Scalars['Float'];
  kinds?: Maybe<Array<ProductKind>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type MoneyBonus = {
  __typename?: 'MoneyBonus';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Float'];
  moneyNumber: Scalars['Float'];
  type: Scalars['String'];
  user: User;
};

export type MoneyBonusInput = {
  description: Scalars['String'];
  moneyNumber: Scalars['Float'];
  type: MoneyBonusType;
  userId: Scalars['Float'];
};

export type MoneyBonusResponse = IResponse & {
  __typename?: 'MoneyBonusResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  moneyBonus?: Maybe<MoneyBonus>;
  moneyBonuses?: Maybe<Array<MoneyBonus>>;
  success: Scalars['Boolean'];
};

export enum MoneyBonusType {
  Get = 'GET',
  Take = 'TAKE'
}

export type Mutation = {
  __typename?: 'Mutation';
  adminAddClassToBrand: SimpleResponse;
  adminCreateBrand: BrandResponse;
  adminCreateEvent: MyEventResponse;
  adminCreateFeedback: SimpleResponse;
  adminCreateOrEditPrice: PriceResponse;
  adminCreateProductClass: ProductKindResponse;
  adminCreateProductKind: ProductKindResponse;
  adminEditBillStatus: BillResponse;
  adminEditProductPrice: PriceResponse;
  adminHandleBillCompleted: BillResponse;
  adminHandleBillReject: SimpleResponse;
  adminTakeMoneyFieldCancel: SimpleResponse;
  adminTakeMoneyFieldCompleted: SimpleResponse;
  changeIsHidden: SimpleResponse;
  createAdmin: UserResponse;
  createBill: BillResponse;
  createComments: CommentResponse;
  createMoneyField: MoneyBonusResponse;
  createProduct: ProductResponse;
  createTakeMoneyField: SimpleResponse;
  handleBillCancel: BillResponse;
  loginWithsocial: UserResponse;
  logout: UserResponse;
  userCancelTakeMoneyField: SimpleResponse;
};


export type MutationAdminAddClassToBrandArgs = {
  brandId: Scalars['Float'];
  classId: Scalars['Float'];
};


export type MutationAdminCreateBrandArgs = {
  brandInput: BrandInput;
};


export type MutationAdminCreateEventArgs = {
  input: MyEventInput;
};


export type MutationAdminCreateFeedbackArgs = {
  feedbackInput: FeedbackInput;
};


export type MutationAdminCreateOrEditPriceArgs = {
  priceId: Scalars['Float'];
  priceInput: PriceInput;
  productId: Scalars['Float'];
};


export type MutationAdminCreateProductClassArgs = {
  id: Scalars['Float'];
  name: Scalars['String'];
};


export type MutationAdminCreateProductKindArgs = {
  name: Scalars['String'];
};


export type MutationAdminEditBillStatusArgs = {
  billId: Scalars['Float'];
  paymentDown: Scalars['Float'];
  status: Scalars['String'];
};


export type MutationAdminEditProductPriceArgs = {
  priceChanging: Scalars['Float'];
  priceId: Scalars['Float'];
};


export type MutationAdminHandleBillCompletedArgs = {
  billId: Scalars['Float'];
  totalPrice: Scalars['Float'];
};


export type MutationAdminHandleBillRejectArgs = {
  billId: Scalars['Float'];
};


export type MutationAdminTakeMoneyFieldCancelArgs = {
  cancelReason: Scalars['String'];
  fieldId: Scalars['Float'];
};


export type MutationAdminTakeMoneyFieldCompletedArgs = {
  fieldId: Scalars['Float'];
  imageSuccess: Scalars['String'];
};


export type MutationChangeIsHiddenArgs = {
  value: Scalars['Boolean'];
};


export type MutationCreateAdminArgs = {
  adminId: Scalars['String'];
};


export type MutationCreateBillArgs = {
  billInput: BillInput;
};


export type MutationCreateCommentsArgs = {
  commentInput: CommentInput;
};


export type MutationCreateMoneyFieldArgs = {
  fieldInput: MoneyBonusInput;
};


export type MutationCreateProductArgs = {
  productInput: ProductInput;
};


export type MutationCreateTakeMoneyFieldArgs = {
  field: TakeMoneyFieldInput;
};


export type MutationHandleBillCancelArgs = {
  billId: Scalars['Float'];
  reason: Scalars['String'];
};


export type MutationLoginWithsocialArgs = {
  authInput: AuthInput;
};


export type MutationUserCancelTakeMoneyFieldArgs = {
  takeMoneyFieldId: Scalars['Float'];
};

export type MyEvent = {
  __typename?: 'MyEvent';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  instructionImages?: Maybe<Array<Scalars['String']>>;
  summary: Scalars['String'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
};

export type MyEventInput = {
  content: Scalars['String'];
  instructionImages?: InputMaybe<Array<Scalars['String']>>;
  summary: Scalars['String'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
};

export type MyEventResponse = IResponse & {
  __typename?: 'MyEventResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  myEvent?: Maybe<MyEvent>;
  myEvents?: Maybe<Array<MyEvent>>;
  success: Scalars['Boolean'];
};

export type PaginationBrandWithProductsResponse = IResponse & {
  __typename?: 'PaginationBrandWithProductsResponse';
  brandWithProducts?: Maybe<Brand>;
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['Float']>;
  success: Scalars['Boolean'];
  totalCount?: Maybe<Scalars['Float']>;
};

export type PaginationCommentsResponse = IResponse & {
  __typename?: 'PaginationCommentsResponse';
  code: Scalars['Float'];
  comments?: Maybe<Array<UserComment>>;
  cursor?: Maybe<Scalars['Float']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['Float']>;
  success: Scalars['Boolean'];
  totalCount?: Maybe<Scalars['Float']>;
};

export type PaginationOptionsInput = {
  brandId?: InputMaybe<Scalars['Float']>;
  kindId?: InputMaybe<Scalars['Float']>;
  productClassId?: InputMaybe<Scalars['Float']>;
  skip: Scalars['Float'];
  type?: InputMaybe<Scalars['String']>;
};

export type PaginationProductsResponse = IResponse & {
  __typename?: 'PaginationProductsResponse';
  code: Scalars['Float'];
  kindId?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['Float']>;
  productClasses?: Maybe<Array<ProductClass>>;
  products?: Maybe<Array<Product>>;
  success: Scalars['Boolean'];
  totalCount?: Maybe<Scalars['Float']>;
};

export type PaginationUsersResponse = IResponse & {
  __typename?: 'PaginationUsersResponse';
  code: Scalars['Float'];
  cursor: Scalars['Float'];
  hasMore: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  totalCount?: Maybe<Scalars['Float']>;
  users?: Maybe<Array<User>>;
};

export type Price = {
  __typename?: 'Price';
  carts?: Maybe<Array<CartProduct>>;
  id: Scalars['Float'];
  isGift?: Maybe<Scalars['Boolean']>;
  price: Scalars['Float'];
  product: Product;
  status: Scalars['Float'];
  type: Scalars['String'];
};

export type PriceInput = {
  isGift?: InputMaybe<Scalars['Boolean']>;
  price: Scalars['Float'];
  status: Scalars['Float'];
  type: Scalars['String'];
};

export type PriceResponse = IResponse & {
  __typename?: 'PriceResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  price?: Maybe<Price>;
  prices?: Maybe<Array<Price>>;
  success: Scalars['Boolean'];
};

export type Product = {
  __typename?: 'Product';
  averageRating: Scalars['Float'];
  brand: Brand;
  class?: Maybe<ProductClass>;
  commentCount: Scalars['Float'];
  comments?: Maybe<Array<UserComment>>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Float'];
  imageList: Array<Scalars['String']>;
  imgDescription: Array<Scalars['String']>;
  kind: ProductKind;
  maxPrice: Scalars['Float'];
  minPrice: Scalars['Float'];
  priceToDisplay: Scalars['Float'];
  prices: Array<Price>;
  productName: Scalars['String'];
  sales?: Maybe<Scalars['Float']>;
  thumbnail: Scalars['String'];
};

export type ProductClass = {
  __typename?: 'ProductClass';
  brands: Array<Brand>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  kind: ProductKind;
  name: Scalars['String'];
  products?: Maybe<Array<Product>>;
};

export type ProductInput = {
  brandId: Scalars['Float'];
  classId: Scalars['Float'];
  description: Scalars['String'];
  imgDescription: Array<Scalars['String']>;
  kindId: Scalars['Float'];
  priceToDisplay: Scalars['Float'];
  prices: Array<PriceInput>;
  productName: Scalars['String'];
  sales?: InputMaybe<Scalars['Float']>;
  thumbnail: Scalars['String'];
};

export type ProductKind = {
  __typename?: 'ProductKind';
  brands?: Maybe<Array<Brand>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  productClasses?: Maybe<Array<ProductClass>>;
  products?: Maybe<Array<Product>>;
};

export type ProductKindResponse = IResponse & {
  __typename?: 'ProductKindResponse';
  classes?: Maybe<Array<ProductClass>>;
  code: Scalars['Float'];
  kind?: Maybe<ProductKind>;
  kinds?: Maybe<Array<ProductKind>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ProductResponse = IResponse & {
  __typename?: 'ProductResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  products?: Maybe<Array<Product>>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  adminGetBills: BillResponse;
  adminGetCommentsNoFeedback: CommentResponse;
  adminGetKindBrandClass: KindBrandClassResponse;
  adminGetProductKinds: ProductKindResponse;
  adminGetTakeMoneyFields: TakeMoneyFieldResponse;
  checkIntroduceCode: UserResponse;
  dashboard: DashboardResponse;
  getBrandWithProducts: PaginationBrandWithProductsResponse;
  getBrands: BrandResponse;
  getCartProduct: CartProductResponse;
  getComments: PaginationCommentsResponse;
  getEvent: MyEventResponse;
  getEvents: MyEventResponse;
  getGift: GiftResponse;
  getGifts: GiftResponse;
  getKindsAndBrands: KindBrandClassResponse;
  getPaginationUsers: PaginationUsersResponse;
  getPaginationUsersToday: PaginationUsersResponse;
  getProduct: ProductResponse;
  getProductPaidAmount: Scalars['Float'];
  getProducts: PaginationProductsResponse;
  getProductsByKind: PaginationProductsResponse;
  getProductsBySearchInput: ProductResponse;
  getProductsForIndex: ProductKindResponse;
  getUser: UserResponse;
  getUserMoneyHistory: UserMoneyHistoryResponse;
  getWebData: WebDataResponse;
};


export type QueryAdminGetBillsArgs = {
  type: Scalars['String'];
};


export type QueryCheckIntroduceCodeArgs = {
  introduceCode: Scalars['Float'];
  totalPrice: Scalars['Float'];
};


export type QueryGetBrandWithProductsArgs = {
  paginationOptions: PaginationOptionsInput;
};


export type QueryGetBrandsArgs = {
  kindId: Scalars['Float'];
};


export type QueryGetCartProductArgs = {
  localBillProducts: Array<BillProductInput>;
};


export type QueryGetCommentsArgs = {
  productId: Scalars['Float'];
  skip: Scalars['Float'];
};


export type QueryGetEventArgs = {
  title: Scalars['String'];
};


export type QueryGetGiftArgs = {
  priceCondition: Scalars['Float'];
};


export type QueryGetGiftsArgs = {
  priceCondition: Scalars['Float'];
};


export type QueryGetPaginationUsersArgs = {
  skip?: InputMaybe<Scalars['Float']>;
};


export type QueryGetPaginationUsersTodayArgs = {
  skip?: InputMaybe<Scalars['Float']>;
};


export type QueryGetProductArgs = {
  productId: Scalars['ID'];
};


export type QueryGetProductsArgs = {
  paginationOptions: PaginationOptionsInput;
};


export type QueryGetProductsByKindArgs = {
  paginationOptions: PaginationOptionsInput;
};


export type QueryGetProductsBySearchInputArgs = {
  value: Scalars['String'];
};


export type QueryGetProductsForIndexArgs = {
  take: Scalars['Float'];
};


export type QueryGetWebDataArgs = {
  localBillProducts: Array<BillProductInput>;
};

export type SimpleResponse = IResponse & {
  __typename?: 'SimpleResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type TakeMoneyField = {
  __typename?: 'TakeMoneyField';
  accountBankName: Scalars['String'];
  accountNumber: Scalars['String'];
  accoutName: Scalars['String'];
  cancelReason?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  isSuccess?: Maybe<Scalars['Boolean']>;
  isSuccessImage?: Maybe<Scalars['String']>;
  money: Scalars['Float'];
  user: User;
};

export type TakeMoneyFieldInput = {
  accountBankName: Scalars['String'];
  accountNumber: Scalars['String'];
  accoutName: Scalars['String'];
  isSuccessImage?: InputMaybe<Scalars['String']>;
  money: Scalars['Float'];
};

export type TakeMoneyFieldResponse = IResponse & {
  __typename?: 'TakeMoneyFieldResponse';
  code: Scalars['Float'];
  field?: Maybe<TakeMoneyField>;
  fields?: Maybe<Array<TakeMoneyField>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  bills?: Maybe<Array<Bill>>;
  cancelCount: Scalars['Float'];
  comments?: Maybe<Array<UserComment>>;
  confirmWaitingCount: Scalars['Float'];
  createdAt: Scalars['String'];
  deliveringCount: Scalars['Float'];
  id: Scalars['Float'];
  introduceCode: Scalars['Float'];
  isHidden?: Maybe<Scalars['Boolean']>;
  moneyBonuses?: Maybe<Array<MoneyBonus>>;
  moneyCount: Scalars['Float'];
  packedCount: Scalars['Float'];
  paidAmount?: Maybe<Scalars['Float']>;
  takeMoneyField?: Maybe<Array<TakeMoneyField>>;
  userAvatar: Scalars['String'];
  userName: Scalars['String'];
};

export type UserComment = {
  __typename?: 'UserComment';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  feedbacks?: Maybe<Array<Feedback>>;
  id: Scalars['Float'];
  imagesComment?: Maybe<Array<Scalars['String']>>;
  isFeedback?: Maybe<Scalars['Boolean']>;
  product: Product;
  rating: Scalars['Float'];
  user: User;
};

export type UserMoneyHistoryResponse = IResponse & {
  __typename?: 'UserMoneyHistoryResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  moneyBonuses?: Maybe<Array<MoneyBonus>>;
  success: Scalars['Boolean'];
  takeMoneyFields?: Maybe<Array<TakeMoneyField>>;
};

export type UserResponse = IResponse & {
  __typename?: 'UserResponse';
  code: Scalars['Float'];
  introducePrice?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};

export type WebDataResponse = IResponse & {
  __typename?: 'WebDataResponse';
  brands?: Maybe<Array<Brand>>;
  code: Scalars['Float'];
  kinds?: Maybe<Array<ProductKind>>;
  message?: Maybe<Scalars['String']>;
  products?: Maybe<Array<BillProduct>>;
  success: Scalars['Boolean'];
};

export type AdminAddClassToBrandMutationVariables = Exact<{
  brandId: Scalars['Float'];
  classId: Scalars['Float'];
}>;


export type AdminAddClassToBrandMutation = { __typename?: 'Mutation', adminAddClassToBrand: { __typename?: 'SimpleResponse', code: number, success: boolean, message?: string | null } };

export type AdminCreateBrandMutationVariables = Exact<{
  brandInput: BrandInput;
}>;


export type AdminCreateBrandMutation = { __typename?: 'Mutation', adminCreateBrand: { __typename?: 'BrandResponse', code: number, success: boolean, message?: string | null } };

export type AdminCreateEventMutationVariables = Exact<{
  input: MyEventInput;
}>;


export type AdminCreateEventMutation = { __typename?: 'Mutation', adminCreateEvent: { __typename?: 'MyEventResponse', code: number, success: boolean, message?: string | null } };

export type AdminCreateFeedbackMutationVariables = Exact<{
  feedbackInput: FeedbackInput;
}>;


export type AdminCreateFeedbackMutation = { __typename?: 'Mutation', adminCreateFeedback: { __typename?: 'SimpleResponse', code: number, success: boolean, message?: string | null } };

export type AdminCreateOrEditPriceMutationVariables = Exact<{
  priceInput: PriceInput;
  priceId: Scalars['Float'];
  productId: Scalars['Float'];
}>;


export type AdminCreateOrEditPriceMutation = { __typename?: 'Mutation', adminCreateOrEditPrice: { __typename?: 'PriceResponse', code: number, success: boolean, message?: string | null, price?: { __typename?: 'Price', id: number, type: string, status: number, price: number } | null } };

export type AdminCreateProductClassMutationVariables = Exact<{
  name: Scalars['String'];
  id: Scalars['Float'];
}>;


export type AdminCreateProductClassMutation = { __typename?: 'Mutation', adminCreateProductClass: { __typename?: 'ProductKindResponse', code: number, success: boolean, message?: string | null } };

export type AdminCreateProductKindMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AdminCreateProductKindMutation = { __typename?: 'Mutation', adminCreateProductKind: { __typename?: 'ProductKindResponse', code: number, success: boolean, message?: string | null } };

export type AdminEditBillStatusMutationVariables = Exact<{
  billId: Scalars['Float'];
  status: Scalars['String'];
  paymentDown: Scalars['Float'];
}>;


export type AdminEditBillStatusMutation = { __typename?: 'Mutation', adminEditBillStatus: { __typename?: 'BillResponse', code: number, success: boolean, message?: string | null } };

export type AdminEditProductPriceMutationVariables = Exact<{
  priceId: Scalars['Float'];
  priceChanging: Scalars['Float'];
}>;


export type AdminEditProductPriceMutation = { __typename?: 'Mutation', adminEditProductPrice: { __typename?: 'PriceResponse', code: number, success: boolean, message?: string | null, price?: { __typename?: 'Price', id: number, type: string, price: number, status: number } | null } };

export type AdminHanleBillCompletedMutationVariables = Exact<{
  totalPrice: Scalars['Float'];
  billId: Scalars['Float'];
}>;


export type AdminHanleBillCompletedMutation = { __typename?: 'Mutation', adminHandleBillCompleted: { __typename?: 'BillResponse', code: number, success: boolean, message?: string | null } };

export type AdminHandleBillRejectMutationVariables = Exact<{
  billId: Scalars['Float'];
}>;


export type AdminHandleBillRejectMutation = { __typename?: 'Mutation', adminHandleBillReject: { __typename?: 'SimpleResponse', code: number, success: boolean, message?: string | null } };

export type AdminTakeMoneyFieldCancelMutationVariables = Exact<{
  fieldId: Scalars['Float'];
  cancelReason: Scalars['String'];
}>;


export type AdminTakeMoneyFieldCancelMutation = { __typename?: 'Mutation', adminTakeMoneyFieldCancel: { __typename?: 'SimpleResponse', code: number, success: boolean, message?: string | null } };

export type AdminTakeMoneyFieldCompletedMutationVariables = Exact<{
  fieldId: Scalars['Float'];
  imageSuccess: Scalars['String'];
}>;


export type AdminTakeMoneyFieldCompletedMutation = { __typename?: 'Mutation', adminTakeMoneyFieldCompleted: { __typename?: 'SimpleResponse', code: number, success: boolean, message?: string | null } };

export type ChangeIsHiddenMutationVariables = Exact<{
  value: Scalars['Boolean'];
}>;


export type ChangeIsHiddenMutation = { __typename?: 'Mutation', changeIsHidden: { __typename?: 'SimpleResponse', code: number, success: boolean, message?: string | null } };

export type CreateAdminMutationVariables = Exact<{
  adminId: Scalars['String'];
}>;


export type CreateAdminMutation = { __typename?: 'Mutation', createAdmin: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, token?: string | null } };

export type CreateBillMutationVariables = Exact<{
  billInput: BillInput;
}>;


export type CreateBillMutation = { __typename?: 'Mutation', createBill: { __typename?: 'BillResponse', code: number, success: boolean, message?: string | null } };

export type CreateCommentsMutationVariables = Exact<{
  commentInput: CommentInput;
}>;


export type CreateCommentsMutation = { __typename?: 'Mutation', createComments: { __typename?: 'CommentResponse', code: number, success: boolean, message?: string | null } };

export type CreateProductMutationVariables = Exact<{
  productInput: ProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductResponse', code: number, success: boolean, message?: string | null } };

export type TakeMoneyMutationVariables = Exact<{
  field: TakeMoneyFieldInput;
}>;


export type TakeMoneyMutation = { __typename?: 'Mutation', createTakeMoneyField: { __typename?: 'SimpleResponse', code: number, success: boolean, message?: string | null } };

export type HandleBillCancelMutationVariables = Exact<{
  billId: Scalars['Float'];
  reason: Scalars['String'];
}>;


export type HandleBillCancelMutation = { __typename?: 'Mutation', handleBillCancel: { __typename?: 'BillResponse', code: number, success: boolean, message?: string | null } };

export type LoginWithSocialsMutationVariables = Exact<{
  authInput: AuthInput;
}>;


export type LoginWithSocialsMutation = { __typename?: 'Mutation', loginWithsocial: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, token?: string | null, user?: { __typename?: 'User', userName: string, userAvatar: string, id: number, createdAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'UserResponse', code: number, success: boolean } };

export type UserCancelTakeMoneyFieldMutationVariables = Exact<{
  takeMoneyFieldId: Scalars['Float'];
}>;


export type UserCancelTakeMoneyFieldMutation = { __typename?: 'Mutation', userCancelTakeMoneyField: { __typename?: 'SimpleResponse', code: number, success: boolean, message?: string | null } };

export type AdminGetKindBrandClassQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetKindBrandClassQuery = { __typename?: 'Query', adminGetKindBrandClass: { __typename?: 'KindBrandClassResponse', code: number, success: boolean, message?: string | null, kinds?: Array<{ __typename?: 'ProductKind', id: number, name: string }> | null, classes?: Array<{ __typename?: 'ProductClass', id: number, name: string, kind: { __typename?: 'ProductKind', id: number } }> | null, brands?: Array<{ __typename?: 'Brand', id: number, brandName: string, kind: { __typename?: 'ProductKind', id: number } }> | null } };

export type GetUserMoneyHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserMoneyHistoryQuery = { __typename?: 'Query', getUserMoneyHistory: { __typename?: 'UserMoneyHistoryResponse', code: number, success: boolean, message?: string | null, moneyBonuses?: Array<{ __typename?: 'MoneyBonus', moneyNumber: number, description: string, type: string, createdAt: any }> | null, takeMoneyFields?: Array<{ __typename?: 'TakeMoneyField', id: number, accoutName: string, accountNumber: string, accountBankName: string, cancelReason?: string | null, money: number, isSuccess?: boolean | null, createdAt: any }> | null } };

export type AdminDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminDashboardQuery = { __typename?: 'Query', dashboard: { __typename?: 'DashboardResponse', code: number, success: boolean, takeMoneyField?: number | null, cancel?: number | null, confirmWaiting?: number | null, confirmed?: number | null, packed?: number | null, delivering?: number | null, commentNoFeedback?: number | null } };

export type AdminGetBillsQueryVariables = Exact<{
  type: Scalars['String'];
}>;


export type AdminGetBillsQuery = { __typename?: 'Query', adminGetBills: { __typename?: 'BillResponse', code: number, success: boolean, message?: string | null, bills?: Array<{ __typename?: 'Bill', id: number, notice?: string | null, deliveryPrice: number, totalPrice: number, introducePrice: number, billStatus?: string | null, paymentDown?: number | null, paymentType: string, billProducts: Array<{ __typename?: 'BillProduct', productName: string, productAmount: number, productPrice: number, productType: string }>, customer: { __typename?: 'Customer', customerName: string, customerPhone: string, city: string, province: string, address: string, id: number } }> | null } };

export type AdminGetCommentsNoFeedbackQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetCommentsNoFeedbackQuery = { __typename?: 'Query', adminGetCommentsNoFeedback: { __typename?: 'CommentResponse', code: number, success: boolean, message?: string | null, comments?: Array<{ __typename?: 'UserComment', id: number, content: string, user: { __typename?: 'User', userAvatar: string, userName: string }, product: { __typename?: 'Product', productName: string, priceToDisplay: number } }> | null } };

export type AdminGetProductKindsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetProductKindsQuery = { __typename?: 'Query', adminGetProductKinds: { __typename?: 'ProductKindResponse', code: number, success: boolean, message?: string | null, kinds?: Array<{ __typename?: 'ProductKind', id: number, name: string }> | null, classes?: Array<{ __typename?: 'ProductClass', id: number, name: string }> | null } };

export type AdminGetTakeMoneyFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetTakeMoneyFieldsQuery = { __typename?: 'Query', adminGetTakeMoneyFields: { __typename?: 'TakeMoneyFieldResponse', code: number, success: boolean, message?: string | null, fields?: Array<{ __typename?: 'TakeMoneyField', id: number, accoutName: string, accountNumber: string, accountBankName: string, money: number, user: { __typename?: 'User', moneyCount: number, id: number } }> | null } };

export type CheckIntroduceCodeQueryVariables = Exact<{
  introduceCode: Scalars['Float'];
  totalPrice: Scalars['Float'];
}>;


export type CheckIntroduceCodeQuery = { __typename?: 'Query', checkIntroduceCode: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, introducePrice?: number | null } };

export type GetBrandWithProductsQueryVariables = Exact<{
  paginationOptions: PaginationOptionsInput;
}>;


export type GetBrandWithProductsQuery = { __typename?: 'Query', getBrandWithProducts: { __typename?: 'PaginationBrandWithProductsResponse', code: number, success: boolean, message?: string | null, pageSize?: number | null, totalCount?: number | null, brandWithProducts?: { __typename?: 'Brand', id: number, brandName: string, thumbnail: string, description: string, kind: { __typename?: 'ProductKind', id: number, name: string }, productClasses: Array<{ __typename?: 'ProductClass', id: number, name: string }>, products?: Array<{ __typename?: 'Product', id: number, productName: string, priceToDisplay: number, commentCount: number, averageRating: number, sales?: number | null, thumbnail: string, class?: { __typename?: 'ProductClass', name: string } | null }> | null } | null } };

export type GetBrandsQueryVariables = Exact<{
  kindId: Scalars['Float'];
}>;


export type GetBrandsQuery = { __typename?: 'Query', getBrands: { __typename?: 'BrandResponse', code: number, success: boolean, message?: string | null, brands?: Array<{ __typename?: 'Brand', id: number, brandName: string, thumbnail: string }> | null } };

export type GetCartProductQueryVariables = Exact<{
  localBillProducts: Array<BillProductInput> | BillProductInput;
}>;


export type GetCartProductQuery = { __typename?: 'Query', getCartProduct: { __typename?: 'CartProductResponse', code: number, success: boolean, message?: string | null, products?: Array<{ __typename?: 'BillProduct', productName: string, productType: string, productPrice: number, productAmount: number, productThumbnail: string, priceIdForLocal?: number | null }> | null } };

export type GetCommentsQueryVariables = Exact<{
  skip: Scalars['Float'];
  productId: Scalars['Float'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: { __typename?: 'PaginationCommentsResponse', code: number, success: boolean, message?: string | null, totalCount?: number | null, cursor?: number | null, hasMore?: boolean | null, comments?: Array<{ __typename?: 'UserComment', content: string, rating: number, imagesComment?: Array<string> | null, createdAt: any, user: { __typename?: 'User', userName: string, userAvatar: string }, feedbacks?: Array<{ __typename?: 'Feedback', content: string, createdAt: any, admin: { __typename?: 'Admin', adminName: string, avatar: string } }> | null }> | null } };

export type GetEventQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type GetEventQuery = { __typename?: 'Query', getEvent: { __typename?: 'MyEventResponse', code: number, success: boolean, message?: string | null, myEvent?: { __typename?: 'MyEvent', title: string, thumbnail: string, content: string, instructionImages?: Array<string> | null, createdAt: any } | null } };

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { __typename?: 'Query', getEvents: { __typename?: 'MyEventResponse', code: number, success: boolean, message?: string | null, myEvents?: Array<{ __typename?: 'MyEvent', title: string, content: string, summary: string, thumbnail: string }> | null } };

export type GetGiftQueryVariables = Exact<{
  priceCondition: Scalars['Float'];
}>;


export type GetGiftQuery = { __typename?: 'Query', getGift: { __typename?: 'GiftResponse', code: number, success: boolean, message?: string | null, gifts?: Array<{ __typename?: 'Price', price: number, type: string, status: number, isGift?: boolean | null, product: { __typename?: 'Product', thumbnail: string, productName: string, priceToDisplay: number, sales?: number | null } }> | null } };

export type GetGiftsQueryVariables = Exact<{
  priceCondition: Scalars['Float'];
}>;


export type GetGiftsQuery = { __typename?: 'Query', getGifts: { __typename?: 'GiftResponse', code: number, success: boolean, message?: string | null, gifts?: Array<{ __typename?: 'Price', price: number, type: string, status: number, isGift?: boolean | null, product: { __typename?: 'Product', thumbnail: string, productName: string, priceToDisplay: number, sales?: number | null } }> | null } };

export type GetKindsAndBrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetKindsAndBrandsQuery = { __typename?: 'Query', getKindsAndBrands: { __typename?: 'KindBrandClassResponse', code: number, success: boolean, kinds?: Array<{ __typename?: 'ProductKind', id: number, name: string }> | null, brands?: Array<{ __typename?: 'Brand', id: number, brandName: string }> | null } };

export type GetPaginationUsersQueryVariables = Exact<{
  skip: Scalars['Float'];
}>;


export type GetPaginationUsersQuery = { __typename?: 'Query', getPaginationUsers: { __typename?: 'PaginationUsersResponse', code: number, success: boolean, message?: string | null, totalCount?: number | null, hasMore: boolean, cursor: number, users?: Array<{ __typename?: 'User', userName: string, userAvatar: string }> | null } };

export type GetProductQueryVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct: { __typename?: 'ProductResponse', code: number, message?: string | null, success: boolean, product?: { __typename?: 'Product', id: number, thumbnail: string, productName: string, imgDescription: Array<string>, imageList: Array<string>, description: string, priceToDisplay: number, kind: { __typename?: 'ProductKind', id: number, name: string }, prices: Array<{ __typename?: 'Price', id: number, type: string, price: number, status: number }>, brand: { __typename?: 'Brand', id: number, brandName: string }, comments?: Array<{ __typename?: 'UserComment', content: string, rating: number, imagesComment?: Array<string> | null, createdAt: any, user: { __typename?: 'User', userName: string, userAvatar: string }, feedbacks?: Array<{ __typename?: 'Feedback', content: string, createdAt: any, admin: { __typename?: 'Admin', adminName: string, avatar: string } }> | null }> | null } | null } };

export type GetProductsForIndexQueryVariables = Exact<{
  take: Scalars['Float'];
}>;


export type GetProductsForIndexQuery = { __typename?: 'Query', getProductsForIndex: { __typename?: 'ProductKindResponse', code: number, success: boolean, message?: string | null, kinds?: Array<{ __typename?: 'ProductKind', id: number, name: string, products?: Array<{ __typename?: 'Product', id: number, productName: string, averageRating: number, sales?: number | null, thumbnail: string, priceToDisplay: number, commentCount: number, class?: { __typename?: 'ProductClass', name: string } | null }> | null }> | null } };

export type GetProductPaidAmountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductPaidAmountQuery = { __typename?: 'Query', getProductPaidAmount: number };

export type GetProductsQueryVariables = Exact<{
  paginationOptions: PaginationOptionsInput;
}>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: { __typename?: 'PaginationProductsResponse', code: number, success: boolean, message?: string | null, totalCount?: number | null, pageSize?: number | null, products?: Array<{ __typename?: 'Product', id: number, productName: string, averageRating: number, sales?: number | null, thumbnail: string, priceToDisplay: number, imgDescription: Array<string>, commentCount: number, prices: Array<{ __typename?: 'Price', id: number, type: string, price: number, status: number }> }> | null } };

export type GetProductsByKindQueryVariables = Exact<{
  paginationOptions: PaginationOptionsInput;
}>;


export type GetProductsByKindQuery = { __typename?: 'Query', getProductsByKind: { __typename?: 'PaginationProductsResponse', code: number, success: boolean, message?: string | null, pageSize?: number | null, totalCount?: number | null, kindId?: number | null, productClasses?: Array<{ __typename?: 'ProductClass', id: number, name: string }> | null, products?: Array<{ __typename?: 'Product', id: number, productName: string, priceToDisplay: number, commentCount: number, averageRating: number, sales?: number | null, thumbnail: string, prices: Array<{ __typename?: 'Price', id: number, type: string, price: number, status: number }>, class?: { __typename?: 'ProductClass', name: string } | null }> | null } };

export type GetProductsBySearchInputQueryVariables = Exact<{
  value: Scalars['String'];
}>;


export type GetProductsBySearchInputQuery = { __typename?: 'Query', getProductsBySearchInput: { __typename?: 'ProductResponse', code: number, success: boolean, message?: string | null, products?: Array<{ __typename?: 'Product', id: number, productName: string, thumbnail: string, minPrice: number, maxPrice: number }> | null } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', userName: string, userAvatar: string, confirmWaitingCount: number, packedCount: number, moneyCount: number, deliveringCount: number, introduceCode: number, bills?: Array<{ __typename?: 'Bill', id: number, billStatus?: string | null, createdAt: string, paymentType: string, paymentDown?: number | null, totalPrice: number, commentPrice: number, introducePrice: number, isCommented?: boolean | null, billProducts: Array<{ __typename?: 'BillProduct', productThumbnail: string, productName: string, productAmount: number, productType: string, productPrice: number }>, customer: { __typename?: 'Customer', customerName: string, customerPhone: string, address: string, city: string, province: string } }> | null } | null } };

export type GetWebDataQueryVariables = Exact<{
  localBillProducts: Array<BillProductInput> | BillProductInput;
}>;


export type GetWebDataQuery = { __typename?: 'Query', getWebData: { __typename?: 'WebDataResponse', code: number, success: boolean, message?: string | null, products?: Array<{ __typename?: 'BillProduct', productName: string, productType: string, productPrice: number, productAmount: number, productThumbnail: string, priceIdForLocal?: number | null }> | null, kinds?: Array<{ __typename?: 'ProductKind', id: number, name: string }> | null, brands?: Array<{ __typename?: 'Brand', id: number, brandName: string }> | null } };


export const AdminAddClassToBrandDocument = gql`
    mutation AdminAddClassToBrand($brandId: Float!, $classId: Float!) {
  adminAddClassToBrand(brandId: $brandId, classId: $classId) {
    code
    success
    message
  }
}
    `;
export type AdminAddClassToBrandMutationFn = Apollo.MutationFunction<AdminAddClassToBrandMutation, AdminAddClassToBrandMutationVariables>;

/**
 * __useAdminAddClassToBrandMutation__
 *
 * To run a mutation, you first call `useAdminAddClassToBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminAddClassToBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminAddClassToBrandMutation, { data, loading, error }] = useAdminAddClassToBrandMutation({
 *   variables: {
 *      brandId: // value for 'brandId'
 *      classId: // value for 'classId'
 *   },
 * });
 */
export function useAdminAddClassToBrandMutation(baseOptions?: Apollo.MutationHookOptions<AdminAddClassToBrandMutation, AdminAddClassToBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminAddClassToBrandMutation, AdminAddClassToBrandMutationVariables>(AdminAddClassToBrandDocument, options);
      }
export type AdminAddClassToBrandMutationHookResult = ReturnType<typeof useAdminAddClassToBrandMutation>;
export type AdminAddClassToBrandMutationResult = Apollo.MutationResult<AdminAddClassToBrandMutation>;
export type AdminAddClassToBrandMutationOptions = Apollo.BaseMutationOptions<AdminAddClassToBrandMutation, AdminAddClassToBrandMutationVariables>;
export const AdminCreateBrandDocument = gql`
    mutation AdminCreateBrand($brandInput: BrandInput!) {
  adminCreateBrand(brandInput: $brandInput) {
    code
    success
    message
  }
}
    `;
export type AdminCreateBrandMutationFn = Apollo.MutationFunction<AdminCreateBrandMutation, AdminCreateBrandMutationVariables>;

/**
 * __useAdminCreateBrandMutation__
 *
 * To run a mutation, you first call `useAdminCreateBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateBrandMutation, { data, loading, error }] = useAdminCreateBrandMutation({
 *   variables: {
 *      brandInput: // value for 'brandInput'
 *   },
 * });
 */
export function useAdminCreateBrandMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateBrandMutation, AdminCreateBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateBrandMutation, AdminCreateBrandMutationVariables>(AdminCreateBrandDocument, options);
      }
export type AdminCreateBrandMutationHookResult = ReturnType<typeof useAdminCreateBrandMutation>;
export type AdminCreateBrandMutationResult = Apollo.MutationResult<AdminCreateBrandMutation>;
export type AdminCreateBrandMutationOptions = Apollo.BaseMutationOptions<AdminCreateBrandMutation, AdminCreateBrandMutationVariables>;
export const AdminCreateEventDocument = gql`
    mutation AdminCreateEvent($input: MyEventInput!) {
  adminCreateEvent(input: $input) {
    code
    success
    message
  }
}
    `;
export type AdminCreateEventMutationFn = Apollo.MutationFunction<AdminCreateEventMutation, AdminCreateEventMutationVariables>;

/**
 * __useAdminCreateEventMutation__
 *
 * To run a mutation, you first call `useAdminCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateEventMutation, { data, loading, error }] = useAdminCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateEventMutation, AdminCreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateEventMutation, AdminCreateEventMutationVariables>(AdminCreateEventDocument, options);
      }
export type AdminCreateEventMutationHookResult = ReturnType<typeof useAdminCreateEventMutation>;
export type AdminCreateEventMutationResult = Apollo.MutationResult<AdminCreateEventMutation>;
export type AdminCreateEventMutationOptions = Apollo.BaseMutationOptions<AdminCreateEventMutation, AdminCreateEventMutationVariables>;
export const AdminCreateFeedbackDocument = gql`
    mutation AdminCreateFeedback($feedbackInput: FeedbackInput!) {
  adminCreateFeedback(feedbackInput: $feedbackInput) {
    code
    success
    message
  }
}
    `;
export type AdminCreateFeedbackMutationFn = Apollo.MutationFunction<AdminCreateFeedbackMutation, AdminCreateFeedbackMutationVariables>;

/**
 * __useAdminCreateFeedbackMutation__
 *
 * To run a mutation, you first call `useAdminCreateFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateFeedbackMutation, { data, loading, error }] = useAdminCreateFeedbackMutation({
 *   variables: {
 *      feedbackInput: // value for 'feedbackInput'
 *   },
 * });
 */
export function useAdminCreateFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateFeedbackMutation, AdminCreateFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateFeedbackMutation, AdminCreateFeedbackMutationVariables>(AdminCreateFeedbackDocument, options);
      }
export type AdminCreateFeedbackMutationHookResult = ReturnType<typeof useAdminCreateFeedbackMutation>;
export type AdminCreateFeedbackMutationResult = Apollo.MutationResult<AdminCreateFeedbackMutation>;
export type AdminCreateFeedbackMutationOptions = Apollo.BaseMutationOptions<AdminCreateFeedbackMutation, AdminCreateFeedbackMutationVariables>;
export const AdminCreateOrEditPriceDocument = gql`
    mutation AdminCreateOrEditPrice($priceInput: PriceInput!, $priceId: Float!, $productId: Float!) {
  adminCreateOrEditPrice(
    priceInput: $priceInput
    priceId: $priceId
    productId: $productId
  ) {
    code
    success
    message
    price {
      id
      type
      status
      price
    }
  }
}
    `;
export type AdminCreateOrEditPriceMutationFn = Apollo.MutationFunction<AdminCreateOrEditPriceMutation, AdminCreateOrEditPriceMutationVariables>;

/**
 * __useAdminCreateOrEditPriceMutation__
 *
 * To run a mutation, you first call `useAdminCreateOrEditPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateOrEditPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateOrEditPriceMutation, { data, loading, error }] = useAdminCreateOrEditPriceMutation({
 *   variables: {
 *      priceInput: // value for 'priceInput'
 *      priceId: // value for 'priceId'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAdminCreateOrEditPriceMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateOrEditPriceMutation, AdminCreateOrEditPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateOrEditPriceMutation, AdminCreateOrEditPriceMutationVariables>(AdminCreateOrEditPriceDocument, options);
      }
export type AdminCreateOrEditPriceMutationHookResult = ReturnType<typeof useAdminCreateOrEditPriceMutation>;
export type AdminCreateOrEditPriceMutationResult = Apollo.MutationResult<AdminCreateOrEditPriceMutation>;
export type AdminCreateOrEditPriceMutationOptions = Apollo.BaseMutationOptions<AdminCreateOrEditPriceMutation, AdminCreateOrEditPriceMutationVariables>;
export const AdminCreateProductClassDocument = gql`
    mutation AdminCreateProductClass($name: String!, $id: Float!) {
  adminCreateProductClass(name: $name, id: $id) {
    code
    success
    message
  }
}
    `;
export type AdminCreateProductClassMutationFn = Apollo.MutationFunction<AdminCreateProductClassMutation, AdminCreateProductClassMutationVariables>;

/**
 * __useAdminCreateProductClassMutation__
 *
 * To run a mutation, you first call `useAdminCreateProductClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateProductClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateProductClassMutation, { data, loading, error }] = useAdminCreateProductClassMutation({
 *   variables: {
 *      name: // value for 'name'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminCreateProductClassMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateProductClassMutation, AdminCreateProductClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateProductClassMutation, AdminCreateProductClassMutationVariables>(AdminCreateProductClassDocument, options);
      }
export type AdminCreateProductClassMutationHookResult = ReturnType<typeof useAdminCreateProductClassMutation>;
export type AdminCreateProductClassMutationResult = Apollo.MutationResult<AdminCreateProductClassMutation>;
export type AdminCreateProductClassMutationOptions = Apollo.BaseMutationOptions<AdminCreateProductClassMutation, AdminCreateProductClassMutationVariables>;
export const AdminCreateProductKindDocument = gql`
    mutation AdminCreateProductKind($name: String!) {
  adminCreateProductKind(name: $name) {
    code
    success
    message
  }
}
    `;
export type AdminCreateProductKindMutationFn = Apollo.MutationFunction<AdminCreateProductKindMutation, AdminCreateProductKindMutationVariables>;

/**
 * __useAdminCreateProductKindMutation__
 *
 * To run a mutation, you first call `useAdminCreateProductKindMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateProductKindMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateProductKindMutation, { data, loading, error }] = useAdminCreateProductKindMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAdminCreateProductKindMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateProductKindMutation, AdminCreateProductKindMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateProductKindMutation, AdminCreateProductKindMutationVariables>(AdminCreateProductKindDocument, options);
      }
export type AdminCreateProductKindMutationHookResult = ReturnType<typeof useAdminCreateProductKindMutation>;
export type AdminCreateProductKindMutationResult = Apollo.MutationResult<AdminCreateProductKindMutation>;
export type AdminCreateProductKindMutationOptions = Apollo.BaseMutationOptions<AdminCreateProductKindMutation, AdminCreateProductKindMutationVariables>;
export const AdminEditBillStatusDocument = gql`
    mutation AdminEditBillStatus($billId: Float!, $status: String!, $paymentDown: Float!) {
  adminEditBillStatus(billId: $billId, status: $status, paymentDown: $paymentDown) {
    code
    success
    message
  }
}
    `;
export type AdminEditBillStatusMutationFn = Apollo.MutationFunction<AdminEditBillStatusMutation, AdminEditBillStatusMutationVariables>;

/**
 * __useAdminEditBillStatusMutation__
 *
 * To run a mutation, you first call `useAdminEditBillStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminEditBillStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminEditBillStatusMutation, { data, loading, error }] = useAdminEditBillStatusMutation({
 *   variables: {
 *      billId: // value for 'billId'
 *      status: // value for 'status'
 *      paymentDown: // value for 'paymentDown'
 *   },
 * });
 */
export function useAdminEditBillStatusMutation(baseOptions?: Apollo.MutationHookOptions<AdminEditBillStatusMutation, AdminEditBillStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminEditBillStatusMutation, AdminEditBillStatusMutationVariables>(AdminEditBillStatusDocument, options);
      }
export type AdminEditBillStatusMutationHookResult = ReturnType<typeof useAdminEditBillStatusMutation>;
export type AdminEditBillStatusMutationResult = Apollo.MutationResult<AdminEditBillStatusMutation>;
export type AdminEditBillStatusMutationOptions = Apollo.BaseMutationOptions<AdminEditBillStatusMutation, AdminEditBillStatusMutationVariables>;
export const AdminEditProductPriceDocument = gql`
    mutation AdminEditProductPrice($priceId: Float!, $priceChanging: Float!) {
  adminEditProductPrice(priceId: $priceId, priceChanging: $priceChanging) {
    code
    success
    message
    price {
      id
      type
      price
      status
    }
  }
}
    `;
export type AdminEditProductPriceMutationFn = Apollo.MutationFunction<AdminEditProductPriceMutation, AdminEditProductPriceMutationVariables>;

/**
 * __useAdminEditProductPriceMutation__
 *
 * To run a mutation, you first call `useAdminEditProductPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminEditProductPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminEditProductPriceMutation, { data, loading, error }] = useAdminEditProductPriceMutation({
 *   variables: {
 *      priceId: // value for 'priceId'
 *      priceChanging: // value for 'priceChanging'
 *   },
 * });
 */
export function useAdminEditProductPriceMutation(baseOptions?: Apollo.MutationHookOptions<AdminEditProductPriceMutation, AdminEditProductPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminEditProductPriceMutation, AdminEditProductPriceMutationVariables>(AdminEditProductPriceDocument, options);
      }
export type AdminEditProductPriceMutationHookResult = ReturnType<typeof useAdminEditProductPriceMutation>;
export type AdminEditProductPriceMutationResult = Apollo.MutationResult<AdminEditProductPriceMutation>;
export type AdminEditProductPriceMutationOptions = Apollo.BaseMutationOptions<AdminEditProductPriceMutation, AdminEditProductPriceMutationVariables>;
export const AdminHanleBillCompletedDocument = gql`
    mutation AdminHanleBillCompleted($totalPrice: Float!, $billId: Float!) {
  adminHandleBillCompleted(totalPrice: $totalPrice, billId: $billId) {
    code
    success
    message
  }
}
    `;
export type AdminHanleBillCompletedMutationFn = Apollo.MutationFunction<AdminHanleBillCompletedMutation, AdminHanleBillCompletedMutationVariables>;

/**
 * __useAdminHanleBillCompletedMutation__
 *
 * To run a mutation, you first call `useAdminHanleBillCompletedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminHanleBillCompletedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminHanleBillCompletedMutation, { data, loading, error }] = useAdminHanleBillCompletedMutation({
 *   variables: {
 *      totalPrice: // value for 'totalPrice'
 *      billId: // value for 'billId'
 *   },
 * });
 */
export function useAdminHanleBillCompletedMutation(baseOptions?: Apollo.MutationHookOptions<AdminHanleBillCompletedMutation, AdminHanleBillCompletedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminHanleBillCompletedMutation, AdminHanleBillCompletedMutationVariables>(AdminHanleBillCompletedDocument, options);
      }
export type AdminHanleBillCompletedMutationHookResult = ReturnType<typeof useAdminHanleBillCompletedMutation>;
export type AdminHanleBillCompletedMutationResult = Apollo.MutationResult<AdminHanleBillCompletedMutation>;
export type AdminHanleBillCompletedMutationOptions = Apollo.BaseMutationOptions<AdminHanleBillCompletedMutation, AdminHanleBillCompletedMutationVariables>;
export const AdminHandleBillRejectDocument = gql`
    mutation AdminHandleBillReject($billId: Float!) {
  adminHandleBillReject(billId: $billId) {
    code
    success
    message
  }
}
    `;
export type AdminHandleBillRejectMutationFn = Apollo.MutationFunction<AdminHandleBillRejectMutation, AdminHandleBillRejectMutationVariables>;

/**
 * __useAdminHandleBillRejectMutation__
 *
 * To run a mutation, you first call `useAdminHandleBillRejectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminHandleBillRejectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminHandleBillRejectMutation, { data, loading, error }] = useAdminHandleBillRejectMutation({
 *   variables: {
 *      billId: // value for 'billId'
 *   },
 * });
 */
export function useAdminHandleBillRejectMutation(baseOptions?: Apollo.MutationHookOptions<AdminHandleBillRejectMutation, AdminHandleBillRejectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminHandleBillRejectMutation, AdminHandleBillRejectMutationVariables>(AdminHandleBillRejectDocument, options);
      }
export type AdminHandleBillRejectMutationHookResult = ReturnType<typeof useAdminHandleBillRejectMutation>;
export type AdminHandleBillRejectMutationResult = Apollo.MutationResult<AdminHandleBillRejectMutation>;
export type AdminHandleBillRejectMutationOptions = Apollo.BaseMutationOptions<AdminHandleBillRejectMutation, AdminHandleBillRejectMutationVariables>;
export const AdminTakeMoneyFieldCancelDocument = gql`
    mutation AdminTakeMoneyFieldCancel($fieldId: Float!, $cancelReason: String!) {
  adminTakeMoneyFieldCancel(fieldId: $fieldId, cancelReason: $cancelReason) {
    code
    success
    message
  }
}
    `;
export type AdminTakeMoneyFieldCancelMutationFn = Apollo.MutationFunction<AdminTakeMoneyFieldCancelMutation, AdminTakeMoneyFieldCancelMutationVariables>;

/**
 * __useAdminTakeMoneyFieldCancelMutation__
 *
 * To run a mutation, you first call `useAdminTakeMoneyFieldCancelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminTakeMoneyFieldCancelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminTakeMoneyFieldCancelMutation, { data, loading, error }] = useAdminTakeMoneyFieldCancelMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *      cancelReason: // value for 'cancelReason'
 *   },
 * });
 */
export function useAdminTakeMoneyFieldCancelMutation(baseOptions?: Apollo.MutationHookOptions<AdminTakeMoneyFieldCancelMutation, AdminTakeMoneyFieldCancelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminTakeMoneyFieldCancelMutation, AdminTakeMoneyFieldCancelMutationVariables>(AdminTakeMoneyFieldCancelDocument, options);
      }
export type AdminTakeMoneyFieldCancelMutationHookResult = ReturnType<typeof useAdminTakeMoneyFieldCancelMutation>;
export type AdminTakeMoneyFieldCancelMutationResult = Apollo.MutationResult<AdminTakeMoneyFieldCancelMutation>;
export type AdminTakeMoneyFieldCancelMutationOptions = Apollo.BaseMutationOptions<AdminTakeMoneyFieldCancelMutation, AdminTakeMoneyFieldCancelMutationVariables>;
export const AdminTakeMoneyFieldCompletedDocument = gql`
    mutation AdminTakeMoneyFieldCompleted($fieldId: Float!, $imageSuccess: String!) {
  adminTakeMoneyFieldCompleted(fieldId: $fieldId, imageSuccess: $imageSuccess) {
    code
    success
    message
  }
}
    `;
export type AdminTakeMoneyFieldCompletedMutationFn = Apollo.MutationFunction<AdminTakeMoneyFieldCompletedMutation, AdminTakeMoneyFieldCompletedMutationVariables>;

/**
 * __useAdminTakeMoneyFieldCompletedMutation__
 *
 * To run a mutation, you first call `useAdminTakeMoneyFieldCompletedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminTakeMoneyFieldCompletedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminTakeMoneyFieldCompletedMutation, { data, loading, error }] = useAdminTakeMoneyFieldCompletedMutation({
 *   variables: {
 *      fieldId: // value for 'fieldId'
 *      imageSuccess: // value for 'imageSuccess'
 *   },
 * });
 */
export function useAdminTakeMoneyFieldCompletedMutation(baseOptions?: Apollo.MutationHookOptions<AdminTakeMoneyFieldCompletedMutation, AdminTakeMoneyFieldCompletedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminTakeMoneyFieldCompletedMutation, AdminTakeMoneyFieldCompletedMutationVariables>(AdminTakeMoneyFieldCompletedDocument, options);
      }
export type AdminTakeMoneyFieldCompletedMutationHookResult = ReturnType<typeof useAdminTakeMoneyFieldCompletedMutation>;
export type AdminTakeMoneyFieldCompletedMutationResult = Apollo.MutationResult<AdminTakeMoneyFieldCompletedMutation>;
export type AdminTakeMoneyFieldCompletedMutationOptions = Apollo.BaseMutationOptions<AdminTakeMoneyFieldCompletedMutation, AdminTakeMoneyFieldCompletedMutationVariables>;
export const ChangeIsHiddenDocument = gql`
    mutation ChangeIsHidden($value: Boolean!) {
  changeIsHidden(value: $value) {
    code
    success
    message
  }
}
    `;
export type ChangeIsHiddenMutationFn = Apollo.MutationFunction<ChangeIsHiddenMutation, ChangeIsHiddenMutationVariables>;

/**
 * __useChangeIsHiddenMutation__
 *
 * To run a mutation, you first call `useChangeIsHiddenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeIsHiddenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeIsHiddenMutation, { data, loading, error }] = useChangeIsHiddenMutation({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useChangeIsHiddenMutation(baseOptions?: Apollo.MutationHookOptions<ChangeIsHiddenMutation, ChangeIsHiddenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeIsHiddenMutation, ChangeIsHiddenMutationVariables>(ChangeIsHiddenDocument, options);
      }
export type ChangeIsHiddenMutationHookResult = ReturnType<typeof useChangeIsHiddenMutation>;
export type ChangeIsHiddenMutationResult = Apollo.MutationResult<ChangeIsHiddenMutation>;
export type ChangeIsHiddenMutationOptions = Apollo.BaseMutationOptions<ChangeIsHiddenMutation, ChangeIsHiddenMutationVariables>;
export const CreateAdminDocument = gql`
    mutation CreateAdmin($adminId: String!) {
  createAdmin(adminId: $adminId) {
    code
    success
    message
    token
  }
}
    `;
export type CreateAdminMutationFn = Apollo.MutationFunction<CreateAdminMutation, CreateAdminMutationVariables>;

/**
 * __useCreateAdminMutation__
 *
 * To run a mutation, you first call `useCreateAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdminMutation, { data, loading, error }] = useCreateAdminMutation({
 *   variables: {
 *      adminId: // value for 'adminId'
 *   },
 * });
 */
export function useCreateAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdminMutation, CreateAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdminMutation, CreateAdminMutationVariables>(CreateAdminDocument, options);
      }
export type CreateAdminMutationHookResult = ReturnType<typeof useCreateAdminMutation>;
export type CreateAdminMutationResult = Apollo.MutationResult<CreateAdminMutation>;
export type CreateAdminMutationOptions = Apollo.BaseMutationOptions<CreateAdminMutation, CreateAdminMutationVariables>;
export const CreateBillDocument = gql`
    mutation CreateBill($billInput: BillInput!) {
  createBill(billInput: $billInput) {
    code
    success
    message
  }
}
    `;
export type CreateBillMutationFn = Apollo.MutationFunction<CreateBillMutation, CreateBillMutationVariables>;

/**
 * __useCreateBillMutation__
 *
 * To run a mutation, you first call `useCreateBillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBillMutation, { data, loading, error }] = useCreateBillMutation({
 *   variables: {
 *      billInput: // value for 'billInput'
 *   },
 * });
 */
export function useCreateBillMutation(baseOptions?: Apollo.MutationHookOptions<CreateBillMutation, CreateBillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBillMutation, CreateBillMutationVariables>(CreateBillDocument, options);
      }
export type CreateBillMutationHookResult = ReturnType<typeof useCreateBillMutation>;
export type CreateBillMutationResult = Apollo.MutationResult<CreateBillMutation>;
export type CreateBillMutationOptions = Apollo.BaseMutationOptions<CreateBillMutation, CreateBillMutationVariables>;
export const CreateCommentsDocument = gql`
    mutation CreateComments($commentInput: CommentInput!) {
  createComments(commentInput: $commentInput) {
    code
    success
    message
  }
}
    `;
export type CreateCommentsMutationFn = Apollo.MutationFunction<CreateCommentsMutation, CreateCommentsMutationVariables>;

/**
 * __useCreateCommentsMutation__
 *
 * To run a mutation, you first call `useCreateCommentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentsMutation, { data, loading, error }] = useCreateCommentsMutation({
 *   variables: {
 *      commentInput: // value for 'commentInput'
 *   },
 * });
 */
export function useCreateCommentsMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentsMutation, CreateCommentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentsMutation, CreateCommentsMutationVariables>(CreateCommentsDocument, options);
      }
export type CreateCommentsMutationHookResult = ReturnType<typeof useCreateCommentsMutation>;
export type CreateCommentsMutationResult = Apollo.MutationResult<CreateCommentsMutation>;
export type CreateCommentsMutationOptions = Apollo.BaseMutationOptions<CreateCommentsMutation, CreateCommentsMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($productInput: ProductInput!) {
  createProduct(productInput: $productInput) {
    code
    success
    message
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      productInput: // value for 'productInput'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const TakeMoneyDocument = gql`
    mutation TakeMoney($field: TakeMoneyFieldInput!) {
  createTakeMoneyField(field: $field) {
    code
    success
    message
  }
}
    `;
export type TakeMoneyMutationFn = Apollo.MutationFunction<TakeMoneyMutation, TakeMoneyMutationVariables>;

/**
 * __useTakeMoneyMutation__
 *
 * To run a mutation, you first call `useTakeMoneyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTakeMoneyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [takeMoneyMutation, { data, loading, error }] = useTakeMoneyMutation({
 *   variables: {
 *      field: // value for 'field'
 *   },
 * });
 */
export function useTakeMoneyMutation(baseOptions?: Apollo.MutationHookOptions<TakeMoneyMutation, TakeMoneyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TakeMoneyMutation, TakeMoneyMutationVariables>(TakeMoneyDocument, options);
      }
export type TakeMoneyMutationHookResult = ReturnType<typeof useTakeMoneyMutation>;
export type TakeMoneyMutationResult = Apollo.MutationResult<TakeMoneyMutation>;
export type TakeMoneyMutationOptions = Apollo.BaseMutationOptions<TakeMoneyMutation, TakeMoneyMutationVariables>;
export const HandleBillCancelDocument = gql`
    mutation HandleBillCancel($billId: Float!, $reason: String!) {
  handleBillCancel(billId: $billId, reason: $reason) {
    code
    success
    message
  }
}
    `;
export type HandleBillCancelMutationFn = Apollo.MutationFunction<HandleBillCancelMutation, HandleBillCancelMutationVariables>;

/**
 * __useHandleBillCancelMutation__
 *
 * To run a mutation, you first call `useHandleBillCancelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleBillCancelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleBillCancelMutation, { data, loading, error }] = useHandleBillCancelMutation({
 *   variables: {
 *      billId: // value for 'billId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useHandleBillCancelMutation(baseOptions?: Apollo.MutationHookOptions<HandleBillCancelMutation, HandleBillCancelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleBillCancelMutation, HandleBillCancelMutationVariables>(HandleBillCancelDocument, options);
      }
export type HandleBillCancelMutationHookResult = ReturnType<typeof useHandleBillCancelMutation>;
export type HandleBillCancelMutationResult = Apollo.MutationResult<HandleBillCancelMutation>;
export type HandleBillCancelMutationOptions = Apollo.BaseMutationOptions<HandleBillCancelMutation, HandleBillCancelMutationVariables>;
export const LoginWithSocialsDocument = gql`
    mutation LoginWithSocials($authInput: AuthInput!) {
  loginWithsocial(authInput: $authInput) {
    code
    success
    message
    user {
      userName
      userAvatar
      id
      createdAt
    }
    token
  }
}
    `;
export type LoginWithSocialsMutationFn = Apollo.MutationFunction<LoginWithSocialsMutation, LoginWithSocialsMutationVariables>;

/**
 * __useLoginWithSocialsMutation__
 *
 * To run a mutation, you first call `useLoginWithSocialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithSocialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithSocialsMutation, { data, loading, error }] = useLoginWithSocialsMutation({
 *   variables: {
 *      authInput: // value for 'authInput'
 *   },
 * });
 */
export function useLoginWithSocialsMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithSocialsMutation, LoginWithSocialsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithSocialsMutation, LoginWithSocialsMutationVariables>(LoginWithSocialsDocument, options);
      }
export type LoginWithSocialsMutationHookResult = ReturnType<typeof useLoginWithSocialsMutation>;
export type LoginWithSocialsMutationResult = Apollo.MutationResult<LoginWithSocialsMutation>;
export type LoginWithSocialsMutationOptions = Apollo.BaseMutationOptions<LoginWithSocialsMutation, LoginWithSocialsMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    code
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UserCancelTakeMoneyFieldDocument = gql`
    mutation UserCancelTakeMoneyField($takeMoneyFieldId: Float!) {
  userCancelTakeMoneyField(takeMoneyFieldId: $takeMoneyFieldId) {
    code
    success
    message
  }
}
    `;
export type UserCancelTakeMoneyFieldMutationFn = Apollo.MutationFunction<UserCancelTakeMoneyFieldMutation, UserCancelTakeMoneyFieldMutationVariables>;

/**
 * __useUserCancelTakeMoneyFieldMutation__
 *
 * To run a mutation, you first call `useUserCancelTakeMoneyFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserCancelTakeMoneyFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userCancelTakeMoneyFieldMutation, { data, loading, error }] = useUserCancelTakeMoneyFieldMutation({
 *   variables: {
 *      takeMoneyFieldId: // value for 'takeMoneyFieldId'
 *   },
 * });
 */
export function useUserCancelTakeMoneyFieldMutation(baseOptions?: Apollo.MutationHookOptions<UserCancelTakeMoneyFieldMutation, UserCancelTakeMoneyFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserCancelTakeMoneyFieldMutation, UserCancelTakeMoneyFieldMutationVariables>(UserCancelTakeMoneyFieldDocument, options);
      }
export type UserCancelTakeMoneyFieldMutationHookResult = ReturnType<typeof useUserCancelTakeMoneyFieldMutation>;
export type UserCancelTakeMoneyFieldMutationResult = Apollo.MutationResult<UserCancelTakeMoneyFieldMutation>;
export type UserCancelTakeMoneyFieldMutationOptions = Apollo.BaseMutationOptions<UserCancelTakeMoneyFieldMutation, UserCancelTakeMoneyFieldMutationVariables>;
export const AdminGetKindBrandClassDocument = gql`
    query AdminGetKindBrandClass {
  adminGetKindBrandClass {
    code
    success
    message
    kinds {
      id
      name
    }
    classes {
      id
      name
      kind {
        id
      }
    }
    brands {
      id
      brandName
      kind {
        id
      }
    }
  }
}
    `;

/**
 * __useAdminGetKindBrandClassQuery__
 *
 * To run a query within a React component, call `useAdminGetKindBrandClassQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetKindBrandClassQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetKindBrandClassQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminGetKindBrandClassQuery(baseOptions?: Apollo.QueryHookOptions<AdminGetKindBrandClassQuery, AdminGetKindBrandClassQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetKindBrandClassQuery, AdminGetKindBrandClassQueryVariables>(AdminGetKindBrandClassDocument, options);
      }
export function useAdminGetKindBrandClassLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetKindBrandClassQuery, AdminGetKindBrandClassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetKindBrandClassQuery, AdminGetKindBrandClassQueryVariables>(AdminGetKindBrandClassDocument, options);
        }
export type AdminGetKindBrandClassQueryHookResult = ReturnType<typeof useAdminGetKindBrandClassQuery>;
export type AdminGetKindBrandClassLazyQueryHookResult = ReturnType<typeof useAdminGetKindBrandClassLazyQuery>;
export type AdminGetKindBrandClassQueryResult = Apollo.QueryResult<AdminGetKindBrandClassQuery, AdminGetKindBrandClassQueryVariables>;
export const GetUserMoneyHistoryDocument = gql`
    query GetUserMoneyHistory {
  getUserMoneyHistory {
    code
    success
    message
    moneyBonuses {
      moneyNumber
      description
      type
      createdAt
    }
    takeMoneyFields {
      id
      accoutName
      accountNumber
      accountBankName
      cancelReason
      money
      isSuccess
      createdAt
    }
  }
}
    `;

/**
 * __useGetUserMoneyHistoryQuery__
 *
 * To run a query within a React component, call `useGetUserMoneyHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserMoneyHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserMoneyHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserMoneyHistoryQuery(baseOptions?: Apollo.QueryHookOptions<GetUserMoneyHistoryQuery, GetUserMoneyHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserMoneyHistoryQuery, GetUserMoneyHistoryQueryVariables>(GetUserMoneyHistoryDocument, options);
      }
export function useGetUserMoneyHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserMoneyHistoryQuery, GetUserMoneyHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserMoneyHistoryQuery, GetUserMoneyHistoryQueryVariables>(GetUserMoneyHistoryDocument, options);
        }
export type GetUserMoneyHistoryQueryHookResult = ReturnType<typeof useGetUserMoneyHistoryQuery>;
export type GetUserMoneyHistoryLazyQueryHookResult = ReturnType<typeof useGetUserMoneyHistoryLazyQuery>;
export type GetUserMoneyHistoryQueryResult = Apollo.QueryResult<GetUserMoneyHistoryQuery, GetUserMoneyHistoryQueryVariables>;
export const AdminDashboardDocument = gql`
    query AdminDashboard {
  dashboard {
    code
    success
    takeMoneyField
    cancel
    confirmWaiting
    confirmed
    packed
    delivering
    commentNoFeedback
  }
}
    `;

/**
 * __useAdminDashboardQuery__
 *
 * To run a query within a React component, call `useAdminDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminDashboardQuery(baseOptions?: Apollo.QueryHookOptions<AdminDashboardQuery, AdminDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminDashboardQuery, AdminDashboardQueryVariables>(AdminDashboardDocument, options);
      }
export function useAdminDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminDashboardQuery, AdminDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminDashboardQuery, AdminDashboardQueryVariables>(AdminDashboardDocument, options);
        }
export type AdminDashboardQueryHookResult = ReturnType<typeof useAdminDashboardQuery>;
export type AdminDashboardLazyQueryHookResult = ReturnType<typeof useAdminDashboardLazyQuery>;
export type AdminDashboardQueryResult = Apollo.QueryResult<AdminDashboardQuery, AdminDashboardQueryVariables>;
export const AdminGetBillsDocument = gql`
    query AdminGetBills($type: String!) {
  adminGetBills(type: $type) {
    code
    success
    message
    bills {
      id
      notice
      deliveryPrice
      totalPrice
      introducePrice
      billStatus
      paymentDown
      paymentType
      billProducts {
        productName
        productAmount
        productPrice
        productType
      }
      customer {
        customerName
        customerPhone
        city
        province
        address
        id
      }
    }
  }
}
    `;

/**
 * __useAdminGetBillsQuery__
 *
 * To run a query within a React component, call `useAdminGetBillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetBillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetBillsQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useAdminGetBillsQuery(baseOptions: Apollo.QueryHookOptions<AdminGetBillsQuery, AdminGetBillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetBillsQuery, AdminGetBillsQueryVariables>(AdminGetBillsDocument, options);
      }
export function useAdminGetBillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetBillsQuery, AdminGetBillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetBillsQuery, AdminGetBillsQueryVariables>(AdminGetBillsDocument, options);
        }
export type AdminGetBillsQueryHookResult = ReturnType<typeof useAdminGetBillsQuery>;
export type AdminGetBillsLazyQueryHookResult = ReturnType<typeof useAdminGetBillsLazyQuery>;
export type AdminGetBillsQueryResult = Apollo.QueryResult<AdminGetBillsQuery, AdminGetBillsQueryVariables>;
export const AdminGetCommentsNoFeedbackDocument = gql`
    query AdminGetCommentsNoFeedback {
  adminGetCommentsNoFeedback {
    code
    success
    message
    comments {
      id
      content
      user {
        userAvatar
        userName
      }
      product {
        productName
        priceToDisplay
      }
    }
  }
}
    `;

/**
 * __useAdminGetCommentsNoFeedbackQuery__
 *
 * To run a query within a React component, call `useAdminGetCommentsNoFeedbackQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetCommentsNoFeedbackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetCommentsNoFeedbackQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminGetCommentsNoFeedbackQuery(baseOptions?: Apollo.QueryHookOptions<AdminGetCommentsNoFeedbackQuery, AdminGetCommentsNoFeedbackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetCommentsNoFeedbackQuery, AdminGetCommentsNoFeedbackQueryVariables>(AdminGetCommentsNoFeedbackDocument, options);
      }
export function useAdminGetCommentsNoFeedbackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetCommentsNoFeedbackQuery, AdminGetCommentsNoFeedbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetCommentsNoFeedbackQuery, AdminGetCommentsNoFeedbackQueryVariables>(AdminGetCommentsNoFeedbackDocument, options);
        }
export type AdminGetCommentsNoFeedbackQueryHookResult = ReturnType<typeof useAdminGetCommentsNoFeedbackQuery>;
export type AdminGetCommentsNoFeedbackLazyQueryHookResult = ReturnType<typeof useAdminGetCommentsNoFeedbackLazyQuery>;
export type AdminGetCommentsNoFeedbackQueryResult = Apollo.QueryResult<AdminGetCommentsNoFeedbackQuery, AdminGetCommentsNoFeedbackQueryVariables>;
export const AdminGetProductKindsDocument = gql`
    query AdminGetProductKinds {
  adminGetProductKinds {
    code
    success
    message
    kinds {
      id
      name
    }
    classes {
      id
      name
    }
  }
}
    `;

/**
 * __useAdminGetProductKindsQuery__
 *
 * To run a query within a React component, call `useAdminGetProductKindsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetProductKindsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetProductKindsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminGetProductKindsQuery(baseOptions?: Apollo.QueryHookOptions<AdminGetProductKindsQuery, AdminGetProductKindsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetProductKindsQuery, AdminGetProductKindsQueryVariables>(AdminGetProductKindsDocument, options);
      }
export function useAdminGetProductKindsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetProductKindsQuery, AdminGetProductKindsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetProductKindsQuery, AdminGetProductKindsQueryVariables>(AdminGetProductKindsDocument, options);
        }
export type AdminGetProductKindsQueryHookResult = ReturnType<typeof useAdminGetProductKindsQuery>;
export type AdminGetProductKindsLazyQueryHookResult = ReturnType<typeof useAdminGetProductKindsLazyQuery>;
export type AdminGetProductKindsQueryResult = Apollo.QueryResult<AdminGetProductKindsQuery, AdminGetProductKindsQueryVariables>;
export const AdminGetTakeMoneyFieldsDocument = gql`
    query AdminGetTakeMoneyFields {
  adminGetTakeMoneyFields {
    code
    success
    message
    fields {
      id
      accoutName
      accountNumber
      accountBankName
      money
      user {
        moneyCount
        id
      }
    }
  }
}
    `;

/**
 * __useAdminGetTakeMoneyFieldsQuery__
 *
 * To run a query within a React component, call `useAdminGetTakeMoneyFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetTakeMoneyFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetTakeMoneyFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminGetTakeMoneyFieldsQuery(baseOptions?: Apollo.QueryHookOptions<AdminGetTakeMoneyFieldsQuery, AdminGetTakeMoneyFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetTakeMoneyFieldsQuery, AdminGetTakeMoneyFieldsQueryVariables>(AdminGetTakeMoneyFieldsDocument, options);
      }
export function useAdminGetTakeMoneyFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetTakeMoneyFieldsQuery, AdminGetTakeMoneyFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetTakeMoneyFieldsQuery, AdminGetTakeMoneyFieldsQueryVariables>(AdminGetTakeMoneyFieldsDocument, options);
        }
export type AdminGetTakeMoneyFieldsQueryHookResult = ReturnType<typeof useAdminGetTakeMoneyFieldsQuery>;
export type AdminGetTakeMoneyFieldsLazyQueryHookResult = ReturnType<typeof useAdminGetTakeMoneyFieldsLazyQuery>;
export type AdminGetTakeMoneyFieldsQueryResult = Apollo.QueryResult<AdminGetTakeMoneyFieldsQuery, AdminGetTakeMoneyFieldsQueryVariables>;
export const CheckIntroduceCodeDocument = gql`
    query CheckIntroduceCode($introduceCode: Float!, $totalPrice: Float!) {
  checkIntroduceCode(introduceCode: $introduceCode, totalPrice: $totalPrice) {
    code
    success
    message
    introducePrice
  }
}
    `;

/**
 * __useCheckIntroduceCodeQuery__
 *
 * To run a query within a React component, call `useCheckIntroduceCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIntroduceCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIntroduceCodeQuery({
 *   variables: {
 *      introduceCode: // value for 'introduceCode'
 *      totalPrice: // value for 'totalPrice'
 *   },
 * });
 */
export function useCheckIntroduceCodeQuery(baseOptions: Apollo.QueryHookOptions<CheckIntroduceCodeQuery, CheckIntroduceCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIntroduceCodeQuery, CheckIntroduceCodeQueryVariables>(CheckIntroduceCodeDocument, options);
      }
export function useCheckIntroduceCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIntroduceCodeQuery, CheckIntroduceCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIntroduceCodeQuery, CheckIntroduceCodeQueryVariables>(CheckIntroduceCodeDocument, options);
        }
export type CheckIntroduceCodeQueryHookResult = ReturnType<typeof useCheckIntroduceCodeQuery>;
export type CheckIntroduceCodeLazyQueryHookResult = ReturnType<typeof useCheckIntroduceCodeLazyQuery>;
export type CheckIntroduceCodeQueryResult = Apollo.QueryResult<CheckIntroduceCodeQuery, CheckIntroduceCodeQueryVariables>;
export const GetBrandWithProductsDocument = gql`
    query GetBrandWithProducts($paginationOptions: PaginationOptionsInput!) {
  getBrandWithProducts(paginationOptions: $paginationOptions) {
    code
    success
    message
    pageSize
    totalCount
    brandWithProducts {
      id
      brandName
      thumbnail
      description
      kind {
        id
        name
      }
      productClasses {
        id
        name
      }
      products {
        id
        productName
        priceToDisplay
        commentCount
        averageRating
        sales
        thumbnail
        class {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetBrandWithProductsQuery__
 *
 * To run a query within a React component, call `useGetBrandWithProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandWithProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandWithProductsQuery({
 *   variables: {
 *      paginationOptions: // value for 'paginationOptions'
 *   },
 * });
 */
export function useGetBrandWithProductsQuery(baseOptions: Apollo.QueryHookOptions<GetBrandWithProductsQuery, GetBrandWithProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandWithProductsQuery, GetBrandWithProductsQueryVariables>(GetBrandWithProductsDocument, options);
      }
export function useGetBrandWithProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandWithProductsQuery, GetBrandWithProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandWithProductsQuery, GetBrandWithProductsQueryVariables>(GetBrandWithProductsDocument, options);
        }
export type GetBrandWithProductsQueryHookResult = ReturnType<typeof useGetBrandWithProductsQuery>;
export type GetBrandWithProductsLazyQueryHookResult = ReturnType<typeof useGetBrandWithProductsLazyQuery>;
export type GetBrandWithProductsQueryResult = Apollo.QueryResult<GetBrandWithProductsQuery, GetBrandWithProductsQueryVariables>;
export const GetBrandsDocument = gql`
    query GetBrands($kindId: Float!) {
  getBrands(kindId: $kindId) {
    code
    success
    message
    brands {
      id
      brandName
      thumbnail
    }
  }
}
    `;

/**
 * __useGetBrandsQuery__
 *
 * To run a query within a React component, call `useGetBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandsQuery({
 *   variables: {
 *      kindId: // value for 'kindId'
 *   },
 * });
 */
export function useGetBrandsQuery(baseOptions: Apollo.QueryHookOptions<GetBrandsQuery, GetBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandsQuery, GetBrandsQueryVariables>(GetBrandsDocument, options);
      }
export function useGetBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandsQuery, GetBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandsQuery, GetBrandsQueryVariables>(GetBrandsDocument, options);
        }
export type GetBrandsQueryHookResult = ReturnType<typeof useGetBrandsQuery>;
export type GetBrandsLazyQueryHookResult = ReturnType<typeof useGetBrandsLazyQuery>;
export type GetBrandsQueryResult = Apollo.QueryResult<GetBrandsQuery, GetBrandsQueryVariables>;
export const GetCartProductDocument = gql`
    query GetCartProduct($localBillProducts: [BillProductInput!]!) {
  getCartProduct(localBillProducts: $localBillProducts) {
    code
    success
    message
    products {
      productName
      productType
      productPrice
      productAmount
      productThumbnail
      priceIdForLocal
    }
  }
}
    `;

/**
 * __useGetCartProductQuery__
 *
 * To run a query within a React component, call `useGetCartProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartProductQuery({
 *   variables: {
 *      localBillProducts: // value for 'localBillProducts'
 *   },
 * });
 */
export function useGetCartProductQuery(baseOptions: Apollo.QueryHookOptions<GetCartProductQuery, GetCartProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCartProductQuery, GetCartProductQueryVariables>(GetCartProductDocument, options);
      }
export function useGetCartProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCartProductQuery, GetCartProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCartProductQuery, GetCartProductQueryVariables>(GetCartProductDocument, options);
        }
export type GetCartProductQueryHookResult = ReturnType<typeof useGetCartProductQuery>;
export type GetCartProductLazyQueryHookResult = ReturnType<typeof useGetCartProductLazyQuery>;
export type GetCartProductQueryResult = Apollo.QueryResult<GetCartProductQuery, GetCartProductQueryVariables>;
export const GetCommentsDocument = gql`
    query getComments($skip: Float!, $productId: Float!) {
  getComments(skip: $skip, productId: $productId) {
    code
    success
    message
    totalCount
    cursor
    hasMore
    comments {
      user {
        userName
        userAvatar
      }
      content
      rating
      imagesComment
      createdAt
      feedbacks {
        admin {
          adminName
          avatar
        }
        content
        createdAt
      }
    }
  }
}
    `;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
      }
export function useGetCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const GetEventDocument = gql`
    query GetEvent($title: String!) {
  getEvent(title: $title) {
    code
    success
    message
    myEvent {
      title
      thumbnail
      content
      instructionImages
      createdAt
    }
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const GetEventsDocument = gql`
    query getEvents {
  getEvents {
    code
    success
    message
    myEvents {
      title
      content
      summary
      thumbnail
    }
  }
}
    `;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetGiftDocument = gql`
    query GetGift($priceCondition: Float!) {
  getGift(priceCondition: $priceCondition) {
    code
    success
    message
    gifts {
      price
      type
      status
      isGift
      product {
        thumbnail
        productName
        priceToDisplay
        sales
      }
    }
  }
}
    `;

/**
 * __useGetGiftQuery__
 *
 * To run a query within a React component, call `useGetGiftQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGiftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGiftQuery({
 *   variables: {
 *      priceCondition: // value for 'priceCondition'
 *   },
 * });
 */
export function useGetGiftQuery(baseOptions: Apollo.QueryHookOptions<GetGiftQuery, GetGiftQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGiftQuery, GetGiftQueryVariables>(GetGiftDocument, options);
      }
export function useGetGiftLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGiftQuery, GetGiftQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGiftQuery, GetGiftQueryVariables>(GetGiftDocument, options);
        }
export type GetGiftQueryHookResult = ReturnType<typeof useGetGiftQuery>;
export type GetGiftLazyQueryHookResult = ReturnType<typeof useGetGiftLazyQuery>;
export type GetGiftQueryResult = Apollo.QueryResult<GetGiftQuery, GetGiftQueryVariables>;
export const GetGiftsDocument = gql`
    query GetGifts($priceCondition: Float!) {
  getGifts(priceCondition: $priceCondition) {
    code
    success
    message
    gifts {
      price
      type
      status
      isGift
      product {
        thumbnail
        productName
        priceToDisplay
        sales
      }
    }
  }
}
    `;

/**
 * __useGetGiftsQuery__
 *
 * To run a query within a React component, call `useGetGiftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGiftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGiftsQuery({
 *   variables: {
 *      priceCondition: // value for 'priceCondition'
 *   },
 * });
 */
export function useGetGiftsQuery(baseOptions: Apollo.QueryHookOptions<GetGiftsQuery, GetGiftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGiftsQuery, GetGiftsQueryVariables>(GetGiftsDocument, options);
      }
export function useGetGiftsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGiftsQuery, GetGiftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGiftsQuery, GetGiftsQueryVariables>(GetGiftsDocument, options);
        }
export type GetGiftsQueryHookResult = ReturnType<typeof useGetGiftsQuery>;
export type GetGiftsLazyQueryHookResult = ReturnType<typeof useGetGiftsLazyQuery>;
export type GetGiftsQueryResult = Apollo.QueryResult<GetGiftsQuery, GetGiftsQueryVariables>;
export const GetKindsAndBrandsDocument = gql`
    query GetKindsAndBrands {
  getKindsAndBrands {
    code
    success
    kinds {
      id
      name
    }
    brands {
      id
      brandName
    }
  }
}
    `;

/**
 * __useGetKindsAndBrandsQuery__
 *
 * To run a query within a React component, call `useGetKindsAndBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKindsAndBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKindsAndBrandsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetKindsAndBrandsQuery(baseOptions?: Apollo.QueryHookOptions<GetKindsAndBrandsQuery, GetKindsAndBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetKindsAndBrandsQuery, GetKindsAndBrandsQueryVariables>(GetKindsAndBrandsDocument, options);
      }
export function useGetKindsAndBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetKindsAndBrandsQuery, GetKindsAndBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetKindsAndBrandsQuery, GetKindsAndBrandsQueryVariables>(GetKindsAndBrandsDocument, options);
        }
export type GetKindsAndBrandsQueryHookResult = ReturnType<typeof useGetKindsAndBrandsQuery>;
export type GetKindsAndBrandsLazyQueryHookResult = ReturnType<typeof useGetKindsAndBrandsLazyQuery>;
export type GetKindsAndBrandsQueryResult = Apollo.QueryResult<GetKindsAndBrandsQuery, GetKindsAndBrandsQueryVariables>;
export const GetPaginationUsersDocument = gql`
    query GetPaginationUsers($skip: Float!) {
  getPaginationUsers(skip: $skip) {
    code
    success
    message
    totalCount
    hasMore
    cursor
    users {
      userName
      userAvatar
    }
  }
}
    `;

/**
 * __useGetPaginationUsersQuery__
 *
 * To run a query within a React component, call `useGetPaginationUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaginationUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaginationUsersQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetPaginationUsersQuery(baseOptions: Apollo.QueryHookOptions<GetPaginationUsersQuery, GetPaginationUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaginationUsersQuery, GetPaginationUsersQueryVariables>(GetPaginationUsersDocument, options);
      }
export function useGetPaginationUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaginationUsersQuery, GetPaginationUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaginationUsersQuery, GetPaginationUsersQueryVariables>(GetPaginationUsersDocument, options);
        }
export type GetPaginationUsersQueryHookResult = ReturnType<typeof useGetPaginationUsersQuery>;
export type GetPaginationUsersLazyQueryHookResult = ReturnType<typeof useGetPaginationUsersLazyQuery>;
export type GetPaginationUsersQueryResult = Apollo.QueryResult<GetPaginationUsersQuery, GetPaginationUsersQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($productId: ID!) {
  getProduct(productId: $productId) {
    code
    message
    success
    product {
      id
      thumbnail
      productName
      imgDescription
      imageList
      description
      priceToDisplay
      kind {
        id
        name
      }
      prices {
        id
        type
        price
        status
      }
      brand {
        id
        brandName
      }
      comments {
        user {
          userName
          userAvatar
        }
        content
        rating
        imagesComment
        createdAt
        feedbacks {
          admin {
            adminName
            avatar
          }
          content
          createdAt
        }
      }
    }
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetProductsForIndexDocument = gql`
    query GetProductsForIndex($take: Float!) {
  getProductsForIndex(take: $take) {
    code
    success
    message
    kinds {
      id
      name
      products {
        id
        productName
        averageRating
        sales
        thumbnail
        priceToDisplay
        commentCount
        class {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetProductsForIndexQuery__
 *
 * To run a query within a React component, call `useGetProductsForIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsForIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsForIndexQuery({
 *   variables: {
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetProductsForIndexQuery(baseOptions: Apollo.QueryHookOptions<GetProductsForIndexQuery, GetProductsForIndexQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsForIndexQuery, GetProductsForIndexQueryVariables>(GetProductsForIndexDocument, options);
      }
export function useGetProductsForIndexLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsForIndexQuery, GetProductsForIndexQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsForIndexQuery, GetProductsForIndexQueryVariables>(GetProductsForIndexDocument, options);
        }
export type GetProductsForIndexQueryHookResult = ReturnType<typeof useGetProductsForIndexQuery>;
export type GetProductsForIndexLazyQueryHookResult = ReturnType<typeof useGetProductsForIndexLazyQuery>;
export type GetProductsForIndexQueryResult = Apollo.QueryResult<GetProductsForIndexQuery, GetProductsForIndexQueryVariables>;
export const GetProductPaidAmountDocument = gql`
    query GetProductPaidAmount {
  getProductPaidAmount
}
    `;

/**
 * __useGetProductPaidAmountQuery__
 *
 * To run a query within a React component, call `useGetProductPaidAmountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductPaidAmountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductPaidAmountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductPaidAmountQuery(baseOptions?: Apollo.QueryHookOptions<GetProductPaidAmountQuery, GetProductPaidAmountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductPaidAmountQuery, GetProductPaidAmountQueryVariables>(GetProductPaidAmountDocument, options);
      }
export function useGetProductPaidAmountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductPaidAmountQuery, GetProductPaidAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductPaidAmountQuery, GetProductPaidAmountQueryVariables>(GetProductPaidAmountDocument, options);
        }
export type GetProductPaidAmountQueryHookResult = ReturnType<typeof useGetProductPaidAmountQuery>;
export type GetProductPaidAmountLazyQueryHookResult = ReturnType<typeof useGetProductPaidAmountLazyQuery>;
export type GetProductPaidAmountQueryResult = Apollo.QueryResult<GetProductPaidAmountQuery, GetProductPaidAmountQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts($paginationOptions: PaginationOptionsInput!) {
  getProducts(paginationOptions: $paginationOptions) {
    code
    success
    message
    totalCount
    pageSize
    products {
      id
      productName
      averageRating
      sales
      thumbnail
      priceToDisplay
      imgDescription
      commentCount
      prices {
        id
        type
        price
        status
      }
    }
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      paginationOptions: // value for 'paginationOptions'
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductsByKindDocument = gql`
    query GetProductsByKind($paginationOptions: PaginationOptionsInput!) {
  getProductsByKind(paginationOptions: $paginationOptions) {
    code
    success
    message
    pageSize
    totalCount
    kindId
    productClasses {
      id
      name
    }
    products {
      id
      productName
      priceToDisplay
      commentCount
      averageRating
      sales
      thumbnail
      prices {
        id
        type
        price
        status
      }
      class {
        name
      }
    }
  }
}
    `;

/**
 * __useGetProductsByKindQuery__
 *
 * To run a query within a React component, call `useGetProductsByKindQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsByKindQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsByKindQuery({
 *   variables: {
 *      paginationOptions: // value for 'paginationOptions'
 *   },
 * });
 */
export function useGetProductsByKindQuery(baseOptions: Apollo.QueryHookOptions<GetProductsByKindQuery, GetProductsByKindQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsByKindQuery, GetProductsByKindQueryVariables>(GetProductsByKindDocument, options);
      }
export function useGetProductsByKindLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsByKindQuery, GetProductsByKindQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsByKindQuery, GetProductsByKindQueryVariables>(GetProductsByKindDocument, options);
        }
export type GetProductsByKindQueryHookResult = ReturnType<typeof useGetProductsByKindQuery>;
export type GetProductsByKindLazyQueryHookResult = ReturnType<typeof useGetProductsByKindLazyQuery>;
export type GetProductsByKindQueryResult = Apollo.QueryResult<GetProductsByKindQuery, GetProductsByKindQueryVariables>;
export const GetProductsBySearchInputDocument = gql`
    query GetProductsBySearchInput($value: String!) {
  getProductsBySearchInput(value: $value) {
    code
    success
    message
    products {
      id
      productName
      thumbnail
      minPrice
      maxPrice
    }
  }
}
    `;

/**
 * __useGetProductsBySearchInputQuery__
 *
 * To run a query within a React component, call `useGetProductsBySearchInputQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsBySearchInputQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsBySearchInputQuery({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useGetProductsBySearchInputQuery(baseOptions: Apollo.QueryHookOptions<GetProductsBySearchInputQuery, GetProductsBySearchInputQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsBySearchInputQuery, GetProductsBySearchInputQueryVariables>(GetProductsBySearchInputDocument, options);
      }
export function useGetProductsBySearchInputLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsBySearchInputQuery, GetProductsBySearchInputQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsBySearchInputQuery, GetProductsBySearchInputQueryVariables>(GetProductsBySearchInputDocument, options);
        }
export type GetProductsBySearchInputQueryHookResult = ReturnType<typeof useGetProductsBySearchInputQuery>;
export type GetProductsBySearchInputLazyQueryHookResult = ReturnType<typeof useGetProductsBySearchInputLazyQuery>;
export type GetProductsBySearchInputQueryResult = Apollo.QueryResult<GetProductsBySearchInputQuery, GetProductsBySearchInputQueryVariables>;
export const GetUserDocument = gql`
    query getUser {
  getUser {
    code
    success
    message
    user {
      userName
      userAvatar
      confirmWaitingCount
      packedCount
      moneyCount
      deliveringCount
      introduceCode
      bills {
        id
        billStatus
        createdAt
        paymentType
        paymentDown
        totalPrice
        commentPrice
        introducePrice
        isCommented
        billProducts {
          productThumbnail
          productName
          productAmount
          productType
          productPrice
        }
        customer {
          customerName
          customerPhone
          address
          city
          province
        }
      }
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetWebDataDocument = gql`
    query GetWebData($localBillProducts: [BillProductInput!]!) {
  getWebData(localBillProducts: $localBillProducts) {
    code
    success
    message
    products {
      productName
      productType
      productPrice
      productAmount
      productThumbnail
      priceIdForLocal
    }
    kinds {
      id
      name
    }
    brands {
      id
      brandName
    }
  }
}
    `;

/**
 * __useGetWebDataQuery__
 *
 * To run a query within a React component, call `useGetWebDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWebDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWebDataQuery({
 *   variables: {
 *      localBillProducts: // value for 'localBillProducts'
 *   },
 * });
 */
export function useGetWebDataQuery(baseOptions: Apollo.QueryHookOptions<GetWebDataQuery, GetWebDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWebDataQuery, GetWebDataQueryVariables>(GetWebDataDocument, options);
      }
export function useGetWebDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWebDataQuery, GetWebDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWebDataQuery, GetWebDataQueryVariables>(GetWebDataDocument, options);
        }
export type GetWebDataQueryHookResult = ReturnType<typeof useGetWebDataQuery>;
export type GetWebDataLazyQueryHookResult = ReturnType<typeof useGetWebDataLazyQuery>;
export type GetWebDataQueryResult = Apollo.QueryResult<GetWebDataQuery, GetWebDataQueryVariables>;