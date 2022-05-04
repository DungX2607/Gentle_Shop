import { useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Carousel from "nuka-carousel";
import React, { useEffect, useState } from "react";
import styles from "../assets/css/components/brand.module.css";
import { useGetBrandsQuery } from "../generated/graphql";

interface BrandProps {
  kindId: number;
}

const Brand = ({ kindId }: BrandProps) => {
  const { data } = useGetBrandsQuery({
    variables: {
      kindId,
    },
  });
  const [brandToShowAmount, setBrandToShowAmount] = useState<number>(6);
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 739px)");
  const [isTablet] = useMediaQuery("(max-width: 1240px)");

  useEffect(() => {
    if (isMobile) setBrandToShowAmount(2);
    else if (isTablet) setBrandToShowAmount(4);
    else setBrandToShowAmount(6);
  }, [isMobile, isTablet]);

  return (
    <div className={styles.brandContainer}>
      <div className="grid wide">
        <div className="row">
          {/* <div className="row">
            <div className="col l-4 l-o-4 m-4 m-o-4 c-12">
              <h2 className="brandName">{data?.getBrands.}</h2>
            </div>
          </div> */}
          <div className="col l-12 m-12 c-12">
            <div className={styles.heading}>brands</div>
            <div className={styles.brandBody}>
              <Carousel
                speed={700}
                slidesToShow={brandToShowAmount}
                autoplay={true}
                autoplayInterval={3000}
                wrapAround={true}
                swiping={true}
                cellSpacing={16}
            
                defaultControlsConfig={{
                  pagingDotsStyle: { display: "none" },
                  // prevButtonStyle:{marginRight:},
                  // nextButtonStyle:{display:"none"}
                }}
              >
                {data?.getBrands.brands?.map((item) => (
                  <div
                    className={styles.brandItem}
                    key={item.id}
                    onClick={() => {
                      router.push({
                        pathname: `/brand/${item.id}`,
                        query: { brandId: item.id },
                      });
                    }}
                  >
                    <img src={item.thumbnail} />
                    <h4 className={styles.brandName}>{item.brandName}</h4>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
