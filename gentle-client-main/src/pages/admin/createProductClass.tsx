import { Button, Input, Select } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../assets/css/pages/admin/createProduct.module.css";
import MySpinner from "../../components/MySpinner";
import {
    useAdminCreateProductClassMutation,
  useAdminCreateProductKindMutation,
  useAdminGetProductKindsQuery,
} from "../../generated/graphql";
import { authSelector } from "../../store/reducers/authSlice";
const CreateProductClass = () => {

  const router = useRouter();

//CheckIsAdmin
const { type, isAuthenticated, isLoading } = useSelector(authSelector);
const [localLoading,setLocalLoading] = useState(true)
useEffect(() => {
 
    if (!isLoading && isAuthenticated && type === "admin") {
    
      setLocalLoading(false)
    } else {
      router.push("/404");
    }

}, []);

  const [adminCreateProductClass] = useAdminCreateProductClassMutation();
  const { data } = useAdminGetProductKindsQuery();
  const [name, setName] = useState("");
  const [id,setId] = useState(1)
console.log(id)
  // handle
  const handleSubmit = async () => {
    const res = await adminCreateProductClass({
      variables: {
        name,
        id
      },
    });
    if (res.errors) alert(res.errors);
    if (res.data?.adminCreateProductClass.code === 400)
      alert(res.data?.adminCreateProductClass.message);
    if (res.data?.adminCreateProductClass.success)
      router.push("/admin/dashboard");
  };
  return (
    <div className="grid wide">
      <div className="row">
        <div className="col l-6 l-o-3 m-12 c-12">
          <div className={styles.containerProductKindAndClass}>
            <h1 className={styles.headingProductKindAndClass}>Product Class</h1>
            <Select  value={id} onChange={event  => setId(+event.target.value)}>
              {data &&
                data.adminGetProductKinds.kinds?.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </Select>
            <Input
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button colorScheme="green" onClick={handleSubmit}>
              Create
            </Button>
          </div>
        </div>
      </div>
      {localLoading && <MySpinner/>}
    </div>
  );
};

export default CreateProductClass;
