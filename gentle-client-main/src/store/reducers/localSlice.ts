import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BillProductInput } from "../../generated/graphql";
import {
  EditProductPriceProps,
  LocalProps,
  PaymentProps,
  ProductBrandProps,
  ProductInCommentProps,
  ProductKindProps,
  WriteCommentProps
} from "../../utils/type/redux/reduxType";
import { RootState } from "../index";



const initialState: LocalProps = {
 
  writeCommentProps: null,
  productInCommentProps: null,
  paymentProps: null,
  editProductPriceProps:null,
  countProps:0,
  kinds:[],
  brands:[],
  billProductsFromLocal:[]
  // Kind and Brand

};


const localSlice = createSlice({
  name: "local",
  initialState,
  reducers: {
    setCountProps(state, action: PayloadAction<number>) {
        state.countProps = action.payload;
      },
    setWriteCommentProps(
      state,
      action: PayloadAction<WriteCommentProps | null>
    ) {
      state.writeCommentProps = action.payload;
    },
    setProductInCommentProps(
      state,
      action: PayloadAction<ProductInCommentProps | null>
    ) {
      state.productInCommentProps = action.payload;
    },
    setPaymentProps(state, action: PayloadAction<PaymentProps | null>) {
      state.paymentProps = action.payload;
    },
    setEditProductPriceProps(state, action: PayloadAction<EditProductPriceProps | null>) {
      state.editProductPriceProps = action.payload;
    },
    // kind and brand
    setProductKindsProps(state, action: PayloadAction<ProductKindProps[]>) {
      state.kinds = action.payload;
    },
    setProductBrandsProps(state, action: PayloadAction<ProductBrandProps[]>) {
      state.brands = action.payload;
    },
    setBillProductsFromLocal(state,action : PayloadAction<BillProductInput[]>){
      state.billProductsFromLocal = action.payload
  
    }
  },
  extraReducers: (builder) => {
    
  },
});

const localReducer = localSlice.reducer;
export const localSelector = (state: RootState) => state.local;
export const {
  setPaymentProps,
  setProductInCommentProps,
  setWriteCommentProps,
  setEditProductPriceProps,
  setCountProps,
  setProductKindsProps,
  setProductBrandsProps,
  setBillProductsFromLocal
} = localSlice.actions;
export default localReducer;
