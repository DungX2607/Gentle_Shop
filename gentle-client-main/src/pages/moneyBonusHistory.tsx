import { Badge, Button, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, toast, useDisclosure, useToast } from "@chakra-ui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import styles from "../assets/css/pages/moneyBonusHistory.module.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RedirectHeader, {
  RedirectHeaderProps,
} from "../components/RedirectHeader";
import {
  useGetUserMoneyHistoryQuery,
  useUserCancelTakeMoneyFieldMutation,
} from "../generated/graphql";
import { MoneyConverter } from "../utils/other/ConvertToMoney";
import { MoneyBonusType } from "../utils/type/MoneyBonusType";

const item1: RedirectHeaderProps = {
  displayName: "trang chủ",
  url: "/",
};
const item2: RedirectHeaderProps = {
  displayName: "thông tin người dùng",
  url: `/user`,
};


const list: RedirectHeaderProps[] = [item1, item2];

const moneyBonusHistory = () => {
  const toast = useToast()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const item1: RedirectHeaderProps = {
    displayName: "trang chủ",
    url: "/",
  };
  const item2: RedirectHeaderProps = {
    displayName: "thông tin",
    url: "/user",
  };
  const list: RedirectHeaderProps[] = [item1, item2];
  const convertToDate = (value: string): string => {
    const date = new Date(value);

    // const convertValue = value.substring(0,19)
    const convertValue = `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    return convertValue;
  };
  useEffect(() =>{
    setTakeMoneyFieldId(0)
  },[onClose])
  
  const [query, setQuery] = useState("GET");
  const [content, setContent] = useState<ReactNode>(null);
  const [takeMoneyFieldId,setTakeMoneyFieldId] = useState(0)
  const { data } = useGetUserMoneyHistoryQuery();
  const [cancelTakeMoneyField] = useUserCancelTakeMoneyFieldMutation();
  const handleCancelTakeMoneyField =async () =>{
    if(takeMoneyFieldId!==0){
      const res = await cancelTakeMoneyField({
        variables:{
          takeMoneyFieldId
        }
      })
      if(res.data?.userCancelTakeMoneyField.success){
        toast({
          title:"THÔNG BÁO",
          description:"Hủy yêu cầu rút tiền thành công"
          ,
          status:"success",
          isClosable:true,
          duration:3000
        })
        router.reload()
      }else{
        toast({
          title:"THÔNG BÁO",
          description:res.data?.userCancelTakeMoneyField.message
          ,
          status:"error",
          isClosable:true,
          duration:3000
        })
      }
    }else{
      toast({
        title:"THÔNG BÁO",
        description:"Có lỗi xảy ra, vui lòng liên hệ Admin để được trợ giúp,Thành thật xin lỗi quý khách!"
        ,
        status:"error",
        isClosable:true,
        duration:3000
      })
    }
  }
  useEffect(() => {
    switch (query) {
      case "GET":
        console.log("get");
        setContent(
          <div className={styles.list}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Nội dung</th>
                  <th className={styles.tableHeader}>Thời gian</th>
                  <th className={styles.tableHeader}>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {data?.getUserMoneyHistory.moneyBonuses?.map((item, index) => {
                  if (item.type === MoneyBonusType.GET) {
                    return (
                      <tr className={styles.row} key={index}>
                        <td>{item.description}</td>
                        <td>{convertToDate(item.createdAt)}</td>
                        <td className={clsx(styles.footer, styles.green)}>
                          +{MoneyConverter(item.moneyNumber)}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        );
        break;
      case "TAKE":
        setContent(
          <div className={styles.list}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Nội dung</th>
                  <th className={styles.tableHeader}>Thời gian</th>
                  <th className={styles.tableHeader}>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {data?.getUserMoneyHistory.moneyBonuses?.map((item, index) => {
                  if (item.type === MoneyBonusType.TAKE) {
                    return (
                      <tr className={styles.row} key={index}>
                        <td>{item.description}</td>
                        <td>{convertToDate(item.createdAt)}</td>
                        <td className={clsx(styles.footer, styles.red)}>
                          -{MoneyConverter(item.moneyNumber)}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        );
        break;
      case "OTHER":
        setContent(
          <div className={styles.listTakeMoney}>
            {data?.getUserMoneyHistory.takeMoneyFields?.map((item, index) => (
              <div className={styles.takeMoneyItem} key={index}>
                <div className={styles.seperateUserInfo}>
                  {item.isSuccess ? (
                    <Badge colorScheme="gray">Chờ xử lý</Badge>
                  ) : (
                    <Badge colorScheme="red">Đã bị hủy</Badge>
                  )}
                  {!item.isSuccess && (
                    <div className={styles.textCancelReason}>
                      Lý do : {item.cancelReason}
                    </div>
                  )}
                  <div className={styles.userInfo}>
                    <p>
                      Số tài khoản:
                      <span className={styles.textUserData}>
                        {item.accountNumber}
                      </span>
                    </p>
                    <p>
                      Tên người thụ hưởng:
                      <span className={styles.textUserData}>
                        {item.accoutName}
                      </span>
                    </p>
                    <p>
                      Ngân hàng :
                      <span className={styles.textUserData}>
                        {item.accountBankName}
                      </span>
                    </p>
                    <p>
                      Số tiền rút :
                      <span className={clsx(styles.textUserData, styles.money)}>
                        {MoneyConverter(item.money)}
                      </span>
                    </p>
                  </div>
                  <div> </div>
                  {item.isSuccess &&  <Button className="noneBorder" textTransform="uppercase" marginTop={8} onClick={() =>{
                    setTakeMoneyFieldId(item.id)
                    onOpen()
                  }}>Hủy đơn này</Button>}
                </div>

             
              </div>
            ))}
          </div>
        );
        break;
      default:
        break;
    }
  }, [query, data]);

  return (
    <div className={styles.bg}>
      <Navbar  />
      <div className="distance" >
        <RedirectHeader list={list} pageName="lịch sử tài khoản" />
        <div className="grid wide">
          <div className="row">
            <div className="col l-8 l-o-2 m-12 c-12">
              <div className={styles.container}>
                
                <div className="row">
                  <div className="col l-12 m-12 c-12">
                    <select
                      className={clsx("noneBorder", styles.userSelect)}
                      onChange={(event) => setQuery(event.target.value)}
                    >
                      <option value="GET">Lịch sử nhận tiền</option>
                      <option value="TAKE">Lịch sử rút tiền</option>
                      <option value="OTHER">Yêu cầu rút tiền</option>
                    </select>
                    {content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>HỦY YÊU CẦU RÚT TIỀN</ModalHeader>
          <ModalCloseButton  className="noneBorder"/>
          <ModalBody>
            <h2>QÚY KHÁCH CÓ CHẮC CHẮN MUỐN HỦY YÊU CẦU NÀY?</h2>
          </ModalBody>

          <ModalFooter>
            <Button className="noneBorder"  mr={3} onClick={onClose}>
              QUAY LẠI
            </Button>
            <Button colorScheme="red" className="noneBorder" onClick={handleCancelTakeMoneyField}>HỦY ĐƠN</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default moneyBonusHistory;
