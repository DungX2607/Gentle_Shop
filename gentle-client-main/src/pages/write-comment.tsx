import { AddIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import styles from "../assets/css/pages/writeComment.module.css";
import LocalLoading from "../components/LocalLoading";
import { CommentInput, useCreateCommentsMutation } from "../generated/graphql";
import { localSelector } from "../store/reducers/localSlice";
import { WriteCommentProps } from "../utils/type/redux/reduxType";


const writeComment = () => {
  const router = useRouter();
  const [commentInput, setCommentInput] = useState<CommentInput>({
    content: "",
    billId: 0,
    rating: 0,
    imagesComment: [],
  });

  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [localLoading,setLocalLoading] = useState(false)
  const [rating, setRating] = useState<number>(0);
  const [commentProps, setCommentProps] = useState<WriteCommentProps | null>(
    null
  );
  const {writeCommentProps}= useSelector(localSelector)
    const toast = useToast()
  useEffect(() => {
 
    if (writeCommentProps === null) router.push("/user");
    else {
      setCommentProps(writeCommentProps);
      setCommentInput({ ...commentInput, billId: writeCommentProps.billId });
    }
  }, [commentProps]);

  useEffect(() => {
    setCommentInput({ ...commentInput, rating: rating });
  }, [rating]);

  useEffect(() =>{
   
  },[commentInput])

  const [createCommentsSubmit] = useCreateCommentsMutation();

  const handleCommentsSubmit = async () => {
   
      const { data, errors } = await createCommentsSubmit({
        variables: {
          commentInput,
        },
      });
      if (errors) console.log(errors);
      if (data?.createComments.code === 400)
        alert(data.createComments.message);
      if (data?.createComments.success){
        toast({
          title:"Thông báo",
          description:"Cảm ơn quý khách đã gửi đánh giá, chúng tôi thật sự trân trọng mọi ý kiến của quý khách, nếu trong quá trình mua sắm cửa hàng chưa làm tốt, xin quý khách liên hệ Admin để được giải quyết!",
          duration:4000,
          isClosable:true,
          status:"success"
        })
        router.push("/")
      };
  };


  
  const handleImagesComment = (event: React.ChangeEvent<HTMLInputElement>) => {
   setLocalLoading(true)
    Promise.all(
      Array.from(event.target.files!).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "imagesComment");
        const result = await axios.post(
          "https://api.cloudinary.com/v1_1/perfumeblog/image/upload",
          formData
        );
        return result.data.secure_url;
      })
    ).then((imgList) => {
      setImagesPreview(imgList)
      setCommentInput({ ...commentInput, imagesComment: imgList });
      setLocalLoading(false)
    }).catch(err => {
      toast({
        title:"Lỗi!",
        description:err.message,
        position:"top",
        isClosable:true,
        status:"error",
        duration:2000
      })
      setLocalLoading(false)
    }).finally(
     () =>{
      setLocalLoading(false)
     }
    )
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Memories</h1>
      <div className={styles.container}>
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <h1 className={styles.heading}>Bình luận của bạn</h1>
            </div>

            <div className="col l-7 m-7 c-12">
              <div className={styles.imgContainer}>
                <h3>Sản phẩm đã mua</h3>
                <div className="row">
                  {commentProps !== null &&
                    commentProps.products.map((item) => (
                      <div className="col l-3 m-6 c-6">
                        <div className={styles.billProductItem}>
                          <img src={item.productThumbnail} />
                          <h4>{item.productName}</h4>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="col l-5 m-5 c-12">
              <div className={styles.writeCommentContainer}>
                <div className={styles.ratingContainer}>
                  <h4>Đánh giá:</h4>
                  <StarRatings
                    rating={rating}
                    starRatedColor="black"
                    changeRating={setRating}
                    numberOfStars={5}
                    starHoverColor="black"
                    name="rating"
                    starDimension="20px"
                  />
                </div>
                <div className={styles.writeCommentControl}>
                  <h2>Bình luận</h2>
                  <textarea
                    onChange={(event) =>
                      setCommentInput({
                        ...commentInput,
                        content: event.target.value,
                      })
                    }
                  />
                  <div className={styles.imageComment}>
                    <div className="row">
                      <div className="col l-5 m-7 c-6">
                        <div className={styles.imageUpload}>
                          <div className={styles.uploadImageText}>
                            {" "}
                            <AddIcon
                              color="white"
                              style={{ marginRight: 8 }}
                            />{" "}
                            Thêm hình ảnh
                          </div>

                          <input
                            type="file"
                            className={styles.inputFile}
                            onChange={(event) => handleImagesComment(event)}
                            multiple
                          />
                        </div>
                      </div>
                      <div className=" l-7 m-5 c-6">
                        <div className={styles.uploadImageNotice}>
                          (Không bắt buộc)
                        </div>
                      </div>
                    </div>
                    <div className={styles.imageResult}>
                      {imagesPreview.length > 0 &&
                        imagesPreview.map((item, index) => (
                          <div className={styles.imageResultItem} key={index}>
                            <img src={item} />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 40,
                    }}
                  >
                    <h1></h1>
                    <button
                      className={clsx("btnBlackBorder")}
                      onClick={handleCommentsSubmit}
                    >
                      Đánh giá
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {localLoading && <LocalLoading/>}
      
    </>
  );
};

export default writeComment;
