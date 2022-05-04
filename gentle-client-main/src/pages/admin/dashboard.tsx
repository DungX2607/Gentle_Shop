import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../assets/css/pages/admin/dashboard.module.css";
import { Button, Divider } from "@chakra-ui/react";

import {
  useAdminDashboardLazyQuery,
  useAdminDashboardQuery,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import { BillStatusType } from "../../utils/type/BillStatusType";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/reducers/authSlice";
import Link from "next/link";
import MySpinner from "../../components/MySpinner";

const dashboard = () => {
  // useCheckAdmin();

  const [adminDashboard, { data, loading, error }] =
    useAdminDashboardLazyQuery();
  const [localLoading,setLocalLoading] = useState(true)
  const router = useRouter();
  const { type, isAuthenticated, isLoading } = useSelector(authSelector);

  useEffect(() => {
    const query = async () => {
      if (!isLoading && isAuthenticated && type === "admin") {
        await adminDashboard();
        setLocalLoading(false)
      } else {
        router.push("/404");
      }
    };
    query();
  }, []);

  const handleBillStatus = (type: BillStatusType) => {
    router.push({
      pathname: "/admin/billDetail",
      query: { type },
    });
  };
  return (
    <div>
      <Navbar />
      <div className="distance">
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <div className={styles.item}>
                <h2>Quản lý người dùng</h2>
                <div className={styles.controlContainer}>
                  <div className={styles.btnContainer}>
                    <Button
                      className={styles.btn}
                      onClick={() => router.push("/admin/takeMoneyField")}
                    >
                      Xem Yêu cầu rút tiền
                    </Button>
                    {data?.dashboard.takeMoneyField! > 0 ? (
                      <div>{data?.dashboard.takeMoneyField}</div>
                    ) : (
                      <span></span>
                    )}
                  </div>

                  <Button className={styles.btn}>Xem kho tiền</Button>
                  <Button className={styles.btn}>Xem người dùng</Button>
                  <Button className={styles.btn}>Xem Người dùng bị chặn</Button>
                  <Button className={styles.btn}>Tìm kiếm người dùng</Button>
                </div>
              </div>
              <div className={styles.item}>
                <h2>Quản lý đơn hàng</h2>
                <div className={styles.controlContainer}>
                  <Button className={styles.btn}>Yêu cầu hủy đơn</Button>

                  {/* Btn  */}
                  <div className={styles.btnContainer}>
                    <Button
                      className={styles.btn}
                      onClick={() => {
                        handleBillStatus(BillStatusType.COMFIRM_WAITING);
                      }}
                    >
                      Chờ xác nhận
                    </Button>
                    {data?.dashboard.confirmWaiting! > 0 ? (
                      <div>{data?.dashboard.confirmWaiting}</div>
                    ) : (
                      <span></span>
                    )}
                  </div>

                  <div
                    className={styles.btnContainer}
                    onClick={() => {
                      handleBillStatus(BillStatusType.CONFIRMED);
                    }}
                  >
                    <Button className={styles.btn}>
                      {BillStatusType.CONFIRMED}
                    </Button>
                    {data?.dashboard.confirmed! > 0 ? (
                      <div>{data?.dashboard.confirmed}</div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className={styles.btnContainer}>
                    <Button
                      className={styles.btn}
                      onClick={() => {
                        handleBillStatus(BillStatusType.PACKED);
                      }}
                    >
                      {BillStatusType.PACKED}
                    </Button>
                    {data?.dashboard.packed! > 0 ? (
                      <div>{data?.dashboard.packed}</div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div
                    className={styles.btnContainer}
                    onClick={() => {
                      handleBillStatus(BillStatusType.DELIVERING);
                    }}
                  >
                    <Button className={styles.btn}>
                      {BillStatusType.DELIVERING}
                    </Button>
                    {data?.dashboard.delivering! > 0 ? (
                      <div>{data?.dashboard.delivering}</div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <Button className={styles.btn}>Tìm kiếm đơn hàng</Button>
                </div>
              </div>

              <div className={styles.item}>
                <h2>Bình luận</h2>
                <div className={styles.btnContainerLast}>
                  <Button
                    className={styles.btn}
                    onClick={() => router.push("/admin/comments")}
                  >
                    Bình luận chưa rep
                  </Button>
                  {data?.dashboard.commentNoFeedback! > 0 ? (
                    <div>{data?.dashboard.commentNoFeedback}</div>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
              <div className={styles.item}>
                <h2>Sự kiện</h2>
                <div className={styles.controlContainer}>
                  <Link href="/admin/createEvent">
                    <Button className={styles.btn}>Thêm sự kiện</Button>
                  </Link>
                </div>
              </div>
              <div className={styles.item}>
                <h2>Thương hiệu</h2>
                <div className={styles.controlContainer}>
                  <Link href="/admin/createBrand">
                    <Button className={styles.btn}>Thêm thương hiệu</Button>
                  </Link>
                </div>
                <div className={styles.controlContainer}>
                  <Link href="/admin/createBrand">
                    <Button className={styles.btn}>Thêm Class vào Thương hiệu</Button>
                  </Link>
                </div>
              </div>
              <div className={styles.item}>
                <h2>Sản phẩm</h2>
                <div className={styles.controlContainer}>
                  <Link href="/admin/createProduct">
                    <Button className={styles.btn}>Thêm sản phẩm</Button>
                  </Link>
                  <Link href="/admin/createProductKind">
                    <Button className={styles.btn}>Thêm ProductKind</Button>
                  </Link>
                  <Link href="/admin/createProductClass">
                    <Button className={styles.btn}>Thêm ProductClass</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {localLoading && <MySpinner/>}
    </div>
  );
};

export default dashboard;
