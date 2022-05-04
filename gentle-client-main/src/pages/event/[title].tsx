import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../assets/css/pages/eventDetail.module.css";
import Footer from "../../components/Footer";
import ImageFullScreen from "../../components/ImageFullScreen";
import Navbar from "../../components/Navbar";
import RedirectHeader, {
  RedirectHeaderProps,
} from "../../components/RedirectHeader";
import {
  GetEventDocument,
  GetEventQuery,
  GetEventsDocument,
  GetEventsQuery,
  MyEvent,
} from "../../generated/graphql";
import { client } from "../../utils/lib/ApolloClient";

interface Props {
  data: MyEvent;
}

const item1: RedirectHeaderProps = {
  displayName: "trang chủ",
  url: "/",
};

const item2: RedirectHeaderProps = {
  displayName: "sự kiện",
  url: "/events",
};

const list: RedirectHeaderProps[] = [item1, item2];

const Title: NextPage<Props> = ({ data }) => {
  const [isImageFullScreenOpen, setIsImageFullScreenOpen] = useState(false);

  const callbackFromImageFullScreen = () => {
    setIsImageFullScreenOpen(false);
  };
  const [indexOfImageList, setIndexOfImageList] = useState(0);
  return (
    <div>
      <Navbar />
      <div className="distance">
        <RedirectHeader list={list} pageName="sự kiện" />
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <div className={styles.container}>
                <div className={styles.body}>
                  <h2 className={styles.title}>{data.title}</h2>
                  <h4 className={styles.createdAt}>---{data.createdAt}---</h4>
                  <div className={styles.contentContainer}>
                 
                     <h2 className={styles.contentHeading}>NỘI DUNG </h2>
                    
                    <div className={styles.contentBody}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data?.content,
                        }}
                        className={styles.content}
                      />
                      {data.instructionImages && (
                        <div className={styles.instructionImageContainer}>
                          <h2 className={styles.textSample}>
                            Hình ảnh miêu tả
                          </h2>
                          <div className={styles.imageContainer}>
                            <div className="row">
                              {data.instructionImages?.map((item, index) => (
                               <div className="col l-3 m-4 c-6">
                                  <img
                                  className={styles.imageItem}
                                  src={item}
                                  onClick={() => {
                                    setIndexOfImageList(index);
                                    setIsImageFullScreenOpen(true);
                                  }}
                                />
                               </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.footer}>
                    ---KÍNH CHÚC QUÝ KHÁCH CÓ THẬT NHIỀU NIỀM VUI---
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {data.instructionImages && isImageFullScreenOpen && (
        <ImageFullScreen
          urlList={data.instructionImages}
          callbackToClose={callbackFromImageFullScreen}
          index={indexOfImageList}
        />
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<GetEventsQuery>({
    query: GetEventsDocument,
  });

  return {
    paths: data.getEvents.myEvents!.map((item) => ({
      params: { title: `${item.title}` },
    })),
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps<
  { [key: string]: any },
  { title: string }
> = async ({ params }) => {
  const { data, error, loading } = await client.query<GetEventQuery>({
    query: GetEventDocument,
    variables: { title: params?.title },
  });
  return {
    props: {
      data: data.getEvent.myEvent,
    },
  };
};

export default Title;
