import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select, useDisclosure,
  useToast
} from "@chakra-ui/react";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import styles from "../assets/css/pages/takeMoney.module.css";
import {
  TakeMoneyFieldInput,
  useTakeMoneyMutation
} from "../generated/graphql";
import { MoneyConverter } from "../utils/other/ConvertToMoney";
import MyErrorMessage from "./MyErrorMessage";
import RedirectHeader, {  RedirectHeaderProps } from "./RedirectHeader";

export interface TakeMoneyProps {
  imgSrc: string;
  userName: string;
  money: number;
}

interface ErrorTakeMoneyProps {
  accountBankName: boolean;
  accountNumber: boolean;
  accoutName: boolean;
  money: boolean;
  message: string;
}



const TakeMoney = ({ imgSrc, userName, money }: TakeMoneyProps) => {
  const [takeMoneyMutation] = useTakeMoneyMutation();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [field, setField] = useState<TakeMoneyFieldInput>({
    accountBankName: "",
    accountNumber: "",
    accoutName: "",
    money: 0,
  });
  const [errorTakeMoney, setErrorTakeMoney] = useState<ErrorTakeMoneyProps>({
    accountBankName: false,
    accountNumber: false,
    accoutName: false,
    money: false,
    message: "",
  });
  const toast = useToast();



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorTakeMoney.message !== "") {
      setErrorTakeMoney({
        accountBankName: false,
        accountNumber: false,
        accoutName: false,
        money: false,
        message: "",
      });
    }
    switch (e.target.name) {
      case "accountNumber":
        setField({
          ...field,
          accountNumber: e.target.value,
        });
        break;
      case "accoutName":
        setField({
          ...field,
          accoutName: e.target.value,
        });
        break;
      case "money":
        setField({
          ...field,
          money: +e.target.value,
        });
        break;

      default:
        break;
    }
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (errorTakeMoney.message !== "") {
      setErrorTakeMoney({
        accountBankName: false,
        accountNumber: false,
        accoutName: false,
        money: false,
        message: "",
      });
    }
    setField({ ...field, accountBankName: e.target.value });
  };

  const handleSubmit = async () => {
    switch (true) {
      case field.accountNumber.length < 8:
        setErrorTakeMoney({
          accountBankName: false,
          accountNumber: true,
          accoutName: false,
          money: false,
          message: "M?? t??i kho???n kh??ng h???p l???",
        });
        break;
      case field.accoutName.length < 1:
        setErrorTakeMoney({
          accountBankName: false,
          accountNumber: false,
          accoutName: true,
          money: false,
          message: "T??n ng?????i th??? h?????ng kh??ng h???p l???",
        });
        break;
      case field.accountBankName.length < 1:
        setErrorTakeMoney({
          accountBankName: true,
          accountNumber: false,
          accoutName: false,
          money: false,
          message: "Vui l??ng ch???n ng??n h??ng",
        });
        break;
      case field.money < 50000 || field.money > money:
        setErrorTakeMoney({
          accountBankName: false,
          accountNumber: false,
          accoutName: false,
          money: true,
          message: "S??? ti???n b???n r??t kh??ng ph?? h???p",
        });
        break;

      default:
        const { data, errors } = await takeMoneyMutation({
          variables: {
            field,
          },
        });
        if (errors) console.log(errors);
        if (data?.createTakeMoneyField.success) {
          toast({
            title: "Th??ng b??o",
            description:
              "T???o ????n r??t ti???n th??nh c??ng, S??? ti???n b???n r??t s??? ???????c chuy???n v??o t??i kho???n trong th???i gian s???m nh???t, C???m ??n b???n ???? tham gia ??u ????i c???a ch??ng t??i",
          });
          onClose();
        }
        break;
    }
  };

  return (
    <div>
      <div onClick={onOpen} className="btn btn4" style={{border:"none"}}>
        R??t ti???n
      </div>

      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton className="noneBorder" />
          <ModalBody>
         

              <div className="grid wide">
                <div className="row">
                  <div className="col l-6 m-6 c-12">
                    <div className={styles.userInfoContainer}>
                      <div className={styles.userInfo}>
                        <img src={imgSrc} />
                        <h3 className={styles.userName}>{userName}</h3>
                      </div>
                      <div className={styles.accountContainer}>
                        <div className={styles.moneyInfo}>
                          <p>
                            Ti???n t??ch tr???:
                            <span className={styles.moneyNumber}>
                              {MoneyConverter(money)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col l-6 m-6 c-12">
                    <h1 className={styles.heading}>Th??ng tin r??t ti???n</h1>
                    {errorTakeMoney.message !== "" && (
                      <MyErrorMessage
                        type="error"
                        message={errorTakeMoney.message}
                      />
                    )}
                    <div className={styles.takeMoneyContainer}>
                      <div className={styles.body}>
                        <Input
                          isInvalid={errorTakeMoney.accountNumber}
                          errorBorderColor="crimson"
                          placeholder="M?? t??i kho???n th??? h?????ng"
                          size="md"
                          type="number"
                          name="accountNumber"
                          className={styles.input}
                          value={field.accountNumber}
                          onChange={(event) => handleInputChange(event)}
                        />
                        <Input
                          isInvalid={errorTakeMoney.accoutName}
                          errorBorderColor="crimson"
                          placeholder="T??n ch??? t??i kho???n"
                          size="md"
                          value={field.accoutName}
                          name="accoutName"
                          className={styles.input}
                          onChange={(event) => handleInputChange(event)}
                        />
                        <Select
                          isInvalid={errorTakeMoney.accountBankName}
                          errorBorderColor="crimson"
                          placeholder="T??n Ng??n H??ng"
                          size="md"
                          className={styles.select}
                          value={field.accountBankName}
                          onChange={(event) => handleSelectChange(event)}
                        >
                          <option value="Vietcombank">Vietcombank</option>
                          <option value="DongABank">DongABank</option>
                          <option value="MBBank">MBBank</option>
                        </Select>
                        <div>
                          <div className="row">
                            <div className="col l-9 m-9 c-9">
                              <InputGroup>
                              <Input
                                isInvalid={errorTakeMoney.money}
                                errorBorderColor="crimson"
                                type="number"
                                placeholder="S??? ti???n b???n mu???n r??t"
                                size="md"
                                name="money"
                                className={styles.input}
                                value={field.money}
                                onChange={(event) => handleInputChange(event)}
                              />
                              </InputGroup>
                            </div>
                            <div className="col l-3 m-3 c-3">
                              <div className={styles.moneyInput}>
                                <h4>{MoneyConverter(field.money)}</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h3 className={styles.notice}>
                          *L??u ??:b???n ch??? c?? th??? r??t v???i s??? ti???n l???n h??n
                          50.000VND
                        </h3>
                      </div>
                    </div>
                    <div className={styles.btnContainer}>
                      <Button className="noneBorder" onClick={onClose}>Quay l???i</Button>
                      <div
                        
                        className={clsx("btnGreen btnGreen4",styles.btnWidth)}
                        onClick={handleSubmit}
                      >
                        R??t ti???n
                      </div>
                    </div>
                  </div>
                </div>
              </div>
   
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TakeMoney;
