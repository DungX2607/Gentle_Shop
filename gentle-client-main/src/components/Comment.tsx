import { Badge, Button } from "@chakra-ui/react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import styles from "../assets/css/components/comment.module.css";
import { useGetCommentsQuery } from "../generated/graphql";
import ImageFullScreen, { ImageFullScreenProps } from "./ImageFullScreen";

interface CommentProps {
  productId: number;
}

const Comment = ({ productId }: CommentProps) => {
  
  const { data, error, loading, fetchMore } = useGetCommentsQuery({
    variables: {
      productId,
      skip: 0,
    },
  });
  const [imgList,setImageList] = useState<string[]>([])
  const [indexForImageFullScreen,setIndexForImageFullScreen] = useState(0)
  const callbackToCloseImgFullScreen= () =>{
    setImageList([])
    setIndexForImageFullScreen(0)
  }
  //handle
  const handleLoadmore = () => {
    fetchMore({
      variables: {
        productId,
        skip: data?.getComments.cursor,
      },
    });
  };

  return (
    <div className="row">
      <div className="col l-12 m-12 c-12">
        <div className={styles.commentContainer}>
          <div className={styles.commentHeader}>
            <h1>Đánh giá</h1>
          </div>

          {data?.getComments.success &&
            data.getComments.comments?.map((item) => (
              <div
                className={styles.commentItem}
                key={` ${item.user.userName}_${item.user.userAvatar}_${item.content}_${item.createdAt}`}
              >
                <div className={styles.userInfo}>
                  <img src={item.user.userAvatar} />

                  <div className={styles.userNameContainer}>
                    <h2>{item.user.userName} </h2>
                    <Badge
                      variant="outline"
                      colorScheme="green"
                      className={styles.paidChecked}
                    >
                      Đã mua hàng
                    </Badge>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={styles.paidCheckedIcon}
                    />
                  </div>
                </div>
                {item.rating > 0 && (
                  <div className={styles.ratingContainer}>
                    <StarRatings
                      rating={item.rating}
                      starDimension="20px"
                      starSpacing="4px"
                    />
                  </div>
                )}

                <div className={styles.commentContent}>{item.content}</div>
                <div className={styles.imageComment}>
                  {item.imagesComment &&
                    item.imagesComment.map((url,index) => <img src={url} onClick={() =>{
                      setImageList(item.imagesComment!)
                      setIndexForImageFullScreen(index)
                    }} />)}
                </div>
                {item.feedbacks?.map((feedback) => (
                  <div
                    className={styles.feedbackContainer}
                    key={feedback.createdAt}
                  >
                    <div className={styles.adminInfo}>
                      <img src={feedback.admin.avatar} />
                      <Badge className={styles.adminName}>
                        {feedback.admin.adminName}
                      </Badge>
                    </div>

                    <p className={styles.adminFeedbackContent}>
                      {feedback.content}
                    </p>
                  </div>
                ))}
              </div>
              
            ))}
          <div className={styles.commentFooter}>
            {!data?.getComments.hasMore ? (
              <Button onClick={handleLoadmore}>Xem thêm</Button>
            ) : (
              <h4>Bạn đã xem hết bình luận</h4>
            )}
          </div>
        </div>
    
      </div>
      <ImageFullScreen  urlList={imgList} index={indexForImageFullScreen} callbackToClose={callbackToCloseImgFullScreen}/>
    </div>
  );
};

export default Comment;
