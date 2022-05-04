import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../assets/css/pages/moneyInfo.module.css";
import { Button, Select } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
const MoneyInfo = () => {
  return (
    <div>
      <Navbar />
      <div className="distance">
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <div className={styles.moneyInfoContainer}>
                <h1 className={styles.heading}>Thông tin Tiền tích trữ</h1>
                <div className={styles.body}>
                  <Select placeholder="Trạng thái" className={styles.input}>
                    <option value="option2">Nhận tiền</option>
                    <option value="option3">Đang xử lý</option>
                    <option value="option1">Thành công</option>
                  </Select>
                  <div className={styles.tableInfoContainer}>
                    <TableContainer>
                      <Table variant="simple" className={styles.table}>
                        <TableCaption>
                          Thông tin tiền bạn tích trữ được
                        </TableCaption>
                        <Thead>
                          <Tr>
                            <Th>Ngày</Th>
                            <Th>Số tiền</Th>
                            <Th>Nội dung</Th>
                            <Th>Trạng thái</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td>25.4</Td>
                            <Td>25.4</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </div>
                 
                </div>
                <div className={styles.btnLogout}>
                      <Button>Quay về</Button>
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

export default MoneyInfo;
