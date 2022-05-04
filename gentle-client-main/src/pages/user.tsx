import { ChevronRightIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Badge, Button, Select, useToast } from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../assets/css/pages/user.module.css";
import BillCancelReason from "../components/BillCancelReason";
import BillDetail from "../components/BillDetail";
import MySpinner from "../components/MySpinner";
import Navbar from "../components/Navbar";
import TakeMoney, { TakeMoneyProps } from "../components/TakeMoney";
import {
  Bill,
  useGetUserLazyQuery,
  useLogoutMutation,
  UserResponse,
} from "../generated/graphql";
import { authSelector, logoutClient } from "../store/reducers/authSlice";
import { setWriteCommentProps } from "../store/reducers/localSlice";
import { MoneyConverter } from "../utils/other/ConvertToMoney";
import { BillStatusType } from "../utils/type/BillStatusType";
import {
  ProductInCommentProps,
  WriteCommentProps,
} from "../utils/type/redux/reduxType";

interface UserBillProps {
  id: number;
  billStatus: string;
  totalPrice: number;
  isCommented?: boolean;
  createdAt: string;
  billProducts: UserBillProductProps[];
  paymentDown: number;
}
interface UserBillProductProps {
  productThumbnail: string;
  productName: string;
}

const User = () => {
  const [getUserQuery] = useGetUserLazyQuery();

  const [logoutServer] = useLogoutMutation();

  const { isAuthenticated, isLoading, type } = useSelector(authSelector);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  //State

  const [billStatus, setBillStatus] = useState<BillStatusType>(
    BillStatusType.COMFIRM_WAITING
  );
  const [user, setUser] = useState<UserResponse | null>(null);
  const [bills, setBills] = useState<Bill[]>([]);
  const [billDetail, setBillDetail] = useState<Bill | null>(null);
  const [info, setInfo] = useState<TakeMoneyProps>({
    imgSrc: "",
    userName: "",
    money: 0,
  });

  //Use Effect
  useEffect(() => {
    const query = async () => {
      if (!isLoading && isAuthenticated && type === "user") {
        const { data, loading, error } = await getUserQuery();
        if (loading) {
          setLoadingLocal(true);
        } else {
          setLoadingLocal(false);
        }
        if (data?.getUser.success) {
          setUser(data.getUser as UserResponse);
        }
      }
      if (!isLoading && !isAuthenticated) {
        toast({
          title: "Lỗi",
          description: "Bạn không thể vào trang này khi chưa đăng nhập",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 3000,
        });
        router.push("/");
      }
    };
    query();
  }, []);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      //Set Info for take money
      const infoTemp: TakeMoneyProps = {
        imgSrc: user.user!.userAvatar,
        userName: user.user?.userName!,
        money: user.user?.moneyCount!,
      };
      setInfo(infoTemp);

      setBills(user.user?.bills!);
    }
  }, [user]);

  //Handle
  const handleBillStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBillStatus(event.target.value as BillStatusType);
  };
  const handleWriteComment = (index: number) => {
    const item = bills[index];

    const tempList: ProductInCommentProps[] = item.billProducts.map(
      (billProduct) => {
        const tempItem: ProductInCommentProps = {
          productName: billProduct.productName,
          productThumbnail: billProduct.productThumbnail,
        };
        return tempItem;
      }
    );
    const props: WriteCommentProps = {
      billId: item.id,
      products: tempList,
    };
    dispatch(setWriteCommentProps(props));

    router.push("/write-comment");
  };
  const callbackFromBillCancelReason = async (id: number) => {
    let tempList = bills.map((item) => ({
      ...item,
      billStatus: item.id === id ? BillStatusType.CANCEL : item.billStatus,
    }));
    setBills(tempList);
  };

  const logout = async () => {
    dispatch(logoutClient());
    const result = await logoutServer();
    if (result.data?.logout.success) {
      router.push("/");
    }
  };

  const callBackToClose = () => {
    setBillDetail(null);
  };
  return (
    <div>
      <Navbar />
      <div className="distance">
        <div className="grid wide">
          <div className="row">
            <div className="col l-4 m-4 c-12">
              <div className={styles.userInfoContainer}>
                <h2 className={styles.heading}>thông tin cá nhân</h2>
                <div className={styles.userInfo}>
                  <div className={styles.userNameAndAvatar}>
                    <img src={user ? user!.user?.userAvatar : ""} />

                    <h3 className={styles.userName}>
                      {user ? user!.user?.userName : ""}
                    </h3>
                  </div>


                  <div className={styles.accountContainer}>
                    <h3 className={styles.title}>*Mã GIỚI THIỆU<span className={styles.toEvent} onClick={() => router.push("/events")}>(Xem Chi tiết)</span></h3>
                    <div className={styles.moneyInfo}>
                      <h4>{user?.user?.introduceCode}</h4>
                      <FontAwesomeIcon icon={faCopy}className={styles.coppyIcon} onClick={() =>{
                      
                          if(user && user.user?.introduceCode){
                            navigator.clipboard.writeText(user.user.introduceCode.toString())
                            toast({
                              title:"Thông báo",
                              description:"Coppy thành công!",
                              status:"success",
                              isClosable:true,
                              duration:700,
                              position:"top-right"
                            })
                          }
                        
                      }}/>
                    </div>
                  </div>
                  <div className={styles.accountContainer}>
                  <h3 className={styles.title}>*Tiền tích trữ</h3>
                    <div className={styles.moneyInfo}>
                      
                        
                        <span className={styles.moneyNumber}>
                          {MoneyConverter(user ? user!.user?.moneyCount! : 0)}
                        </span>
                      
                      {/* <Button
                      colorScheme="green"
                      className={clsx(styles.btnTakeMoney, "boxShadowNone")}
                    >
                      Rút tiền
                    </Button> */}
                      <TakeMoney
                        imgSrc={info.imgSrc}
                        userName={info.userName}
                        money={info.money}
                      />
                    </div>
                    <div className={styles.historyText}>
                      <ChevronRightIcon />
                      <p onClick={() => router.push("/moneyBonusHistory")}>
                        lịch sử{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.btnLogOut}>
                  <Button className="noneBorder" onClick={logout}>
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </div>
            <div className="col l-8 m-8 c-12">
              <div className={styles.userOrderContainer}>
                <h2 className={styles.heading}>Đơn hàng của tôi</h2>
                {/* <h3>
                  Bạn có {user ? user!.user?.confirmWaitingCount : ""} đơn chờ
                  xác nhận,{user ? user!.user?.packedCount : ""} đơn đã xác
                  nhận, 4 đơn đã đóng gói ,3 đơn đang vận chuyển
                </h3> */}
                <div className={styles.userOrderBody}>
                  <div style={{ padding: 12 }}>
                    <Select
                      fontFamily="Roboto"
                      fontSize="1rem"
                      size="sm"
                      className={clsx("boxShadowNone", styles.userSelect)}
                      value={billStatus}
                      onChange={(event) => handleBillStatusChange(event)}
                    >
                      <option value={BillStatusType.COMPLETED}>
                        {BillStatusType.COMPLETED}
                      </option>
                      <option value={BillStatusType.CANCEL}>
                        {BillStatusType.CANCEL}
                      </option>
                      <option value={BillStatusType.COMFIRM_WAITING}>
                        {BillStatusType.COMFIRM_WAITING}
                      </option>
                      <option value={BillStatusType.CONFIRMED}>
                        {BillStatusType.CONFIRMED}
                      </option>
                      <option value={BillStatusType.PACKED}>
                        {BillStatusType.PACKED}
                      </option>
                      <option value={BillStatusType.DELIVERING}>
                        {BillStatusType.DELIVERING}
                      </option>
                    </Select>
                  </div>
                  <div className={styles.userOrderList}>
                    {bills.map((item, index) => {
                      if (item.billStatus === billStatus) {
                        if (
                          item.billStatus === BillStatusType.COMPLETED &&
                          !item.isCommented
                        ) {
                          return (
                            <div className={styles.userOrderItem} key={item.id}>
                              <div className={styles.userOrderItemHeader}>
                                <div className={styles.orderInfo}>
                                  <div className={styles.productDescription}>
                                    <div className="row">
                                      <div className="col l-3 m-3 c-12">
                                        <img
                                          src={
                                            item.billProducts[
                                              item.billProducts.length - 1
                                            ].productThumbnail
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div className="col l-9 m-9 c-12">
                                        <div className={styles.productName}>
                                          <h3>
                                            {
                                              item.billProducts[
                                                item.billProducts.length - 1
                                              ].productName
                                            }
                                          </h3>

                                          <h4>
                                            Và {item.billProducts.length - 1}{" "}
                                            sản phẩm khác
                                          </h4>

                                          <h5>Ngày đặt : {item.createdAt}</h5>
                                          {item.paymentDown && (
                                            <h5 className={styles.paymentDown}>
                                              Đã tranh toán trước :{" "}
                                              {MoneyConverter(item.paymentDown)}{" "}
                                            </h5>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className={styles.writeCommentContainer}>
                                  <div>
                                    <Badge variant="solid" colorScheme="red">
                                      {item.billStatus}
                                    </Badge>
                                    <ViewIcon
                                      color="gray.500"
                                      className={styles.viewIcon}
                                      onClick={() => setBillDetail(item)}
                                    />
                                  </div>
                                  <div style={{ textAlign: "end" }}>
                                    <EditIcon
                                      onClick={() => handleWriteComment(index)}
                                      className={styles.editIcon}
                                    >
                                      Viết bình luận
                                    </EditIcon>
                                    <h4>Viết bình luận để nhận {MoneyConverter(item.commentPrice)}</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        } else if (
                          //another
                          item.billStatus !== BillStatusType.DELIVERING &&
                          item.billStatus !== BillStatusType.COMPLETED &&
                          item.billStatus !== BillStatusType.CANCEL
                        ) {
                          return (
                            <div className={styles.userOrderItem} key={item.id}>
                              <div className={styles.userOrderItemHeader}>
                                <div className={styles.orderInfo}>
                                  <div className={styles.productDescription}>
                                    <div className="row">
                                      <div className="col l-3 m-3 c-12">
                                        <img
                                          src={
                                            item.billProducts[
                                              item.billProducts.length - 1
                                            ].productThumbnail
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div className="col l-9 m-9 c-12">
                                        <div className={styles.productName}>
                                          <h3>
                                            {
                                              item.billProducts[
                                                item.billProducts.length - 1
                                              ].productName
                                            }
                                          </h3>

                                          <h4>
                                            Và {item.billProducts.length - 1}{" "}
                                            sản phẩm khác
                                          </h4>

                                          <h5>Ngày đặt : {item.createdAt}</h5>
                                          {item.paymentDown && (
                                            <h5 className={styles.paymentDown}>
                                              Đã tranh toán trước :{" "}
                                              {MoneyConverter(item.paymentDown)}{" "}
                                            </h5>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className={styles.cancelControl}>
                                  <div>
                                    <Badge variant="solid" colorScheme="red">
                                      {item.billStatus}
                                    </Badge>
                                    <ViewIcon
                                      color="gray.500"
                                      className={styles.viewIcon}
                                      onClick={() => setBillDetail(item)}
                                    />
                                  </div>
                                  <BillCancelReason
                                    billId={item.id}
                                    callBack={callbackFromBillCancelReason}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          //complete but isComment = true
                          return (
                            <div className={styles.userOrderItem} key={item.id}>
                              <div className={styles.userOrderItemHeader}>
                                <div className={styles.orderInfo}>
                                  <div className={styles.productDescription}>
                                    <div className="row">
                                      <div className="col l-3 m-3 c-12">
                                        <img
                                          src={
                                            item.billProducts[
                                              item.billProducts.length - 1
                                            ].productThumbnail
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div className="col l-9 m-9 c-12">
                                        <div className={styles.productName}>
                                          <h3>
                                            {
                                              item.billProducts[
                                                item.billProducts.length - 1
                                              ].productName
                                            }
                                          </h3>

                                          <h4>
                                            Và {item.billProducts.length - 1}{" "}
                                            sản phẩm khác
                                          </h4>

                                          <h5>Ngày đặt : {item.createdAt}</h5>
                                          {item.paymentDown && (
                                            <h5 className={styles.paymentDown}>
                                              Đã tranh toán trước :{" "}
                                              {MoneyConverter(item.paymentDown)}{" "}
                                            </h5>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className={styles.cancelControl}>
                                  <div>
                                    <Badge variant="solid" colorScheme="red">
                                      {item.billStatus}
                                    </Badge>
                                    <ViewIcon
                                      color="gray.500"
                                      className={styles.viewIcon}
                                      onClick={() => setBillDetail(item)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {billDetail !== null && (
        <BillDetail bill={billDetail} callbackToClose={callBackToClose} />
      )}
      {loadingLocal && <MySpinner />}
    </div>
  );
};

export default User;
