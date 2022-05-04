import { Badge, Button, useToast } from "@chakra-ui/react";
import {
  faCartPlus,
  faCircleCheck,
  faMinus,
  faPlus,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import styles from "../../assets/css/pages/productId.module.css";
import Footer from "../../components/Footer";
import ImageFullScreen from "../../components/ImageFullScreen";
import Navbar from "../../components/Navbar";
import {
  BillProductInput,
  GetProductDocument,
  GetProductQuery,
  Price,
  Product,
} from "../../generated/graphql";
import { authSelector } from "../../store/reducers/authSlice";
import {
  setBillProductsFromLocal,
  setCountProps,
  setEditProductPriceProps,
  setPaymentProps,
} from "../../store/reducers/localSlice";
import { client } from "../../utils/lib/ApolloClient";
import { MoneyConverter } from "../../utils/other/ConvertToMoney";
import { EditProductPriceProps } from "../../utils/type/redux/reduxType";
import { PriceFieldsProps } from "../admin/createProduct";
import { PaymentProps } from "../payment";

import clsx from "clsx";
import { ChevronRightIcon } from "@chakra-ui/icons";
import MySpinner from "../../components/MySpinner";

interface Props {
  product: Product;
}

const ProductId: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const [mySpinner,setMySpinner] = useState(true)
  const [test, setTest] = useState<Product>(product);
  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const { type } = useSelector(authSelector);
  const [isImageFullScreenOpen, setIsImageFullScreenOpen] = useState(false);
  const [indexOfImageList, setIndexOfImageList] = useState<number>(0);

  const dispatch = useDispatch();
  const toast = useToast();
  const [priceChecked, setPriceChecked] = useState<BillProductInput>({
    productName: "",
    productPrice: 0,
    productAmount: 0,
    productThumbnail: "",
    priceIdForLocal: 0,
    productType: "",
  });

  const convertToPriceFieldProps = (): PriceFieldsProps[] => {
    const field: PriceFieldsProps[] = product.prices.map((item) => {
      const fieldItem: PriceFieldsProps = {
        id: item.id.toString(),
        type: item.type,
        status: item.status,
        price: item.price,
      };
      return fieldItem;
    });
    return field;
  };

  useEffect(() => {
    if (product === null) {
      router.push("/404");
    }else{
      setMySpinner(false)
    }
  }, []);

  useEffect(() => {
    setTotalPrice(amount * priceChecked.productPrice);
  }, [amount, priceChecked]);

  const handleTypeChange = (price: Price) => {
    setPriceChecked({
      priceIdForLocal: price.id,
      productName: product.productName,
      productAmount: amount,
      productPrice: price.price,
      productThumbnail: product.thumbnail,
      productType: price.type,
    });
  };
  // handle

  const handlePayNow = () => {
    if (totalPrice === 0) {
      toast({
        title:"LỖI",
        description:"Bạn chưa chọn sản phẩm",
        status:"error",
        isClosable:true,
        position:"top",
        duration:700
      })
    } else {
      const type = product.prices.find(
        (item) => item.id === priceChecked.priceIdForLocal
      );

      const listTemp: BillProductInput[] = [
        {
          productName: product.productName,
          productThumbnail: product.thumbnail,
          productAmount: amount,
          productPrice: type!.price,
          productType: type!.type,
          priceIdForLocal: type?.id,
        },
      ];
      const props: PaymentProps = {
        listCart: listTemp,
        totalPrice,
      };
      dispatch(setPaymentProps(props));

      router.push("/payment");
    }
  };

  const handleAddToCart = () => {
    if (totalPrice !== 0) {
      if (typeof window !== undefined) {
        //list cartProduct
        const localBillProducts = localStorage.getItem("localBillProducts");
        //If list cartProduct is exsting
        if (localBillProducts) {
          //listcartInput
          let localBillProductsTemp: BillProductInput[] =
            JSON.parse(localBillProducts);
          //check if product is exsisting in list
          const indexOfItemExisting = localBillProductsTemp.findIndex(
            (item) => item.priceIdForLocal === priceChecked.priceIdForLocal
          );
          if (indexOfItemExisting !== -1) {
            localBillProductsTemp[indexOfItemExisting].productAmount += amount;
            localStorage.setItem(
              "localBillProducts",
              JSON.stringify(localBillProductsTemp)
            );

            //
            dispatch(setBillProductsFromLocal(localBillProductsTemp))
          } else {
            // let cartCount = localStorage.getItem("cartCount");
            // if (cartCount) {
            //   let convertToNumber: number = +cartCount;
            //   convertToNumber += 1;
            //   dispatch(setCountProps(convertToNumber));
            //   localStorage.setItem("cartCount", convertToNumber.toString());
            // }

            localBillProductsTemp.push({
              priceIdForLocal: priceChecked.priceIdForLocal,
              productAmount: amount,
              productName: priceChecked.productName,
              productThumbnail: priceChecked.productThumbnail,
              productPrice: priceChecked.productPrice,
              productType: priceChecked.productType,
            });
            localStorage.setItem(
              "localBillProducts",
              JSON.stringify(localBillProductsTemp)
            );
            dispatch(setBillProductsFromLocal(localBillProductsTemp))
          }
        } else {
          let localBillProductsTemp: BillProductInput[] = [];
          const item: BillProductInput = {
            priceIdForLocal: priceChecked.priceIdForLocal,
            productAmount: amount,
            productName: priceChecked.productName,
            productThumbnail: priceChecked.productThumbnail,
            productPrice: priceChecked.productPrice,
            productType: priceChecked.productType,
          };
          localBillProductsTemp.push(item);
          localStorage.setItem(
            "localBillProducts",
            JSON.stringify(localBillProductsTemp)
          );
          // localStorage.setItem("cartCount", "1");
          // dispatch(setCountProps(1));
          dispatch(setBillProductsFromLocal(localBillProductsTemp))
        }
        setPriceChecked({
          productName: "",
          productPrice: 0,
          productAmount: 0,
          productThumbnail: "",
          priceIdForLocal: 0,
          productType: "",
        });
        setAmount(1);
      }
      toast({
        title: "Thông báo",
        description: "Thêm vào giỏ hàng thành công",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 1000,
      });
    } else {
      toast({
        title:"LỖI",
        description:"Bạn chưa chọn sản phẩm",
        status:"error",
        isClosable:true,
        position:"top",
        duration:700
      })

    }
  };



  const handleAMountChange = (type: string) => {
    switch (type) {
      case "UP":
        setAmount((prevState) => prevState + 1);
        break;
      case "DOWN":
        if (amount > 1) setAmount((prevState) => prevState - 1);
        break;
      default:
        break;
    }
  };

  const handleImageFullScreen = (index: number) => {
    setIsImageFullScreenOpen(true);
    setIndexOfImageList(index);
  };
  const callbackFromImageFullScreen = () => {
    setIsImageFullScreenOpen(false);
  };

  return (
    <div>
      <Navbar />
      {product && <div className={clsx("distance", styles.productIdDistance)}>
        <div className={styles.bgProductRedirect}>
          <div className="grid wide">
            <div className="row">
              <div className="col l-12 c-12 m-12">
                <div className={styles.productNameAndBrand}>
                  <div className={styles.redirectContainer}>
                    <p
                      className={styles.redirectName}
                      onClick={() => router.push("/")}
                    >
                      Trang chủ
                    </p>
                    <ChevronRightIcon className={styles.redirectIcon} />
                    <p
                      className={styles.redirectName}
                      onClick={() =>
                        router.push({
                          pathname: `/kind/${product.kind.id}`,
                          query: { kindId: product.kind.id },
                        })
                      }
                    >
                      {product.kind.name}
                    </p>
                    <ChevronRightIcon className={styles.redirectIcon} />
                    <p
                      className={styles.redirectName}
                      onClick={() =>
                        router.push({
                          pathname: `/brand/${product.brand.id}`,
                          query: { brandId: product.brand.id },
                        })
                      }
                    >
                      {product.brand.brandName}
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid wide">
          {/* Product */}
          <div className={styles.wrapper}>
            <div className="row">
              {/* Image */}
              <div className="col l-4 m-4 c-12">
                <div className={styles.imgContainer}>
                  <img
                    src={product.thumbnail}
                    onClick={() => {
                      handleImageFullScreen(0);
                    }}
                  />

                  <div className={styles.imgOther}>
                    <div className="row">
                      {product.imgDescription.map((item, index) => (
                        <div
                          className="col l-3 m-4 c-4"
                          key={index}
                          onClick={() => {
                            handleImageFullScreen(index + 1);
                          }}
                        >
                          <img src={item} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="col l-4 m-4 c-12">
                <div className={styles.productControlContainer}>
                  <div className={styles.productInfoContainer}>
                    <h2 className={styles.productName}>
                      {product.productName}
                    </h2>
                    <div className={styles.component}>
                      <p>
                        Loại sản phẩm:
                        <span className={styles.brandText}>
                          {product.kind.name}
                        </span>
                      </p>
                      <p>
                        Thương hiệu:
                        <span className={styles.brandText}>
                          {product.brand.brandName}
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* total Price */}
                  <div className={styles.totalPrice}>
                      {MoneyConverter(totalPrice)}
                  </div>
                  <div className={styles.typeContainer}>
                    <h3 className={styles.priceTextheader}>Dung tích</h3>
                    <div className="row">
                      {/* Price */}
                     
                      {test.prices.map((price) => (
                        <div className="col l-4 c-4 m-4" key={price.id}>
                          <div style={{ position: "relative" }}>
                            <input
                              type="radio"
                              className={styles.inputType}
                              checked={
                                priceChecked.productPrice === price.price
                              }
                              onChange={() => handleTypeChange(price)}
                            />
                            <div className={styles.typeItem}>
                              <h4 className={styles.type}>{price.type}</h4>
                              <h4 className={styles.price}>
                                {MoneyConverter(price.price)}
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* button */}
                  <div className={styles.priceControl}>
                    <div className="row">
                      <div className="col l-4 m-4 c-4">
                      <h3 className={styles.priceTextheader}>Số lượng</h3>
                        <div className={styles.amountControl}>
                          <FontAwesomeIcon
                            icon={faMinus}
                            className={styles.amountIcon}
                            onClick={() => {
                              handleAMountChange("DOWN");
                            }}
                          />
                          <p>{amount}</p>
                          <FontAwesomeIcon
                            icon={faPlus}
                            className={styles.amountIcon}
                            onClick={() => {
                              handleAMountChange("UP");
                            }}
                          />
                        </div>
                      </div>
                      {/* <div className="col l-8 m-8 c-8">
                        <div className={styles.totalPrice}>
                          <FontAwesomeIcon
                            icon={faMoneyBill1Wave}
                            className={styles.totalPriceIcon}
                          />
                          <h1>{MoneyConverter(totalPrice)}</h1>
                          <div></div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className={styles.buttonControl}>
                    <div className="row">
                      <div className="col l-4 m-4 c-4">
                        <div className={styles.icon} onClick={handleAddToCart}>
                          <FontAwesomeIcon icon={faCartPlus} />
                        </div>
                      </div>
                      <div className="col l-8 m-8 c-8">
                        <button className="btn btn4" onClick={handlePayNow}>
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Relate */}
              <div className="col l-4 m-4 c-12">
                <div className={styles.introContainer}>
                  <h4>CAM KẾT</h4>
                  <p>Tư vấn, hỗ trợ 24/7.</p>
                  <p>
                    Chỉ kinh doanh những sản phẩm đảm bảo nguồn gốc và chất
                    lượng.
                  </p>
                  <p>Miễn phí đổi trả nếu sản phẩm có vấn đề.</p>
                  <p>Miễn phí vận chuyển với đơn hàng trên 500.000đ.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Comment */}
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <div className={styles.reviewContainer}>
                <h1 className={styles.commentHeader}>Mô tả</h1>
                <p>{product.description}</p>
              </div>
              <div className="row">
                <div className="col l-12 m-12 c-12">
                  <div className={styles.commentContainer}>
                    <div className={clsx(styles.commentHeader,styles.review)}>
                      <h1>Đánh giá</h1>
                    </div>

                    {product.comments &&
                      product.comments?.map((item) => (
                        <div
                          className={styles.commentItem}
                          key={` ${item.user.userName}_${item.user.userAvatar}_${item.content}_${item.createdAt}`}
                        >
                          <div className={styles.userInfo}>
                            <img src={item.user.userAvatar} />

                            <div className={styles.userNameContainer}>
                              <h2>{item.user.userName} </h2>
                              <Badge
                                variant="outline"
                                colorScheme="green"
                                className={styles.paidChecked}
                              >
                                Đã mua hàng
                              </Badge>
                              <FontAwesomeIcon
                                icon={faCircleCheck}
                                className={styles.paidCheckedIcon}
                              />
                            </div>
                          </div>
                          {item.rating > 0 && (
                            <div className={styles.ratingContainer}>
                              <StarRatings
                                starRatedColor="black"
                                rating={item.rating}
                                starDimension="14px"
                                starSpacing="1px"
                              />
                            </div>
                          )}

                          <div className={styles.commentContent}>
                            {item.content}
                          </div>
                          <div className={styles.imageComment}>
                            {item.imagesComment &&
                              item.imagesComment.map((item) => (
                                <img src={item} />
                              ))}
                          </div>
                          {item.feedbacks?.map((feedback) => (
                            <div
                              className={styles.feedbackContainer}
                              key={feedback.createdAt}
                            >
                              <div className={styles.adminInfo}>
                                <img src={feedback.admin.avatar} />
                                <Badge className={styles.adminName}>
                                  {feedback.admin.adminName}
                                </Badge>
                              </div>

                              <p className={styles.adminFeedbackContent}>
                                {feedback.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      ))}
                    {/* <div className={styles.commentFooter}>
            {!data?.getComments.hasMore ? (
              <Button onClick={handleLoadmore}>Xem thêm</Button>
            ) : (
              <h4>Bạn đã xem hết bình luận</h4>
            )}
          </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
      <Footer />
      {type === "admin" ? (
        <div className="adminControl">
          <Button
            colorScheme="messenger"
            onClick={() => {
              const props: EditProductPriceProps = {
                productId: product.id,
                priceFieldProps: convertToPriceFieldProps(),
              };
              dispatch(setEditProductPriceProps(props));
              router.push("/admin/edit-product-price");
            }}
          >
            Chỉnh sửa giá
          </Button>
        </div>
      ) : (
        <span></span>
      )}
      {isImageFullScreenOpen && (
        <ImageFullScreen
          urlList={product.imageList}
          callbackToClose={callbackFromImageFullScreen}
          index={indexOfImageList}
        />
      )}
      {mySpinner && <MySpinner/>}
    </div>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await client.query<GetProductsQuery>({
//     query: GetProductsDocument,
//     variables: {
//       paginationOptions: {
//         skip: 4,
//       },
//     },
//   });

//   return {
//     paths: data.getProducts.products!.map((product) => ({
//       params: { productId: `${product.id}` },
//     })),
//     fallback: "blocking",
//   };
// };
// export const getStaticProps: GetStaticProps<
//   { [key: string]: any },
//   { productId: string }
// > = async ({ params }) => {
//   const { data, error, loading } = await client.query<GetProductQuery>({
//     query: GetProductDocument,
//     variables: { productId: params?.productId },
//   });
//   return {
//     props: {
//       product: data.getProduct.product,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data, error, loading } = await client.query<GetProductQuery>({
    query: GetProductDocument,
    variables: { productId: query.productId },
  });
  if (data.getProduct) {
    return {
      props: {
        product: data.getProduct.product,
      },
    };
  } else {
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductId;
