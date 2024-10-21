import React from "react";
import Cookies from "js-cookie";

const ProductPage = () => {
  const firstName = Cookies.get("firstName");
  const lastName = Cookies.get("lastName");

  return (
    <h1>
      Welcome, {firstName}&nbsp;{lastName}
    </h1>
  );
};

export default ProductPage;
