import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  faCaretLeft,
  faCaretRight,
  faCartShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../assets/css/components/cart.module.css";
import {
  BillProductInput,
  useGetCartProductLazyQuery,
} from "../generated/graphql";
import { PaymentProps } from "../pages/payment";
import {
  localSelector,
  setBillProductsFromLocal,
  setCountProps,
  setPaymentProps,
} from "../store/reducers/localSlice";
import { MoneyConverter } from "../utils/other/ConvertToMoney";
import emptyCart from "../assets/images/EmptyCart.png";
import Image from "next/image";

const Cart = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const [getData, { data, loading, error }] = useGetCartProductLazyQuery();
  const { billProductsFromLocal } = useSelector(localSelector);

  // const [billProductsFromLocal, setBillProductsFromLocal] = useState<
  //   BillProductInput[]
  // >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  //Remove____________________________________________________
  //Assign data to billProductsFromLocal
  // useEffect(() => {
  //   if (data?.getCartProduct.success) {
  //     setBillProductsFromLocal(data?.getCartProduct.products!);
  //     const caculate = totalPriceCaculating();
  //     setTotalPrice(caculate!);
  //   }
  // }, [data]);


  //Change totalPrice whenever amount change
  useEffect(() => {
    const caculate = totalPriceCaculating();
    setTotalPrice(caculate);
  
  }, [billProductsFromLocal]);

  const totalPriceCaculating = () : number => {
    if (billProductsFromLocal) {
      return billProductsFromLocal.reduce(
        (prev, current) => current.productAmount * current.productPrice + prev,
        0
      );
    }else return 0
  };

  //remove________________________________________________________
  // useEffect(() => {
  //   if (isOpen) {
  //     if (localStorage.getItem("localBillProducts")) {
  //       const localBillProducts = JSON.parse(
  //         localStorage.getItem("localBillProducts")!
  //       );
  //       if (Array.isArray(localBillProducts)) {
  //         setBillProductsFromLocal(localBillProducts);
  //         getData({
  //           variables: {
  //             localBillProducts,
  //           },
  //         });
  //       }
  //     }
  //   }
  // }, [isOpen]);

  //handle
  const handleRemoveItem = (id: number) => {
    let listTemp: BillProductInput[] = billProductsFromLocal.filter((item) => {
      if (item.priceIdForLocal !== id) {
        return item;
      }
    });
    dispatch(setBillProductsFromLocal(listTemp))
    // setBillProductsFromLocal(listTemp);
    if(listTemp.length>0){
      localStorage.setItem("localBillProducts", JSON.stringify(listTemp));
    }else{
      localStorage.removeItem("localBillProducts");
    }
    // let cartCountAsString = localStorage.getItem("cartCount");
    // if (cartCountAsString) {
    //   let cartCount = +cartCountAsString;
    //   if (cartCount > 0) cartCount--;

    //   localStorage.setItem("cartCount", cartCount.toString());
    //   dispatch(setCountProps(cartCount));
    // }
  };

  
  const handleChangeAmount = (id: number, type: string) => {
    let listTemp: BillProductInput[] = billProductsFromLocal.map((item) => {
      if (item.priceIdForLocal === id) {
        if (type === "DOWN") {
          if (item.productAmount > 1) {
            const newAmount = item.productAmount - 1;
            return {
              ...item,
              productAmount: newAmount,
            };
          }
        } else {
          const newAmount = item.productAmount + 1;
          return {
            ...item,
            productAmount: newAmount,
          };
        }
      }
      return item;
    });
    localStorage.setItem("localBillProducts", JSON.stringify(listTemp));
    dispatch(setBillProductsFromLocal(listTemp))
  };
  const handleToPayment = () => {
    const props: PaymentProps = {
      listCart: billProductsFromLocal,
      totalPrice,
    };
    dispatch(setPaymentProps(props));

    router.push("/payment");
  };
  return (
    <>
      <div ref={btnRef} onClick={onOpen}>
        <FontAwesomeIcon
          icon={faCartShopping}
          className={styles.shoppingIcon}
        />
        {billProductsFromLocal.length > 0 ? (
          <p className={styles.numberCountCartItem}>
            {billProductsFromLocal.length}
          </p>
        ) : (
          <span></span>
        )}
      </div>

      <Drawer
        size="sm"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="grid">
            <div className="row">
              <div className="l-12">
                <div className={styles.modalBody}>
                  <div className={styles.header}>
                    <h2>Giỏ hàng</h2>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className={styles.headerIconClose}
                      onClick={() => {
                        onClose();
                      }}
                    />
                  </div>
                  {billProductsFromLocal.length > 0 ? (
                    <>
                      <div className={styles.body}>
                        {billProductsFromLocal.map((item) => (
                          <div
                            className={styles.list}
                            key={item.priceIdForLocal}
                          >
                            <img src={item.productThumbnail} />
                            <div className={styles.itemInfo}>
                              <div>
                                <h3>{item.productName}</h3>
                                <h4>{item.productType}</h4>
                              </div>
                              <div className={styles.amount}>
                                <FontAwesomeIcon
                                  onClick={() =>
                                    handleChangeAmount(
                                      item.priceIdForLocal!,
                                      "DOWN"
                                    )
                                  }
                                  icon={faCaretLeft}
                                  className={styles.iconUpDownAmount}
                                />
                                <span>{item.productAmount}</span>
                                <FontAwesomeIcon
                                  onClick={() =>
                                    handleChangeAmount(
                                      item.priceIdForLocal!,
                                      "UP"
                                    )
                                  }
                                  icon={faCaretRight}
                                  className={styles.iconUpDownAmount}
                                />
                              </div>
                              <p>{MoneyConverter(item.productPrice)}</p>
                            </div>
                            <FontAwesomeIcon
                              icon={faXmark}
                              className={styles.itemDeleteIcon}
                              onClick={() =>
                                handleRemoveItem(item.priceIdForLocal!)
                              }
                            />
                          </div>
                        ))}
                      </div>
                      <div className={styles.footer}>
                        <div className={styles.footerTotal}>
                          <p>TỔNG TIỀN:</p>
                          <h1>{MoneyConverter(totalPrice)}</h1>
                        </div>
                        <div className={styles.footerBtn}>
                          <button
                            className="btn btn4"
                            onClick={handleToPayment}
                          >
                            tới trang thanh toán
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={styles.cartEmptyContainer}>
                      <Image src={emptyCart} />
                      <h3>Giỏ hàng trống</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
