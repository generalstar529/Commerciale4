import React, { Component } from "react";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { STRINGS } from "../../../utils/strings";
import { LangConsumer } from "../../../utils/LanguageContext";

export default class CompanyDetailProduct extends Component {
    render() {
        const { product } = this.props;

        return (
            <LangConsumer>
                {(context) => (
                    <div className="detail-product">
                        <h5 className="text-dark-light mb-4 text-uppercase text-center">
                            {product &&
                                product.name &&
                                (context.lang === "en" ? (product.name.en ? product.name.en : product.name.it) : product.name.it ? product.name.it : product.name.en)}
                        </h5>
                        {product && product.photos && product.photos.length ? (
                            product.photos.length > 1 ? (
                                <div className="d-flex justify-content-center">
                                    <div className="slide-container">
                                        <Carousel showStatus={false} showThumbs={false} infiniteLoop={true}>
                                            {product.photos.map((photo, index) => (
                                                <img src={process.env.REACT_APP_AWS_PREFIX + photo} key={index} alt="" />
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <div className="slide-container">
                                        <img className="carousel" src={process.env.REACT_APP_AWS_PREFIX + product.photos[0]} alt="" />
                                    </div>
                                </div>
                            )
                        ) : (
                            <div />
                        )}

                        <p className="text-uppercase text-dark-light text-bold mt-4 mb-2">{STRINGS.details}</p>
                        <p className="font-15">
                            {product &&
                                product.detail &&
                                (context.lang === "en"
                                    ? product.detail.en
                                        ? product.detail.en
                                        : product.detail.it
                                    : product.detail.it
                                    ? product.detail.it
                                    : product.detail.en)}
                        </p>
                    </div>
                )}
            </LangConsumer>
        );
    }
}
