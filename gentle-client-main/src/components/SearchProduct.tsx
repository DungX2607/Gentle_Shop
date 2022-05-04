import { Divider, useMediaQuery, useOutsideClick, useToast } from "@chakra-ui/react";
import { faHourglass1, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "../assets/css/components/searchProduct.module.css";
import { useGetProductsBySearchInputLazyQuery } from "../generated/graphql";
import { MoneyConverter } from "../utils/other/ConvertToMoney";
import useDebounced from "../utils/hook/useDebounced";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchProduct = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isOpenResultInput, setIsOpenResultInput] = useState(false);
  const [displayResult, setDisplayResult] = useState<ReactNode>(null);
  let conditionText = useDebounced(value, 350);

  const [getProducts, { data, loading, error }] =
    useGetProductsBySearchInputLazyQuery();

  //ref
  const searchResultRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   console.log(navbarHeight);
  //   if (navbarHeight)
  //     searchProductRef.current!.style.marginTop = `${navbarHeight}px`;
  // }, [navbarHeight]);
  //close result whenever oustside clicked
  useOutsideClick({
    ref: searchResultRef,
    handler: () => setIsOpenResultInput(false),
  });

  //query to server
  useEffect(() => {
    if (conditionText.length >= 2) {
      setIsOpenResultInput(true);
      getProducts({
        variables: {
          value: conditionText,
        },
      });
    } else setIsOpenResultInput(false);
  }, [conditionText]);
  //check data from server
  useEffect(() => {
    if (data?.getProductsBySearchInput.message) {
      setDisplayResult(<h2>{data.getProductsBySearchInput.message}</h2>);
    } else {
      setDisplayResult(
        <div className={styles.searchProductList}>
          {data?.getProductsBySearchInput.success &&
            data.getProductsBySearchInput.products?.map((product) => (
              <div
                className={styles.searchProductItem}
                key={product.id}
                onClick={() => {
                  setIsOpenResultInput(false);
                  router.push({
                    pathname: `/product/${product.id}`,
                    query: { productId: product.id },
                  });
                }}
              >
                <img src={product.thumbnail} alt="" />
                <div className={styles.searchProductInfo}>
                  <h3>{product.productName}</h3>
                  <h4>
                    {MoneyConverter(product.minPrice)} -{" "}
                    {MoneyConverter(product.maxPrice)}
                  </h4>
                </div>
              </div>
            ))}
        </div>
      );
    }
  }, [data]);

  const toast = useToast()

  return (
    <div className={styles.searchBg}>
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12 ">
            <div className={styles.searchContainer}>
              <div className="row">
                <div className="col l-2 m-2 c-0">
                  <div className={styles.searchTypeContainer} onClick={() =>{
                    toast({
                      status:"info",
                      title:"Kính chào quý khách",
                      description:"Tính năng đang trong quá trình hoàn thành, mong quý khách thông cảm.",
                      isClosable:true,
                      position:"top-right",
                      duration:1000
                    })
                  }}>
                    <p>sản phẩm</p>
                    <TriangleDownIcon className={styles.triangleDownIcon} />
                  </div>
                </div>
              
              <div className="l-9 m-9 c-9">
                <div className={styles.searchInputContainer}>
                  <input
                    placeholder="TÊN SẢN PHẨM..."
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    // onBlur={() => setIsOpenResultInput(false)}
                  />
                  {isOpenResultInput && (
                    <div
                      className={styles.searchResultContainer}
                      ref={searchResultRef}
                    >
                      {loading ? <h1>Loading</h1> : displayResult}
                    </div>
                  )}
                </div>
              </div>
              <div className="col l-1 m-1 c-3">
                <div className={styles.btnSearch} onClick={() =>{
                    toast({
                      status:"info",
                      title:"Kính chào quý khách",
                      description:"Tính năng đang trong quá trình hoàn thành, mong quý khách thông cảm.",
                      isClosable:true,
                      position:"top-right",
                      duration:1000
                    })
                  }}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
