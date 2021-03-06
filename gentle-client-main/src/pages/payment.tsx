import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Textarea,
  Button,
  Badge,
  Radio,
  useToast,
} from "@chakra-ui/react";
import React, { ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../assets/css/pages/payment.module.css";

import AddSample from "../components/AddSample";
import { useRouter } from "next/router";

import {
  BillInput,
  BillProductInput,
  CustomerInput,
  Price,
  ProductInput,
  useCheckIntroduceCodeLazyQuery,
  useCreateBillMutation,
  useGetGiftLazyQuery,
} from "../generated/graphql";


import { MoneyConverter } from "../utils/other/ConvertToMoney";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../store/reducers/authSlice";
import { localSelector, setCountProps } from "../store/reducers/localSlice";
import clsx from "clsx";
import Footer from "../components/Footer";

import MyErrorMessage from "../components/MyErrorMessage";

export interface PaymentProps {
  listCart: BillProductInput[];
  totalPrice: number;
}

interface ErrorProps {
  customerName: boolean;
  message: string;
  customerPhone: boolean;
  city:boolean;
  province:boolean;
  address: boolean;
}
interface IntroduceCodeResponse{
  type:string,
  message:string
}

const Payment = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);
  const {paymentProps} = useSelector(localSelector)
  const [inputInValid, setInputInValid] = useState<ErrorProps>({
    customerName: false,
    message: "",
    customerPhone: false,
    city:false,
    province:false,
    address: false,
  });
  const [paymentSubmit] = useCreateBillMutation();
  const [introduceCodeResponse,setIntroduceCodeResponse] = useState<IntroduceCodeResponse>({
    type:"",
    message:""
  })
  //customer
  const [customer, setCustomer] = useState<CustomerInput>({
    customerName: "",
    customerPhone: "",
    city: "",
    province: "",
    address: "",
  });
  const [notice, setNotice] = useState("");
  const [typePayment, setTypePayment] = useState("");

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNotice(event.target.value);
  };

  const handleCustomerInPutChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if(inputInValid.customerName || inputInValid.customerPhone || inputInValid.address || inputInValid.city || inputInValid.province){
      setInputInValid({
        customerName:false,
        customerPhone:false,
        address:false,
        city:false,
        province:false,
        message:""
      })
    }
    switch (event.target.name) {
      case "customerName":
        setCustomer({ ...customer, customerName: event.target.value });
        break;
      case "customerPhone":
        setCustomer({ ...customer, customerPhone: event.target.value });
        break;
      case "address":
        setCustomer({ ...customer, address: event.target.value });
        break;

      default:
        break;
    }
  };
  const handleCustomerSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if(inputInValid.customerName || inputInValid.customerPhone || inputInValid.address || inputInValid.city || inputInValid.province){
      setInputInValid({
        customerName:false,
        customerPhone:false,
        address:false,
        city:false,
        province:false,
        message:""
      })
    }
    switch (event.target.name) {
      case "city":
        setCustomer({ ...customer, city: event.target.value });
        break;
      case "province":
        setCustomer({ ...customer, province: event.target.value });
        break;

      default:
        break;
    }
  };

  //discount
  const [discountInput, setDiscountInput] = useState<number>();
  //price
  const [totalPriceOfProduct, setTotalPriceOfProduct] = useState(0);
  const [priceDelivery, setPriceDelivery] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //callApi
  const [giftQuery, { data, loading, error }] = useGetGiftLazyQuery();
  const [checkIntroduceCode] = useCheckIntroduceCodeLazyQuery();

  const [product, setProduct] = useState<BillProductInput[]>([]);

  //Introduce Code
  const handleIntroduceCode = async () => {
    const { data,error } = await checkIntroduceCode({
      variables: {
        introduceCode: discountInput!,
        totalPrice,
      },
    });
    if (data?.checkIntroduceCode.success) {
      setPriceDiscount(data.checkIntroduceCode.introducePrice!);
      setIntroduceCodeResponse({
        type:"success",
        message:data.checkIntroduceCode.message!
      })
    } else if (error) {
      setPriceDiscount(0);
      alert(error.message);
    }else if(data?.checkIntroduceCode.code===400){
      setIntroduceCodeResponse({
        type:"error",
        message:data.checkIntroduceCode.message!
      })
    }
  };
  //totalPrice
  useEffect(() => {
    setTotalPrice(totalPriceOfProduct - priceDiscount + priceDelivery);
  }, [totalPriceOfProduct, priceDelivery, priceDiscount]);

  //Check if props not found
  useEffect(() => {
    if (!paymentProps) {
      router.push("/");
    } else {
      //check paymentProps
      if (paymentProps?.totalPrice! > 5000000) {
        setTypePayment("Chuy???n kho???n tr?????c");
        toast({
          title: "Th??ng b??o ",
          description:
            "V???i ????n h??ng tr??n 5.000.000??, qu?? kh??ch vui l??ng chuy???n kho???n tr?????c t???i thi???u 5% ho???c 10% v???i ????n h??ng tr??n 10.000.000?? ????? x??c nh???n ????n h??ng,Ch??n th??nh C???m ??n qu?? kh??ch ???? ?????c th??ng tin n??y!",
          status: "info",
          duration: 5000,
          position: "top",

          isClosable: true,
        });
      } else setTypePayment("Thanh to??n t???t c??? khi nh???n h??ng");

      //query to get gift
      // giftQuery({
      //   variables: {
      //     priceCondition: paymentProps.totalPrice,
      //   },
      // });
      setProduct(paymentProps.listCart);
      setTotalPriceOfProduct(
        paymentProps!.listCart.reduce(
          (prev, current) =>
            prev + current.productPrice * current.productAmount,
          0
        )
      );
      if (paymentProps.totalPrice > 1000000) setPriceDelivery(0);
      else setPriceDelivery(25000);
    }
  }, []);

  //Set gift
  // useEffect(() => {
  //   if (data?.getGift.success) {
  //     const listProductTemp: BillProductInput[] = product.map((item) => item);

  //     data.getGift.gifts?.map((gift) => {
  //       const item: BillProductInput = {
  //         productName: gift.product.productName!,
  //         productThumbnail: gift.product.thumbnail!,
  //         productType: "gift",
  //         productAmount: 1,
  //         productPrice: 0,
  //       };

  //       listProductTemp.unshift(item);
  //     });
  //     setProduct(listProductTemp);
  //   }
  // }, [data]);

  //callback from AddSample
  const callbackFromAddSample = (item: BillProductInput, index: number) => {
    // let listProductTemp: BillProductInput[] = product.map((item) => item);
    // listProductTemp.splice(index, 1, item);
    // setProduct(listProductTemp);
  };

  //Submit
  const handleSubmit = async () => {
    switch (true) {
      case customer.customerName.trim().length < 1:
        setInputInValid({
          customerName: true,
          customerPhone: false,
          address: false,
          city:false,
          province:false,
          message:"Vui l??ng ??i???n ?????y ????? t??n kh??ch h??ng"
        });
        break;
      case customer.customerPhone.trim().length < 9:
        setInputInValid({
          customerName: false,
          customerPhone: true,
          address: false,
          city:false,
          province:false,
          message:"Vui l??ng ??i???n ?????y ????? s??? ??i???n tho???i"
        });
        break;
      case customer.address.trim().length < 1:
        setInputInValid({
          customerName: false,
          customerPhone: false,
          address: true,
          city:false,
          province:false,
          message:"Vui l??ng ??i???n ?????y ????? ?????a ch???"
        });
        break;
        case customer.city.trim().length < 1:
        setInputInValid({
          customerName: false,
          customerPhone: false,
          address: false,
          city:true,
          province:false,
          message:"Vui l??ng ch???n t???nh ho???c th??nh ph???"
        });
        break;
        case customer.province.trim().length < 1:
        setInputInValid({
          customerName: false,
          customerPhone: false,
          address: false,
          city:false,
          province:true,
          message:"Vui l??ng ch???n huy???n ho???c th??? x??"
        });
        break;
      default:
        let billInput: BillInput = {
          customer,
          products: product,
          deliveryPrice: priceDelivery,
          paymentType: typePayment,
        };
        if (notice) billInput.notice = notice;
        if (discountInput && priceDiscount > 0)
          billInput.introduceCode = discountInput;
        billInput;
        const res = await paymentSubmit({
          variables: {
            billInput: billInput,
          },
          onError: (err) => {
            console.log(console.log(JSON.stringify(err, null, 2)));
          },
        });
        if (res.data?.createBill.code === 400) {
          alert(res.data.createBill.message);
        }
        if (res.data?.createBill.success) {
          router.push("/success");
          // dispatch(setCountProps(0));
          // if (typeof window !== undefined) {
          //   localStorage.removeItem("localBillProducts");
          //   localStorage.removeItem("cartCount");
          // }
        }
   
        break;
    }
  };

  return (
    <div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12">
            <div className={styles.paymentContainer}>
              <h1>Memories</h1>
              <div className="row">
                <div className="col l-6 m-6 c-12">
                  <div className={styles.userInfo}>
                    <h2>Th??ng tin ng?????i nh???n</h2>

                    {!isAuthenticated && (
                      <p>
                        ????ng nh???p ????? nh???n nhi???u ??u ????i h??n
                        <span className={styles.login}>????ng nh???p</span>
                      </p>
                    )}
                    {inputInValid.message!=="" && <MyErrorMessage type="error" message={inputInValid.message} />}
                    <InputGroup>
                      <Input
                        isInvalid={inputInValid.customerName}
                        errorBorderColor="crimson"
                        type="tel"
                        placeholder="H??? v?? t??n"
                        focusBorderColor="black"
                        className="boxShadowNone"
                        value={customer?.customerName}
                        name="customerName"
                        onChange={(event) => handleCustomerInPutChange(event)}
                      />
                    </InputGroup>
                    <InputGroup>
                      <Input
                        isInvalid={inputInValid.customerPhone}
                        errorBorderColor="crimson"
                        type="number"
                        value={customer?.customerPhone}
                        name="customerPhone"
                        onChange={(event) => handleCustomerInPutChange(event)}
                        placeholder="S??? ??i???n tho???i"
                        focusBorderColor="black"
                        className="boxShadowNone"
                      />
                    </InputGroup>
                    <InputGroup>
                      <Input
                        isInvalid={inputInValid.address}
                        errorBorderColor="crimson"
                        type="tel"
                        placeholder="?????a ch???"
                        focusBorderColor="black"
                        name="address"
                        className="boxShadowNone"
                        value={customer?.address}
                        onChange={(event) => handleCustomerInPutChange(event)}
                      />
                    </InputGroup>
                    <Select
                    isInvalid={inputInValid.city}
                  
                        errorBorderColor="crimson"
                      value={customer?.city}
                      name="city"
                      placeholder="T???nh th??nh"
                      focusBorderColor="black"
                      className="boxShadowNone"
                      onChange={(event) => handleCustomerSelectChange(event)}
                    >
                      <option value="TPHCM">TPHCM</option>
                      <option value="B??nh D????ng">B??nh D????ng</option>
                      <option value="H?? N???i">H?? N???i</option>
                    </Select>
                    <Select
                    isInvalid={inputInValid.province}
                    errorBorderColor="crimson"
                      onChange={(event) => handleCustomerSelectChange(event)}
                      name="province"
                      placeholder="Qu???n huy???n"
                      focusBorderColor="black"
                      className="boxShadowNone"
                    >
                      <option value="TPHCM">TPHCM</option>
                      <option value="B??nh D????ng">B??nh D????ng</option>
                      <option value="H?? N???i">H?? N???i</option>
                    </Select>
                    <InputGroup>
                      <Textarea
                        className="boxShadowNone"
                        placeholder="Ghi ch??"
                        focusBorderColor="black"
                        value={notice}
                        name="notice"
                        onChange={(event) => handleTextAreaChange(event)}
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="col l-6 m-6 c-12">
                  <div className={styles.orderContainer}>
                    <div className={styles.orderInfo}>
                      <h2>????n h??ng</h2>
                      {product.map((item, index) => {
                        if (item.productType === "gift") {
                          return (
                            <div className={styles.productItem} key={index}>
                              <div className={styles.productInfo}>
                                <img src={item.productThumbnail} />
                                <div className={styles.productNameAndType}>
                                  <h3>{item.productName}</h3>
                                  <p>Chai 2ml</p>
                                  <p>SL:1</p>
                                </div>
                              </div>
                              <div className={styles.productPrice}>
                                <Badge variant="solid" colorScheme="red">
                                  Qu?? t???ng
                                </Badge>
                                <AddSample
                                  index={index}
                                  priceCondition={paymentProps?.totalPrice!}
                                  callback={callbackFromAddSample}
                                />
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div className={styles.productItem} key={index}>
                              <div className={styles.productInfo}>
                                <img src={item.productThumbnail} />
                                <div className={styles.productNameAndType}>
                                  <h3>{item.productName}</h3>
                                  <p>{item.productType}</p>
                                  <p>SL:{item.productAmount}</p>
                                </div>
                              </div>
                              <div className={styles.productPrice}>
                                <h4>{MoneyConverter(item.productPrice)}</h4>
                              </div>
                            </div>
                          );
                        }
                      })}
                      <div className={styles.discountContainer}>
                        {introduceCodeResponse.type!=="" && <MyErrorMessage type={introduceCodeResponse.type} message={introduceCodeResponse.message} />}
                        <InputGroup>
                          <Input
                            type="number"
                            placeholder="M?? gi???m gi??"
                            focusBorderColor="black"
                            value={discountInput}
                            disabled={introduceCodeResponse.type==="success"}
                            onChange={(event) =>
                              {
                                setDiscountInput(event.target.valueAsNumber)
                                setIntroduceCodeResponse({
                                  type:"",
                                  message:""
                                })
                              }
                            }
                          />
                          <Button
                            className="noneBorder"
                            onClick={handleIntroduceCode}
                            disabled={introduceCodeResponse.type==="success"}
                          >
                            ??p d???ng
                          </Button>
                        </InputGroup>
                      </div>
                      <div className={styles.totalPriceContainer}>
                        <div className={styles.totalPriceItem}>
                          <p className={styles.itemName}>T???m t??nh:</p>
                          <p>{MoneyConverter(totalPriceOfProduct)}</p>
                        </div>
                        <div className={styles.totalPriceItem}>
                          <p className={styles.itemName}>Ph?? v???n chuy???n:</p>
                          {priceDelivery === 0 ? (
                            <p>Mi???n ph??</p>
                          ) : (
                            <p>{MoneyConverter(priceDelivery)}</p>
                          )}
                        </div>
                        <div className={styles.totalPriceItemLastChild}>
                          <p className={styles.itemName}>Gi???m gi??</p>
                          <p>{MoneyConverter(priceDiscount)}</p>
                        </div>
                        <div className={styles.total}>
                          <p>T???ng c???ng:</p>
                          <h3>{MoneyConverter(totalPrice)}</h3>
                        </div>
                      </div>
                    </div>

                    <div className={styles.typePaymentContainer}>
                      <h3 className={styles.typePaymentHeading}>
                        H??nh th???c thanh to??n
                      </h3>
                      <div className={styles.typePaymentBody}>
                        <div
                          className={clsx(
                            styles.typePaymentItem,
                            paymentProps?.totalPrice! > 5000000 &&
                              styles.disabled
                          )}
                        >
                          <input
                            type="radio"
                            value={typePayment}
                            onChange={() =>
                              setTypePayment("Thanh to??n t???t c??? khi nh???n h??ng")
                            }
                            checked={
                              typePayment == "Thanh to??n t???t c??? khi nh???n h??ng"
                            }
                            className={styles.typePaymentInput}
                            disabled={paymentProps?.totalPrice! > 5000000}
                          />
                          Thanh to??n t???t c??? khi nh???n h??ng
                          <p className={styles.typePaymentNotice}>
                            1-2 ng??y v???i ????n h??ng t???i H??? Ch?? Minh v?? B??nh D????ng,
                            3-5 ng??y v???i ????n h??ng ??? c??c t???nh v?? th??nh ph??? kh??c
                          </p>
                        </div>
                        <div className={clsx(styles.typePaymentItem)}>
                          <input
                            type="radio"
                            value={typePayment}
                            onChange={() =>
                              setTypePayment("Chuy???n kho???n tr?????c")
                            }
                            checked={typePayment == "Chuy???n kho???n tr?????c"}
                            className={styles.typePaymentInput}
                          />
                          Chuy???n kho???n tr?????c
                          <p className={styles.typePaymentNotice}>
                            T???i thi???u 5% v???i ????n h??ng tr??n 5.000.000?? ho???c 10%
                            v???i ????n h??ng tr??n 10.000.000??
                          </p>
                          <div className={styles.infoBank}>
                            <p>*Vietcombank - TRAN PHUOC LOC - 0774917635</p>
                            <p>
                              *N???i dung chuy???n kho???n:T??n ng?????i nh???n h??ng, S???
                              ??i???n tho???i ng?????i nh???n
                            </p>
                            <p>*V?? d???:L???c, 0774917635</p>
                            <p>*Li??n h??? v???i admin ????? gi???i ????p m???i th???c m???c</p>
                            <h4 className={styles.thanksClient}>
                              Ch??n th??nh c???m ??n qu?? kh??ch ???? ?????c n???i dung n??y!
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.orderButtonControl}>
                      <div className={styles.backToCartContainer}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <p>QUAY V???</p>
                      </div>
                      <button
                        
                        className="btn btn4"
                        onClick={handleSubmit}
                      >
                        ?????t h??ng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
