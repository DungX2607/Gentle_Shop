import { ChevronDownIcon } from "@chakra-ui/icons";
import { Select, useMediaQuery } from "@chakra-ui/react";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import styles from "../../assets/css/components/products.module.css";
import Brand from "../../components/Brand";
import Footer from "../../components/Footer";
import MySpinner from "../../components/MySpinner";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import {
  GetProductsByKindDocument,
  GetProductsByKindQuery,
  PaginationOptionsInput,
  PaginationProductsResponse,
} from "../../generated/graphql";
import { client } from "../../utils/lib/ApolloClient";
import { MoneyConverter } from "../../utils/other/ConvertToMoney";
import { FilterRadioProps } from "../../utils/type/customType";

const radioTypeList: FilterRadioProps[] = [
  {
    value: "SALES_DESC",
    name: "Bán chạy",
  },
  {
    value: "PRICE_DESC",
    name: "Giá giảm",
  },
  {
    value: "PRICE_ASC",
    name: "Giá tăng",
  },
  {
    value: "DATE_DESC",
    name: "Sản phẩm mới",
  },
];
interface Props {
  data: PaginationProductsResponse;
}
const KindId: NextPage<Props> = ({ data }) => {
  const [mySpinner,setMySpinner] = useState(true)
  const [filterChecked, setFilterChecked] = useState("SALES_DESC");
  const [productClassIdChecked, setProductClassIdChecked] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile] = useMediaQuery("(max-width: 739px)");
  const router = useRouter();
  const [products, setProducts] = useState<PaginationProductsResponse>(data);
  useEffect(() => {
    if(!data){
      router.push("/404")
     
    }
    else{
      setProducts(data);
      setMySpinner(false)
    }
  }, [data]);
  useEffect(() => {
    if (Object.keys(router.query).length === 0) setCurrentPage(1);
    if (products.pageSize && router.query.skip) {
      const current = +router.query.skip / products.pageSize + 1;

      setCurrentPage(current);
    }
    // Set state for client
    if(router.query.type){

      setFilterChecked(router.query.type as string)
    }
    if(router.query.productClassId){
      setProductClassIdChecked(+router.query.productClassId)
    }
    
  }, [router.query]);


  const handlePageChange = (page: number) => {
    const skip = data.pageSize! * (page - 1);

    setCurrentPage(page);

    router.push(
      {
        pathname: `/kind/${router.query.kindId}`,
        query: {
          skip,
          type: filterChecked,
          kindId: router.query.kindId,
          productClassId: router.query.productClassId,
        },
      },
      undefined,
      { scroll: false }
    );
  };

  const handleFilterChange = (value: string) => {
    setFilterChecked(value);
    setCurrentPage(1);
    router.push(
      {
        pathname: `/kind/${router.query.kindId}`,
        query: {
          skip: 0,
          type: value,
          kindId: router.query.kindId,
          productClassId: router.query.productClassId,
        },
      },
      undefined,
      { scroll: false }
    );
  };

  const handleProductClassChange = (id: number) => {
    setProductClassIdChecked(id);
    setCurrentPage(1);
    router.push(
      {
        pathname: `/kind/${router.query.kindId}`,
        query: {
          skip: 0,
          type: router.query.type,
          kindId: router.query.kindId,
          productClassId: id,
        },
      },
      undefined,
      { scroll: false }
    );
  };

  const handleToProductDetail = (id: number) => {
    const skip = data.pageSize! * (currentPage - 1);
    router.push({
      pathname: `/product/${id}`,
      query: { productId: id, skip, type: filterChecked },
    });
  };
  return (
    <div>
      <Navbar />
      <div className="distance">
        <Brand kindId={+router.query.kindId!} />

        <div className="grid wide">
          <div className="row">
            <div className={clsx("col l-12 m-12 c-12")}>
              <div className={styles.productContainer}>
                <div className={styles.productHeader}>
                  {isMobile ? (
                    <select
                      className="select_custom"
                      onChange={(event) =>
                        handleFilterChange(event.target.value)
                      }
                    >
                      {radioTypeList.map((item) => (
                        <option value={item.value} key={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.filterWrapper}>
                      {radioTypeList.map((item) => (
                        <div
                          className={styles.filterContainer}
                          key={item.value}
                        >
                          <label>
                            <input
                              onChange={() => handleFilterChange(item.value)}
                              type="radio"
                              checked={filterChecked === item.value}
                              className={styles.inputFilter}
                            />
                            <div className={styles.inputCustom}></div>
                            {item.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  <select
                    value={productClassIdChecked}
                    className="select_custom"
                    onChange={(e) => handleProductClassChange(+e.target.value)}
                  >
                    <option value={0}>Tất cả</option>
                    {data.productClasses?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <div className={styles.productList}>
                <div className="row">
                  {data.products &&
                    products.products!.map((product) => (
                      <div
                        className="col l-2-4 m-4 c-6"
                        key={product.id}
                        onClick={() => handleToProductDetail(product.id)}
                      >
                        <div className={styles.productItem}>
                          <div className={styles.productType}>
                            <img src={product.thumbnail} />
                            <div>{product.class?.name}</div>
                          </div>
                          <div className={styles.productName}>
                            <h2>{product.productName}</h2>
                          </div>
                          {product.averageRating > 0 ? (
                            <div className={styles.productNameAndRating}>
                              <StarRatings
                                rating={product.averageRating}
                                starDimension="12px"
                                starSpacing="1px"
                                starRatedColor="black"
                              />
                              <h3>{MoneyConverter(product.priceToDisplay)}</h3>
                            </div>
                          ) : (
                            //No
                            <div className={styles.productNameAndRating}>
                              <div></div>
                              <h3>{MoneyConverter(product.priceToDisplay)}</h3>
                            </div>
                          )}

                          <div className={styles.paidInfo}>
                            <h4>Đã bán:{product.sales}</h4>
                            <h4>Bình luận:{product.commentCount}</h4>
                          </div>
                          {/* <div className={styles.paidController}>
                            <FontAwesomeIcon
                              className={styles.iconOnProduct}
                              icon={faCartPlus}
                            />

                            <div className={clsx("btn btn4", styles.btnPayNow)}>
                              Mua ngay
                            </div>
                          </div> */}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="l-12 m-12 c-12">
              <div className={styles.pagination}>
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={products.totalCount || 0}
                  pageSize={products.pageSize ||0}
                  onPageChange={(page: number) => handlePageChange(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {mySpinner && <MySpinner/>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const skip = query.skip || 0;
  const type = query.type || "SALES_DESC";
  const kindId = query.kindId;
  const productClassId = query.productClassId || 0;

  const paginationOptions: PaginationOptionsInput = {
    skip: +skip,
    type: type as string,
    kindId: +kindId!,
    productClassId: +productClassId,
  };

  const { data } = await client.query<GetProductsByKindQuery>({
    query: GetProductsByKindDocument,
    variables: {
      paginationOptions,
    },
  });

  return {
    props: {
      data: data.getProductsByKind,
    },
  };
};

export default KindId;
