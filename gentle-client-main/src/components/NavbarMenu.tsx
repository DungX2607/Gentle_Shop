import { AddIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../assets/css/pages/navbarBrand.module.css";
import { localSelector } from "../store/reducers/localSlice";
import { charList } from "../utils/other/constants";
import { ProductBrandProps } from "../utils/type/redux/reduxType";

const NavbarMenu = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const { brands } = useSelector(localSelector);
  const [brandList, setBrandList] = useState<ProductBrandProps[]>(brands);
  const [brandCharQuery, setBrandCharQuery] = useState("ALL");

  useEffect(() => {
    if (brandCharQuery !== "ALL") {
      let tempList: ProductBrandProps[] = brands.filter((item) =>
        item.name.startsWith(brandCharQuery)
      );

      setBrandList(tempList);
    } else {
      setBrandList(brands);
    }
  }, [brandCharQuery,brands]);
  return (
    <>
      {" "}
      <div className={styles.barIcon}>
        <FontAwesomeIcon icon={faBars} onClick={onOpen} />
      </div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerContent>
          <DrawerCloseButton className="noneBorder" />
          <DrawerHeader>MENU</DrawerHeader>

          <DrawerBody>
            <div >
              <div
                className={clsx(
                  styles.navbarMenuItem,
                  styles.navbarMenuBrandText
                )}
                onClick={onModalOpen}
              >
                <AddIcon marginRight={2} />
                <h3>thương hiệu</h3>
              </div>

              <div className={styles.navbarMenuItem}>
                <h3>Về chúng tôi</h3>
              </div>
              <div
                className={clsx(styles.navbarMenuItem, styles.eventForMobile)}
              >
                <h3>ưu đãi </h3>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={isModalOpen} onClose={onModalClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton className="noneBorder" />
          <ModalHeader textAlign="center">THƯƠNG HIỆU</ModalHeader>
          <ModalBody className={styles.modalBrands}>
            <>
              <div >
                <div className={styles.brandsFilter}>
                {charList.map((item,index) => (
                  <div
                    className={clsx(
                      styles.brandFilterItem,

                      item === brandCharQuery && styles.brandFilterActived
                    )}
                    onClick={() => setBrandCharQuery(item)}
                    key={index}
                  >
                    {item}
                  </div>
                ))}
                </div>
                <div className={styles.brandBg}>
                
                   <div className={styles.brandResult}>
                   <div className="row">
                   
                    {brandList.length > 0 ? (
                      <>
                        {brandList.map((item,index) => (
                        
                            <div className="col c-6" key={item.id}>
                              <div
                              className={styles.categoryItem}
                              key={index}
                              onClick={() => {
                                router.push({
                                  pathname: `/brand/${item.id}`,
                                  query: { brandId: item.id },
                                });
                              }}
                            >
                              {item.name}
                            </div>
                            </div>
                       
                        ))}
                      </>
                    ) : (
                      <h2 className={styles.noBrandsQuery}>
                        Không có kết quả phù hợp.
                      </h2>
                    )}
                  
                    </div>
                   </div>
             
                </div>
              </div>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NavbarMenu;
