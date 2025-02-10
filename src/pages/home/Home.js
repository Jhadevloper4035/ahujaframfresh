import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/Layout";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconSeven";
import HeroSliderSixteen from "../../wrappers/hero-slider/HeroSliderSixteen";
import TabProductFour from "../../wrappers/product/TabProduct";
import CategoryFiveGrid from "../../wrappers/category/CategoryFiveGrid";
import SectionTitle from "../../components/section-title/SectionTitleWithText";
import BannerEighteen from "../../wrappers/banner/banner";
import TestimonialOne from "../../wrappers/testimonial/TestimonialOne";
import NewsletterTwo from "../../wrappers/newsletter/NewsletterTwo";
import VegProduct from "../../wrappers/product/VegProduct";
import MushroomProduct from "../../wrappers/product/MushroomProduct";

const HomeFashionThree = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Homepage"
        description="No. 1 Fruits and Vegetable Market"
      />

      <LayoutOne
        headerContainerClass="container"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <HeroSliderSixteen />

        <SectionTitle
          titleText="Fresh Fruits Selection"
          positionClass="text-center"
          spaceTopClass="pt-100"
        />

        <TabProductFour
          category="fruits"
          productTabClass="product-tab-fruits"
        />

        <SectionTitle
          titleText="Fresh & Nutritious Mushrooms "
          positionClass="text-center"
          spaceTopClass="pt-100"
        />

        <MushroomProduct
          category="Mushroom"
          productTabClass="product-tab-fruits"
        />

        <SectionTitle
          titleText="Fresh & Nutrient-Rich Microgreens "
          positionClass="text-center"
          spaceTopClass="pt-100"
        />

        <TabProductFour
          category="Microgreens"
          productTabClass="product-tab-fruits"
        />

        <BannerEighteen />

        <TabProductFour category="dairy" productTabClass="product-tab-fruits" />

        <SectionTitle
          titleText="Fresh & Healthy Vegetables "
          positionClass="text-center"
          spaceTopClass="pt-100"
        />

        <VegProduct
          category="Vegetables"
          productTabClass="product-tab-fruits"
        />

        <CategoryFiveGrid />

        <FeatureIconTwo spaceTopClass="mt-60" spaceBottomClass="pb-20" />

        <TestimonialOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-95"
          spaceLeftClass="ml-70"
          spaceRightClass="mr-70"
          bgColorClass="bg-gray-3"
        />

        {/* newsletter */}
        <NewsletterTwo
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          subscribeBtnClass="green-subscribe"
        />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionThree;
