import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../assets/css/pages/admin/createEvent.module.css";
import { Button, Input, InputGroup, Textarea } from "@chakra-ui/react";

import axios from "axios";
import { MyEventInput, useAdminCreateEventMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/reducers/authSlice";
import MySpinner from "../../components/MySpinner";
import { INSTRUCTION_IMAGES } from "../../utils/other/constants";



const createEvent = () => {
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

  
    const [adminCreateEvent] = useAdminCreateEventMutation()
  const [myEvent, setMyEvent] = useState<MyEventInput>({
    title: "",
    thumbnail: "",
    content: "",
    summary:"",
    instructionImages:[]
  });

  //handle
  //Thumbnail
  const handleThumbnail = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File = event.target.files![0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "eventThumbnail");
    const result = await axios.post(
      "https://api.cloudinary.com/v1_1/perfumeblog/image/upload",
      formData
    );
    setMyEvent({ ...myEvent, thumbnail: result.data.secure_url });
  };

  // InstructionImages
  const handleInstructionImages = async (event: React.ChangeEvent<HTMLInputElement>) =>{
    const file: File = event.target.files![0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", INSTRUCTION_IMAGES);
    const result = await axios.post(
      "https://api.cloudinary.com/v1_1/perfumeblog/image/upload",
      formData
    );
    let tempList = myEvent.instructionImages
    tempList?.push(result.data.secure_url) 
  
    setMyEvent({ ...myEvent, instructionImages:tempList });
  }

  //submit
  const handleSubmit = async () => {

   const res = await adminCreateEvent({
     variables:{
       input:myEvent
     }
   })
   if(res.errors) console.log(res.errors)
   if(res.data?.adminCreateEvent.success) router.push("/admin/dashboard")
  };

  return (
    <div>
      <Navbar />
      <div className="distance">
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <div className={styles.container}>
                <InputGroup>
                  <Input
                    placeholder="Tên sự kiện"
                    onChange={(event) =>
                      setMyEvent({ ...myEvent, title: event.target.value })
                    }
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    placeholder="Summary"
                    onChange={(event) =>
                      setMyEvent({ ...myEvent, summary: event.target.value })
                    }
                  />
                </InputGroup>

                <h2 className={styles.text}>Thumbnail</h2>
                <InputGroup>
                 
                  <Input
                    type="file"
                    placeholder="Thumbnail"
                    onChange={handleThumbnail}
                  />
                   {myEvent.thumbnail!=="" && <img src={myEvent.thumbnail} />}
                </InputGroup>
               

                  <h2 className={styles.text}>InstrucstionImage</h2>
                <InputGroup>

                  <Input
            
                    type="file"
                    placeholder="InstuctionImages"
                    onChange={handleInstructionImages}
                  />
                  {myEvent.instructionImages && myEvent.instructionImages.map((item,index) => <img key={index} src={item}/>)}
                </InputGroup>

                <InputGroup>
                  <Textarea value={myEvent.content} onChange={event => setMyEvent({...myEvent,content:event.target.value})}/>
                </InputGroup>
                <Button onClick={handleSubmit}>Tạo Event</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {localLoading && <MySpinner/>}
    </div>
  );
};

export default createEvent;
