import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "../assets/css/components/addSample.module.css";
import { BillProductInput, useGetGiftsLazyQuery } from "../generated/graphql";

import MySpinner from "./MySpinner";

interface AddSampleProps {
  priceCondition: number;
  callback: Function;
  index:number
}
const AddSample = ({ priceCondition, index,callback }: AddSampleProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [giftsQuery, { data, loading, error }] = useGetGiftsLazyQuery();
  const router = useRouter()
  useEffect(() => {
    if (isOpen && priceCondition > 0) {
      giftsQuery({
        variables: {
          priceCondition,
        },
      });
    }
  }, [isOpen]);
  useEffect(() =>{
    if(!priceCondition)
    router.push("/")
  },[])
  if(loading) return <MySpinner/>
  return (
    <div className={styles.addSampleContainer}>
      <p className={styles.textChangeProduct} onClick={onOpen}>
        Đổi sản phẩm
      </p>
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalContent>
          <ModalHeader style={{ textAlign: "center" }}>
            Chọn 1 sản phẩm bên dưới
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid wide">
              <div className="row">
                {data?.getGifts.success &&
                  data.getGifts.gifts?.map((item) => (
                    <div className="col l-3 m-4 c-6" key={Math.random()}>
                      <div className={styles.productList}>
                        <div className={styles.productItem}>
                          <img
                            src={item.product.thumbnail}
                            alt=""
                          />
                          <h2 className={styles.productName}>{item.product.productName}</h2>

                          <Button
                            colorScheme="green"
                            className={styles.btnComfirm}
                            onClick={() => {
                              const productChanged: BillProductInput = {
                                productName: item.product.productName,
                                productType: "gift",
                                productPrice: 0,
                                productAmount: 1,
                                productThumbnail: item.product.thumbnail,
                              };
                              callback(productChanged,index);
                              onClose()
                            }}
                          >
                            Chọn
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </ModalBody>
          <div className={styles.loadMoreContainer}>
            <Button colorScheme="facebook">Load More</Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddSample;
