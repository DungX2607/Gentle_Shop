import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../assets/css/pages/admin/takeMoneyField.module.css";
import { Button, Input } from "@chakra-ui/react";
import {
  useAdminGetTakeMoneyFieldsQuery,
  useAdminTakeMoneyFieldCancelMutation,
  useAdminTakeMoneyFieldCompletedMutation,
} from "../../generated/graphql";
import { MoneyConverter } from "../../utils/other/ConvertToMoney";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/reducers/authSlice";
import MySpinner from "../../components/MySpinner";

const takeMoneyField = () => {
  const router = useRouter();

  //CheckIsAdmin
  const { type, isAuthenticated, isLoading } = useSelector(authSelector);
  const [localLoading, setLocalLoading] = useState(true);
  useEffect(() => {
    if (!isLoading && isAuthenticated && type === "admin") {
      setLocalLoading(false);
    } else {
      router.push("/404");
    }
  }, []);

  const { data, error, loading } = useAdminGetTakeMoneyFieldsQuery();
  const [adminHandleTakeMoneyField] = useAdminTakeMoneyFieldCompletedMutation();
  const [cancelTakeMoneyField] = useAdminTakeMoneyFieldCancelMutation()
  const [cancelReason,setCancelReason] = useState("")
  // const [img, setImg] = useState<string>("");
  useEffect(() => {
    if (error) console.log(error);
    console.log(data);
  }, [error, data]);
  //handle
  // const handleImg = async ( event: React.ChangeEvent<HTMLInputElement>) =>{
  //   const file: File = event.target.files![0];
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "imgSuccess");
  //   const result = await axios.post(
  //     "https://api.cloudinary.com/v1_1/perfumeblog/image/upload",
  //     formData
  //   );
  //   setImg(
  //    result.data.secure_url
  //   );
  // }
  const handleSubmit = async (id: number) => {
    const res = await adminHandleTakeMoneyField({
      variables: {
        fieldId: id,
        imageSuccess: "",
      },
    });
    if (res.errors) console.log(res.errors);
    if (res.data?.adminTakeMoneyFieldCompleted.success)
      router.push("/admin/dashboard");
    console.log(res.data?.adminTakeMoneyFieldCompleted);
  };
  const handleCancel = async (id: number) => {
    const res = await cancelTakeMoneyField({
      variables:{
        cancelReason,
        fieldId:id
      }
    })
    if(res.data?.adminTakeMoneyFieldCancel.success){
      router.reload()
    }
    if(!res.data?.adminTakeMoneyFieldCancel.success){
      alert(res.data?.adminTakeMoneyFieldCancel.message)
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="distance">
        <div className="grid wide">
          <div className="row">
            <div className="col l-6 l-o-3 m-12 c-12">
              <div className={styles.container}>
                <h2 className={styles.heading}>User Take Money Field</h2>

                {data?.adminGetTakeMoneyFields.success &&
                  data.adminGetTakeMoneyFields.fields?.map((item) => (
                    <div className={styles.item} key={item.id}>
                      <h3 className={styles.fieldId}>Field ID: {item.id}</h3>
                      <div className={styles.component}>
                        <h2>Tên chủ tài khoản:{item.accoutName}</h2>
                        <h2>Số tài khoản:{item.accountNumber}</h2>
                        <h2>Tên Ngân hàng:{item.accountBankName}</h2>
                        <h2>
                          Số tiền muốn rút:{" "}
                          <span style={{ marginLeft: 12 }}>
                            {" "}
                            {MoneyConverter(item.money)}
                          </span>
                        </h2>
                      </div>
                      <div className={styles.component}>
                        <h2 className={styles.currentMoney}>
                          Số tiền hiện có:{" "}
                          <span style={{ marginLeft: 12 }}>
                            {" "}
                            {MoneyConverter(item.user.moneyCount)}
                          </span>
                        </h2>
                      </div>
                      <div className={styles.controlContainer}>
                        {/* <img src={img} />
                        <input type="file" onChange={handleImg} /> */}
                        <div className={styles.cancelContainer}>
                          <Input value={cancelReason} onChange={e => setCancelReason(e.target.value)} placeholder="Cancel reason"/>
                          <Button
                            colorScheme="red"
                            onClick={() => handleCancel(item.id)}
                          >
                            Hủy
                          </Button>
                        </div>
                        <Button
                          colorScheme="green"
                          onClick={() => handleSubmit(item.id)}
                        >
                          Xác nhận
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {localLoading && <MySpinner />}
    </div>
  );
};

export default takeMoneyField;
