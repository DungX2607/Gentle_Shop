import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetKindsAndBrandsQuery, useGetWebDataLazyQuery, useGetWebDataQuery,
} from "../generated/graphql";

import {
  authSelector,
  checkAuthRedux,
  setIsAuthenticated,
} from "../store/reducers/authSlice";
import {
  setBillProductsFromLocal,
  setProductBrandsProps,
  setProductKindsProps,
} from "../store/reducers/localSlice";
import {
  ProductBrandProps,
  ProductKindProps,
} from "../utils/type/redux/reduxType";

import MySpinner from "./MySpinner";

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const { isLoading, type } = useSelector(authSelector);
  // const { data, loading, error } = useGetKindsAndBrandsQuery();
  const [getWebData,{data,loading,error}] = useGetWebDataLazyQuery()
  const dispatch = useDispatch();

  useEffect(() => {
    if (type !== "user" && type !== "admin") {
      dispatch(checkAuthRedux());
    }
    if (localStorage.getItem("localBillProducts")) {
      const localBillProducts = JSON.parse(
        localStorage.getItem("localBillProducts")!
      );
      if (Array.isArray(localBillProducts)) {
        getWebData({
          variables: {
            localBillProducts,
          },
        });
        
      } 
     
    }
  }, []);
  useEffect(() => {



    if (data?.getWebData.kinds && data.getWebData.brands && data.getWebData.products) {
      const kinds: ProductKindProps[] = data.getWebData.kinds.map(
        (item) => {
          const kindItem: ProductKindProps = {
            id: item.id,
            name: item.name,
          };
          return kindItem;
        }
      );
      const brands: ProductBrandProps[] = data.getWebData.brands.map(
        (item) => {
          const kindItem: ProductBrandProps = {
            id: item.id,
            name: item.brandName,
          };

          return kindItem;
        }
      );
      
      dispatch(setProductKindsProps(kinds));
      dispatch(setProductBrandsProps(brands));
      dispatch(setBillProductsFromLocal(data.getWebData.products))
    }
  }, [data, loading]);

  if (isLoading) return <MySpinner />;
  else return <>{children}</>;
};

export default CheckAuth;
