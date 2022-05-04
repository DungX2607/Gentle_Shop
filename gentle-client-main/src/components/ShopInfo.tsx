import {
  Button,
  Checkbox,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../assets/css/components/shopInfo.module.css";
import { useChangeIsHiddenMutation, useGetPaginationUsersQuery, useGetProductPaidAmountQuery } from "../generated/graphql";
import { authSelector, setIsHidden } from "../store/reducers/authSlice";
import LocalLoading from "./LocalLoading";

const ShopInfo = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data, loading, fetchMore } = useGetPaginationUsersQuery({
    variables: {
      skip: 0,
    },
  });
  const {isAuthenticated,isHidden} = useSelector(authSelector)
  

  useEffect(() =>{
   
  },[isHidden])
  const [localLoading,setLocalLoading] = useState(false)
  const {data:productPaidCount} = useGetProductPaidAmountQuery()
  const [changeIsHidden] = useChangeIsHiddenMutation()
 
  const handleFetchMore = () => {
    fetchMore({
      variables: {
        skip: data?.getPaginationUsers.cursor,
      },
    });
  };
  const handleIsHiddenChange = async (value:boolean) =>{
    setLocalLoading(true)
    if(isAuthenticated){

      dispatch(setIsHidden(value))
      const res = await changeIsHidden({
        variables:{
          value
        }
      })
     
      if(res.errors) console.log(res.errors)
      if(res.data?.changeIsHidden.success) router.reload()
      if(!res.data?.changeIsHidden.success) alert(res.data?.changeIsHidden.message)
      setLocalLoading(false)
    }else{
      setLocalLoading(false)
    }
  }

  return (
    <div className={styles.shopInfoContainer}>
      <div className={styles.heading}>gentle</div>
      <div className={styles.body}>
        <div className={styles.createdAt}>
          <h2>Ngày thành lập:12/3/2022</h2>
        </div>
       
        <div className={styles.statistics}>
        {data?.getPaginationUsers.success && (
                  <div className={styles.userPaidContainer}>
                    <h2 className={styles.totalProductPaid}>
                      Sản phẩm đã bán:{productPaidCount?.getProductPaidAmount}
                    </h2>
                    <div className={styles.userList}>
                      <h3 className={styles.textSampleUserPaid}>
                        Khách hàng đã mua
                      </h3>
                      <div className={styles.hideUserContainer}>
                        <h4>Ẩn tôi trong dach sách</h4>
                        <Checkbox
                          defaultChecked={isHidden}
                          onChange={e => handleIsHiddenChange(e.target.checked)}
                          size="md"
                          colorScheme="green"
                          className={styles.checkBoxHideUser}
                         
                        ></Checkbox>
                        {isHidden  && <h4>Đã ẩn</h4>}
                      </div>
                      {data.getPaginationUsers.users?.map((item) => (
                          <div className={styles.userItem} key={Math.random()}>
                            <img src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.6435-1/188003145_318861596508649_642500579152781477_n.jpg?stp=dst-jpg_p160x160&_nc_cat=101&ccb=1-5&_nc_sid=7206a8&_nc_ohc=RyZBZjkdD70AX_hsIRZ&_nc_ht=scontent-sin6-4.xx&oh=00_AT936vFRwStLLLOk0dSL28foRPGMOIsFO6JKZ-btuFL7lA&oe=62688297" />
                            <h3>{item.userName}</h3>
                          </div>
                        ))}
                    </div>
                    <div className={styles.statisticsFooter}>
                    <Button className="noneBorder" onClick={handleFetchMore} disabled={!data.getPaginationUsers.hasMore} isLoading={loading}>Xem thêm</Button>
                    </div>
                  </div>
                  
                )}
        </div>
      </div>
      {localLoading && <LocalLoading/>}
    </div>
  );
};

export default ShopInfo;

// <div className={styles.userItem}>
// <img src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.6435-1/188003145_318861596508649_642500579152781477_n.jpg?stp=dst-jpg_p160x160&_nc_cat=101&ccb=1-5&_nc_sid=7206a8&_nc_ohc=RyZBZjkdD70AX_hsIRZ&_nc_ht=scontent-sin6-4.xx&oh=00_AT936vFRwStLLLOk0dSL28foRPGMOIsFO6JKZ-btuFL7lA&oe=62688297" />
// <h3>Lộc Trần</h3>
// </div>
