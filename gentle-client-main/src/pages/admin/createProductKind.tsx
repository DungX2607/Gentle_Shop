import { Button, Input } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from "../../assets/css/pages/admin/createProduct.module.css";
import MySpinner from '../../components/MySpinner';
import { useAdminCreateProductKindMutation } from '../../generated/graphql';
import { authSelector } from '../../store/reducers/authSlice';
const CreateProductKind = () => {
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

    const [adminCreateProductKind] = useAdminCreateProductKindMutation()

    const [name,setName] = useState("")


    // handle
    const handleSubmit = async () =>{
        const res = await adminCreateProductKind({
            variables:{
                name
            }
        })
        if(res.errors) alert(res.errors)
        if(res.data?.adminCreateProductKind.code===400) alert(res.data?.adminCreateProductKind.message)
        if(res.data?.adminCreateProductKind.success) router.push("/admin/dashboard")
    }
  return (
    <div className="grid wide">
        <div className="row">
            <div className="col l-6 l-o-3 m-12 c-12">
                <div className={styles.containerProductKindAndClass}>
                    <h1 className={styles.headingProductKindAndClass}>Product Kind</h1>
                    <Input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                    <Button colorScheme="green" onClick={handleSubmit}>Create</Button>
                </div>
            </div>
        </div>
        {localLoading && <MySpinner/>}
    </div>
  )
}

export default CreateProductKind