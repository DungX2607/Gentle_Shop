import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "../assets/css/pages/billDetail.module.css";
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Footer from "./Footer";
import clsx from "clsx";
import { Bill } from "../generated/graphql";
import { MoneyConverter } from "../utils/other/ConvertToMoney";
import { iteratorSymbol } from "immer/dist/internal";

interface BillDetailProps {
  bill: Bill;

  callbackToClose: Function;
}

const BillDetail = ({ bill, callbackToClose }: BillDetailProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [bill, setBill] = useState<Bill>();
  console.log(bill)

  useEffect(() => {
    if (bill !== null && bill!== undefined) {
      
      
      onOpen();
    }
  }, [bill]);
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          callbackToClose();
        }}
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton  className="noneBorder"/>
          <ModalBody>
            <h1 style={{ textAlign: "center" }}>Memories</h1>
            <div className="distance">
              <div className="grid wide">
                <div className="row">
                  <div className="col l-12 m-12 c-12">
                    <div className={styles.billDetailContainer}>
                      <h1 className={styles.heading}>Chi tiết đơn hàng</h1>
                      <div className="row">
                        <div className="col l-6 m-6 c-12">
                          <div className={styles.body}>
                            <div className={styles.orderStatusContainer}>
                              <h2 className={styles.bodyHeading}>
                                Thông tin đơn hàng
                              </h2>
                              <Badge variant="solid" colorScheme="red">
                                {bill?.billStatus}
                              </Badge>
                            </div>
                            <div className={styles.orderBasicInfo}>
                              <h2>
                                Ngày đặt:
                                <span className={styles.customSpan}>
                                  {bill?.createdAt}
                                </span>
                              </h2>
                              <h2>Phương thức thanh toán:</h2>
                              <h3 style={{ fontSize: "1.1rem" }}>
                                {bill?.paymentType}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="col l-6 m-6 c-12">
                          <div className={styles.body}>
                            <h2 className={styles.bodyHeading}>
                              Thông tin người nhận
                            </h2>
                            <div className={styles.orderBasicInfo}>
                              <h2>
                                Họ và tên:
                                <span className={styles.customSpan}>
                                  {bill?.customer.customerName}
                                </span>
                              </h2>
                              <h2>
                                Số điện thoại:
                                <span className={styles.customSpan}>
                                  {bill?.customer.customerPhone}
                                </span>
                              </h2>
                              <h2>
                                Địa chỉ:
                                <span className={styles.customSpan}>
                                  {bill?.customer.address},{" "}
                                  {bill?.customer.province}, {bill?.customer.city}
                                </span>
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="col l-12 m-12 c-12">
                          <div className={styles.productContainer}>
                            <div className={styles.productHeader}>
                              <div className="row">
                                <div className="col l-3 m-3 c-3">
                                  <h2>Sản phẩm</h2>
                                </div>
                                <div className="col l-3 m-3 c-3">
                                  <h2 className={styles.textEnd}>Đơn giá</h2>
                                </div>
                                <div className="col l-3 m-3 c-3">
                                  <h2 className={styles.textEnd}>Số lượng</h2>
                                </div>
                                <div className="col l-3 m-3 c-3">
                                  <h2 className={styles.textEnd}>Tạm tính</h2>
                                </div>
                              </div>
                            </div>
                            <div className={styles.productList}>
                              <div className={styles.productItem}>
                                <div className="row">
                                  {bill?.billProducts.map((item) => (
                                    <>
                                      <div className="col l-3 m-3 c-3">
                                        <div className={styles.productInfo}>
                                          <div
                                            className={
                                              styles.productDescription
                                            }
                                          >
                                            <h3>
                                              {item.productName}
                                            </h3>
                                            <h4>{item.productType}</h4>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col l-3 m-3 c-3">
                                        <div className={styles.textEnd}>
                                         {MoneyConverter(item.productPrice)}
                                        </div>
                                      </div>
                                      <div className="col l-3 m-3 c-3">
                                        <div className={styles.textEnd}>{item.productAmount}</div>
                                      </div>
                                      <div className="col l-3 m-3 c-3">
                                        <div className={styles.textEnd}>
                                          {MoneyConverter(item.productPrice*item.productAmount)}
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className={styles.productFooter}>
                              <div className="row">
                                <div className="l-9 m-9 c-6">
                                  <p className={styles.textEnd}>
                                    Phí vận chuyển:
                                  </p>
                                  <p className={styles.textEnd}>Mã giảm giá:</p>
                                  <p className={styles.textEnd}>Trả trước:</p>
                                  <p className={styles.textEnd}>Tổng cộng:</p>
                                </div>
                                <div className="l-3 m-3 c-6">
                                  {bill.deliveryPrice>0 ? <h2 className={styles.textEnd}>{MoneyConverter(bill.deliveryPrice)}</h2> : <h2 className={styles.textEnd}>Miễn phí</h2>}
                                  <h2 className={styles.textEnd}>{MoneyConverter(bill.introducePrice)}</h2>
                                  {bill.paymentDown ? <h2 className={styles.textEnd}>{MoneyConverter(bill.paymentDown)}</h2> :<h2 className={styles.textEnd}>0đ</h2> }
                                  
                                  <h2 className={styles.totalPrice}>
                                    {" "}
                                    {MoneyConverter(bill?.totalPrice!)}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={clsx(styles.backContainer)}>
                            <Button onClick={onClose} className="noneBorder">Quay về</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </ModalBody>
        </ModalContent>
      </Modal>

      
    </div>
  );
};

export default BillDetail;
