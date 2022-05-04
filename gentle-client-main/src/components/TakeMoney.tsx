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
          message: "Mã tài khoản không hợp lệ",
        });
        break;
      case field.accoutName.length < 1:
        setErrorTakeMoney({
          accountBankName: false,
          accountNumber: false,
          accoutName: true,
          money: false,
          message: "Tên người thụ hưởng không hợp lệ",
        });
        break;
      case field.accountBankName.length < 1:
        setErrorTakeMoney({
          accountBankName: true,
          accountNumber: false,
          accoutName: false,
          money: false,
          message: "Vui lòng chọn ngân hàng",
        });
        break;
      case field.money < 50000 || field.money > money:
        setErrorTakeMoney({
          accountBankName: false,
          accountNumber: false,
          accoutName: false,
          money: true,
          message: "Số tiền bạn rút không phù hợp",
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
            title: "Thông báo",
            description:
              "Tạo đơn rút tiền thành công, Số tiền bạn rút sẽ được chuyển vào tài khoản trong thời gian sớm nhất, Cảm ơn bạn đã tham gia ưu đãi của chúng tôi",
          });
          onClose();
        }
        break;
    }
  };

  return (
    <div>
      <div onClick={onOpen} className="btn btn4" style={{border:"none"}}>
        Rút tiền
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
                            Tiền tích trữ:
                            <span className={styles.moneyNumber}>
                              {MoneyConverter(money)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col l-6 m-6 c-12">
                    <h1 className={styles.heading}>Thông tin rút tiền</h1>
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
                          placeholder="Mã tài khoản thụ hưởng"
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
                          placeholder="Tên chủ tài khoản"
                          size="md"
                          value={field.accoutName}
                          name="accoutName"
                          className={styles.input}
                          onChange={(event) => handleInputChange(event)}
                        />
                        <Select
                          isInvalid={errorTakeMoney.accountBankName}
                          errorBorderColor="crimson"
                          placeholder="Tên Ngân Hàng"
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
                                placeholder="Số tiền bạn muốn rút"
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
                          *Lưu ý:bạn chỉ có thể rút với số tiền lớn hơn
                          50.000VND
                        </h3>
                      </div>
                    </div>
                    <div className={styles.btnContainer}>
                      <Button className="noneBorder" onClick={onClose}>Quay lại</Button>
                      <div
                        
                        className={clsx("btnGreen btnGreen4",styles.btnWidth)}
                        onClick={handleSubmit}
                      >
                        Rút tiền
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
