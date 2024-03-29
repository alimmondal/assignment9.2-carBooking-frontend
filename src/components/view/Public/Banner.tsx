"use client";
import viper from "@/assets/bmw.png";
import perk from "@/assets/fiat.png";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Carousel, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/banner.module.css";

const Banner = () => (
  <Carousel
    effect="fade"
    autoplay
    className="w-full h-[80vh] flex md:flex-row md:p-24 p-3 flex-row-reverse"
  >
    {/* slider-1 */}
    <div>
      <Row justify="center" align="middle">
        <Col
          lg={{
            span: 8,
          }}
        >
          <h2 className="text-4xl">
            LET&apos;S FIND,
            <br />
            RENT, BOOK A BMW X5
          </h2>
          <div
            className="line"
            style={{
              height: "5px",
              margin: "20px 0",
              background: "#000",
              width: "90%",
            }}
          ></div>

          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              color: "gray",
              margin: "10px 0px",
            }}
          >
            <span>
              <CalendarOutlined />
              Available
            </span>
            <span>
              <CommentOutlined /> NO COMMENTS
            </span>
            {/* <span>
              <ProfileOutlined /> HOBBY
            </span> */}
          </p>

          <p>
            Beauteous before up across felt sheepishly and more mournfully the
            wow so more flustered and one up pushed salamander collective
            blinked that iguanodon bid much some since hey far goodness jaguar
            while...
          </p>
          <Link href={"/available-services"}>
            <p
              style={{
                fontSize: "20px",
                margin: "20px 0px",
                backgroundColor: "black",
                color: "white",
                fontWeight: "300",
                letterSpacing: "3px",
              }}
              className="px-2 py-3 w-56"
            >
              Keep Exploring <ArrowRightOutlined />
            </p>
          </Link>
        </Col>

        <Col
          lg={{
            span: 16,
          }}
          className={styles.contentStyle}
        >
          <Image src={perk} alt="bmw_image" className={styles.SImage} />
        </Col>
      </Row>
    </div>
    {/* slider-2 */}
    <div>
      <Row justify="center" align="middle">
        <Col
          lg={{
            span: 8,
          }}
        >
          <h2 className="text-4xl">
            LET&apos;S BOOK
            <br />A SERVICE OF FIAT-500
          </h2>

          <div
            className="line"
            style={{
              height: "5px",
              margin: "20px 0",
              background: "#000",
              width: "95%",
            }}
          ></div>

          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              color: "gray",
              margin: "10px 0px",
            }}
          >
            <span>
              <CalendarOutlined />
              available
            </span>
            <span>
              <CommentOutlined /> 5 COMMENTS
            </span>
            {/* <span>
              <ProfileOutlined /> NATURE
            </span> */}
          </p>

          <p>
            A spread opened patient and compulsively one placed seagull goodness
            python owing snapped yikes equitable when much the much Lorem ipsum
            s= dolor sit, amet consectetur adipisicing elit. Eligendi,
            tenetur!...
          </p>
          <Link href={"/available-services"}>
            <p
              style={{
                fontSize: "20px",
                margin: "20px 0px",
                backgroundColor: "black",
                color: "white",
                fontWeight: "300",
                letterSpacing: "3px",
              }}
              className="px-2 py-3 w-56"
            >
              Keep Exploring <ArrowRightOutlined />
            </p>
          </Link>
        </Col>

        <Col
          lg={{
            span: 16,
          }}
          className={styles.contentStyle}
        >
          <Image
            src={viper}
            alt="fiat_image"
            // @ts-ignore
            style={{ grayScale: "-1" }}
            className={styles.SImage}
          />
        </Col>
      </Row>
    </div>
  </Carousel>
);
export default Banner;
