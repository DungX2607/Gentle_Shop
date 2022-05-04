import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  GetEventsDocument,
  GetEventsQuery,
  MyEventResponse,
  useGetEventsQuery,
} from "../generated/graphql";
import styles from "../assets/css/pages/events.module.css";
import { NextPage } from "next";
import { client } from "../utils/lib/ApolloClient";
import { useRouter } from "next/router";
import Link from "next/link";
import { Badge } from "@chakra-ui/react";
import RedirectHeader, { RedirectHeaderProps } from "../components/RedirectHeader";

interface Props {
  data: MyEventResponse;
  loading: boolean;
}
const item1: RedirectHeaderProps = {
  displayName: "trang chủ",
  url: "/",
};
const item2: RedirectHeaderProps = {
  displayName: "sự kiện",
  url: `/events`,
};


const list: RedirectHeaderProps[] = [item1, item2];
const Events: NextPage<Props> = ({ data }) => {
  return (
    <div>
      <Navbar />
      <div className="distance">
        <RedirectHeader list={list} pageName="sự kiện"/>
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <div className={styles.container}>
                {data.myEvents &&
                  data.myEvents.map((item) => (
                    <Link href={`/event/${item.title}`} key={item.title}>
                      <div className={styles.eventItem}>
                        <div className="row">
                          <div className=" l-2 m-2 c-3">
                            <img src={item.thumbnail} />
                          </div>
                          <div className=" l-10 m-10 c-9">
                            <div className={styles.itemInfo}>
                              <div>
                                <h2 className={styles.title}>{item.title}</h2>
                                <p className={styles.summary} >{item.summary}</p>
                              </div>
                              <Badge colorScheme="green">Đang diễn ra</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;

export async function getStaticProps() {
  const res = await client.query<GetEventsQuery>({
    query: GetEventsDocument,
  });

  return {
    props: {
      data: res.data.getEvents,

      loading: res.loading,
    },
  };
}
