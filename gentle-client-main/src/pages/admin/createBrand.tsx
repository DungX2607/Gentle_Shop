import { Button, Input, InputGroup, Select, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../assets/css/pages/admin/createEvent.module.css";
import {
  BrandInput,
  useAdminCreateBrandMutation,
  useAdminGetProductKindsQuery,
} from "../../generated/graphql";
import axios from "axios";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/reducers/authSlice";
import MySpinner from "../../components/MySpinner";

const createBrand = () => {
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
  const { data } = useAdminGetProductKindsQuery();

  const [createBrand] = useAdminCreateBrandMutation();
  const [brand, setBrand] = useState<BrandInput>({
    brandName: "",
    thumbnail: "",
    description: "",
    kindId: 0,
    productClassId:0
  });
  useEffect(() =>{
    if(data?.adminGetProductKinds.classes && data?.adminGetProductKinds.kinds){
      setBrand({...brand,productClassId:data.adminGetProductKinds.classes[0].id})
      setBrand({...brand,kindId:data.adminGetProductKinds.kinds[0].id})
    }
  },[data])



  const handleThumbnail = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File = event.target.files![0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "brandThumbnail");
    const result = await axios.post(
      "https://api.cloudinary.com/v1_1/perfumeblog/image/upload",
      formData
    );

    setBrand({ ...brand, thumbnail: result.data.secure_url });
  };
  const handleSubmit = async () => {
    if(brand.kindId && brand.productClassId!=0){
       const res = await createBrand({
      variables: {
        brandInput: brand,
      },
    });
    if (res.errors) console.log(res.errors);
    if (res.data?.adminCreateBrand.success) router.push("/admin/dashboard");
    }else{
      alert(`Kind=${brand.kindId} --- Class=${brand.productClassId}`,)
    }
  };
  return (
    <div>
      <Navbar />
      <div className="distance">
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <div className={styles.container}>
                <h2>Product Kind</h2>
                <Select
                 
                  fontFamily="Roboto"
                  fontSize="1rem"
                  size="sm"
                  className={clsx("boxShadowNone", styles.input)}
                  value={brand.kindId}
                  onChange={(event) =>
                    setBrand({ ...brand, kindId: +event.target.value })
                  }
                >
                  {data &&
                    data.adminGetProductKinds.kinds?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </Select>
<h2>Product Class</h2>
                <Select
                  fontFamily="Roboto"
                  fontSize="1rem"
                  size="sm"
                  className={clsx("boxShadowNone", styles.input)}
                  value={brand.productClassId}
                  onChange={(event) =>
                    setBrand({ ...brand, productClassId: +event.target.value })
                  }
                >
                  {data?.adminGetProductKinds.classes!.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>

                <InputGroup>
                  <Input
                    placeholder="Tên thương hiệu"
                    onChange={(event) =>
                      setBrand({ ...brand, brandName: event.target.value })
                    }
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    type="file"
                    placeholder="Thumbnail"
                    onChange={handleThumbnail}
                  />
                </InputGroup>

                <InputGroup>
                  <Textarea
                    value={brand.description}
                    onChange={(event) =>
                      setBrand({ ...brand, description: event.target.value })
                    }
                  />
                </InputGroup>
                <Button onClick={handleSubmit}>Tạo Thương hiệu này</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {localLoading && <MySpinner/>}
    </div>
  );
};

export default createBrand;
