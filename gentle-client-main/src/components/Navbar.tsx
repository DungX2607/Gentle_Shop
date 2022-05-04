import { ChevronDownIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "@chakra-ui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../assets/css/components/navbar.module.css";
import { authSelector } from "../store/reducers/authSlice";
import { localSelector } from "../store/reducers/localSlice";
import { charList } from "../utils/other/constants";
import { ProductBrandProps } from "../utils/type/redux/reduxType";
import Cart from "./Cart";
import { Login } from "./Login";
import MySpinner from "./MySpinner";
import NavbarMenu from "./NavbarMenu";
import SearchProduct from "./SearchProduct";
import {isMobile} from 'react-device-detect';
const Navbar = () => {
  const [userDisplay, setUserDisplay] = useState<ReactNode>(null);

  const { isAuthenticated, userAvatar, isLoading, type } =
    useSelector(authSelector);
  const { brands } = useSelector(localSelector);
  const [brandList, setBrandList] = useState<ProductBrandProps[]>(brands);
  const [brandCharQuery, setBrandCharQuery] = useState("ALL");

  //brandsList

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

  const router = useRouter();

  //Authenticate
  useEffect(() => {
    if (isAuthenticated) {
      setUserDisplay(
        <img
          src={userAvatar}
          onClick={() => {
            switch (type) {
              case "user":
                router.push("/user");
                break;
              case "admin":
                router.push("/admin/dashboard");
                break;
              default:
                break;
            }
          }}
        />
      );
    } else {
      setUserDisplay(<Login />);
    }
  }, [isAuthenticated]);

  if (isLoading) return <MySpinner />;



  return (
    <div>
      {isMobile ? (
        <div className={styles.container}>
          <div>
            <div className="grid wide">
              <div className={styles.navbar}>
                <div className="row">
                  <div className="col c-0">
                    <h1
                      className={styles.appName}
                      onClick={() => {
                        router.push("/");
                      }}
                    >
                      GENTLE
                    </h1>
                  </div>
                  <div className="col c-12">
                    <div className={clsx(styles.userControlMobile)}>
                      {/* Left */}
                      <div className="row">
                        <div className="c-3">
                          <div className={styles.userControlIconContainer}>
                            {userDisplay}
                          </div>
                        </div>

                        <div className="c-6"></div>
                        <div className="c-3">
                          {/* Right */}
                          <div className={styles.cartAndUserControl}>
                            <div
                              className={clsx(
                                styles.cartShopping,
                                styles.cartShoppingIsMobile
                              )}
                            >
                              <Cart />
                            </div>
                            <NavbarMenu />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SearchProduct />
        </div>
      ) : (
        // Desktop
        <div className={styles.container}>
          <div>
            <div className="grid wide">
              <div className={styles.navbar}>
                <div className="row">
                  <div className="col l-3 m-2 c-0">
                    <h1
                      className={styles.appName}
                      onClick={() => {
                        router.push("/");
                      }}
                    >
                      GENTLE
                    </h1>
                  </div>
                  <div className="col l-6 m-8 c-0">
                    <div className={styles.navbarCategory}>
                      <Link href="/">
                        <h3 className={styles.navbarCategoryItem}>Trang chủ</h3>
                      </Link>

                      <div className={styles.categorySelect}>
                        <div
                          className={clsx(
                            styles.navbarCategoryItem,
                            styles.dropdownText
                          )}
                        >
                          thương hiệu
                          <ChevronDownIcon marginLeft={2} />
                        </div>
                        <div className={styles.categoryList}>
                          <div className="row">
                            <div className="col l-12 m-12">
                              <div className={styles.brandsFilter}>
                                {charList.map((item,index) => (
                                  <div
                                    className={clsx(
                                      styles.brandFilterItem,

                                      item === brandCharQuery &&
                                        styles.brandFilterActived
                                    )}
                                    onClick={() => setBrandCharQuery(item)}
                                    key={index}
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className={styles.brandBg}>
                            <div className="row">
                              {brandList.length > 0 ? (
                                <>
                                  {brandList.map((item,index) => (
                                    <div className="col l-3 m-3"  key={index}>
                                      <div
                                        className={styles.categoryItem}
                                       
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

                      <h3 className={styles.navbarCategoryItem}>
                        Về chúng tôi
                      </h3>

                      <h3
                        className={clsx(styles.navbarCategoryItem)}
                        onClick={() => {
                          router.push("/events");
                        }}
                      >
                        sự kiện
                      </h3>
                    </div>
                  </div>

                  <div className="col l-3 m-2 c-12">
                    <div className={styles.userControl}>
                      {/* Cart  */}
                      <div className={styles.cartShopping}>
                        <Cart />
                      </div>
                      {/* UserControl */}
                      <div className={styles.userControlIconContainer}>
                        {userDisplay}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SearchProduct />
        </div>
      )}
    </div>
  );
};

export default Navbar;
