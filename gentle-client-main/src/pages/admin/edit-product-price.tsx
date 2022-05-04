import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../assets/css/pages/admin/createProduct.module.css";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { PriceFieldsProps } from "./createProduct";
import { v4 as uuidv4 } from "uuid";
import {
  GetProductDocument,
  PriceInput,
  useAdminCreateOrEditPriceMutation,
} from "../../generated/graphql";
import { useSelector } from "react-redux";
import { localSelector } from "../../store/reducers/localSlice";
import { useRouter } from "next/router";
import { authSelector } from "../../store/reducers/authSlice";
import MySpinner from "../../components/MySpinner";

const EditProductPrice = () => {

  const router = useRouter()

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

  const { editProductPriceProps } = useSelector(localSelector);
  const [priceFields, setPriceFields] = useState<PriceFieldsProps[]>(
    []
  );

  useEffect(() =>{
    if(editProductPriceProps?.priceFieldProps){
      const listTemp = editProductPriceProps.priceFieldProps.map(item => item)
      setPriceFields(listTemp)
    }
  },[editProductPriceProps])

  const [adminCreateOrEditPrice] = useAdminCreateOrEditPriceMutation();
  const handleAddFields = () => {
    setPriceFields([
      ...priceFields,
      { id: uuidv4(), type: "", price: 0, status: 1 },
    ]);
  };

  const handleRemoveFields = (id: string) => {
    const values = [...priceFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setPriceFields(values);
  };
  const handleEditOrCreateNewFields = async (id: string, index: number) => {
    const values: PriceFieldsProps[] = [...priceFields];
    const item = values[index];
    const priceInput: PriceInput = {
      type: item.type,
      status: item.status,
      price: item.price,
    };
    let realId = +id;
    if (realId) {
      //Edit price
      const res = await adminCreateOrEditPrice({
        variables: {
          priceInput,
          priceId: realId,
          productId: editProductPriceProps!.productId,
        },
      });
      if (res.errors) alert(JSON.stringify(res.errors));
      if (res.data?.adminCreateOrEditPrice.success)
        alert(JSON.stringify(res.data.adminCreateOrEditPrice));
    } else {
      //Create new price
      const res = await adminCreateOrEditPrice({
        variables: {
          priceInput,
          priceId: -1,
          productId: editProductPriceProps!.productId,
        },
        update(cache, { data }) {
        

          const productData = cache.readQuery({ query: GetProductDocument });
      

          // if (data?.login.success) {
          //   cache.writeQuery<MeQuery>({
          //     query: MeDocument,
          //     data: { me: data.login.user }
          //   })
          // }
        },
      });
      if (res.errors) alert(JSON.stringify(res.errors));
      if (res.data?.adminCreateOrEditPrice.success)
        alert(JSON.stringify(res.data.adminCreateOrEditPrice));
    }
  };

  const onFieldChange = (
    id?: string,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newPriceFields = priceFields.map((field) => {
      if (field.id === id) {
        switch (event!.target.name) {
          case "type":
            return{...field,type:event!.target.value}
            // field.type = event!.target.value;
            // break;

          case "price":
            return{...field,price:+event!.target.value}
            // const price = +event!.target.value;
            // field.price = price;
            // break;
          case "status":
            return{...field,status:+event!.target.value}
            // const status = +event!.target.value;
            // field.status = status;
            // break;
          default:
            return field
        }
      }
      return field;
    });
    
    setPriceFields(newPriceFields);
  };
  return (
    <>
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12">
            <div>
              <div className={styles.namePriceHeader}>
                <h2>Type</h2>
                <h2>Price</h2>
                <h3>Status</h3>
                <h3> </h3>
              </div>
              {priceFields.map((field, index) => (
                <div key={field.id}>
                  <div className={styles.priceItem}>
                    <div className={styles.inputContainer}>
                      <Input
                        name="type"
                        value={field.type!}
                        placeholder="Type"
                        className={styles.inputPrice}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          onFieldChange(field.id, event);
                        }}
                      />

                      <Input
                        name="price"
                        value={field.price!}
                        placeholder="Price"
                        className={styles.inputPrice}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          onFieldChange(field.id, event);
                        }}
                      />

                      <Input
                        name="status"
                        value={field.status!}
                        placeholder="Status"
                        className={styles.inputPrice}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          onFieldChange(field.id, event);
                        }}
                      />
                      <Button
                        colorScheme="green"
                        onClick={() =>
                          handleEditOrCreateNewFields(field.id!, index)
                        }
                      >
                        Thêm hoặc sửa
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.buttonContainer}>
                <Button colorScheme="green" onClick={handleAddFields}>
                  Add New Type
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {localLoading && <MySpinner/>}
    </>
  );
};

export default EditProductPrice;
