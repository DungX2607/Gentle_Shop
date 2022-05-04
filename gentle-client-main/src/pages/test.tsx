import { useRouter } from "next/router";
import React from "react";
import LocalLoading from "../components/LocalLoading";
import { useGetProductsForIndexQuery } from "../generated/graphql";


const test = () => {
  const router = useRouter();
  const { data } = useGetProductsForIndexQuery({
    variables: {
      take: 5,
    },
  });
  

  return (
    <div>
      <LocalLoading/>
    </div>
  );
};

export default test;
