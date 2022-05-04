import { Button, Input, InputGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../assets/css/pages/admin/comments.module.css";
import ImageFullScreen from "../../components/ImageFullScreen";
import MySpinner from "../../components/MySpinner";
import Navbar from "../../components/Navbar";
import {
  FeedbackInput,
  useAdminCreateFeedbackMutation,
  useAdminGetCommentsNoFeedbackQuery,
} from "../../generated/graphql";
import { authSelector } from "../../store/reducers/authSlice";

interface FeedbackProps {
  commentId: number;
  feedbackContent: string;
}

const comments = () => {
  const router = useRouter();
  const { data, error } = useAdminGetCommentsNoFeedbackQuery();
  const [adminCreateFeedbackMutation] = useAdminCreateFeedbackMutation();
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

  //useState
  const [feedback, setFeedback] = useState<FeedbackProps[]>([]);

  //useEffect
  useEffect(() => {
    if (error) console.log(error);
    if (data?.adminGetCommentsNoFeedback.comments) {
      let tempList: FeedbackProps[] = [];
      tempList = data?.adminGetCommentsNoFeedback.comments.map((item) => {
        const tempItem: FeedbackProps = {
          commentId: item.id,
          feedbackContent: "",
        };
        return tempItem;
      });
      setFeedback(tempList)
    }
  }, [error, data]);

  //handle
  const handleFeedbackContentChange = (
    commentId: number,
    feedbackContent: string
  ) => {
    const tempList : FeedbackProps[] = feedback.map((item) =>{
      if(item.commentId === commentId){
        item.feedbackContent = feedbackContent
      } 
      return item
    })
    setFeedback(tempList)
  };

 

  const handleSubmit = async (id: number,feedbackContent:string) => {
    const feedbackInput: FeedbackInput = {
      content: feedbackContent,
      commentId: id,
    };
 
    const res = await adminCreateFeedbackMutation({
      variables: {
        feedbackInput,
      },
    });
    if (res.errors) console.log(res.errors);
    if (!res.data?.adminCreateFeedback.success)
      console.log(`Fail:${res.data?.adminCreateFeedback.message}`);
    if (res.data?.adminCreateFeedback.success)
      console.log(`Create feedback ${res.data.adminCreateFeedback.success}`);
      let listTemp : FeedbackProps[] = feedback.filter(item => item.commentId!==id)
      setFeedback(listTemp)
  };
  return (
    <div>
      <Navbar />
      <div className="distance">
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <div className={styles.container}>
                <h1 className={styles.heading}> User Comment</h1>
                {data?.adminGetCommentsNoFeedback.success &&
                  data.adminGetCommentsNoFeedback.comments?.map((item) => (
                    <div className={styles.item} key={item.id}>
                      <div className={styles.userInfo}>
                        <img src={item.user.userAvatar} />
                        <h2>{item.user.userName}</h2>
                      </div>
                      <h3 className={styles.productName}>
                        {item.product.productName}
                      </h3>
                      <p className={styles.content}>
                        Bình luận: {item.content}
                      </p>
                      {feedback.map(feedback => {
                        if(feedback.commentId===item.id){
                          return <div className={styles.feedback} key={feedback.commentId}>
                          <InputGroup>
                            <Input
                              placeholder="Feedback"
                              focusBorderColor="black"
                              className="boxShadowNone"
                              value={feedback.feedbackContent}
                              onChange={(event) =>
                                handleFeedbackContentChange(
                                  item.id,
                                  event.target.value
                                )
                              }
                            />
                          </InputGroup>
                          <Button
                            colorScheme="green"
                            onClick={() => handleSubmit(item.id,feedback.feedbackContent)}
                          >
                            Phản hồi
                          </Button>
                        </div>
                        }
                      })}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {localLoading && <MySpinner/>}
    </div>
  );
};

export default comments;
