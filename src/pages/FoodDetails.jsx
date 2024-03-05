import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import axios from "axios";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import ProductCard from "../components/UI/product-card/ProductCard";

const FoodDetails = () => {
  const  {id}  = useParams();
  const [product, setProduct] = useState(null);
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [previewImg, setPreviewImg] = useState(""); // 
  console.log('_id',id)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/products/${id}`);
        console.log('sss',response)
        const productData = response.data.data;
        setProduct(productData);
         console.log('Product Data:', productData);
        // Fetch related products based on category
        
        const relatedResponse = await axios.get(`http://localhost:4000/api/v1/products?limit=4&category=${productData.category}`);
        setRelatedProduct(relatedResponse.data.data.products);
        setPreviewImg(productData.image); 

      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    // Call the fetchProductData function
    fetchProductData();
  }, []);
 
  
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (product) {
  //     setPreviewImg(product.image);
  //   }
  // }, [product]);

  // Move destructuring inside the useEffect
  // const preview = product?.image || "";
  const { name, price, category, description, image } = product || {};

  // const product = products.find((product) => product._id === id);


  // const relatedProduct = product.filter((item) => category === item.category);

  const addItem = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/v1/cart/add/${id}`,
     
     
      );
      console.log(response);
      console.log(response.data.data); // Log the server response
  
      // Dispatch any actions or handle UI updates as needed
      dispatch(
        cartActions.addItem({
          name,
          price,
          image,
        })
      );
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle error or show a user-friendly message
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(enteredName, enteredEmail, reviewMsg);
  };

  // useEffect(() => {
  //   setPreviewImg(product.image);
  // }, [product]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [product]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={name} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image)}
                >
                  {/* <img src={product.image} alt="" className="w-50" /> */}
                </div>
                {/* <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image)}
                >
                  <img src={product.image02} alt="" className="w-50" />
                </div> */}
{/* 
                <div
                  className="img__item"
                  onClick={() => setPreviewImg(product.image03)}
                >
                  <img src={product.image03} alt="" className="w-50" />
                </div> */}
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{name}</h2>
                <p className="product__price">
                  {" "}
                  Price: <span>${price}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{category}</span>
                </p>

                <button onClick={addItem} className="addTOCart__btn">
                  Add to Cart
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6
                  className={` ${tab === "desc" ? "tab__active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={` ${tab === "rev" ? "tab__active" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Review
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content">
                  <p>{''}</p>
                </div>
              ) : (
                <div className="tab__form mb-3">
                  <div className="review pt-5">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>
                  <form className="form" onSubmit={submitHandler}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setEnteredName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Write your review"
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="addTOCart__btn">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col>

              {relatedProduct?.map((item) => (
          <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item._id}>
            <ProductCard item={item} />
          </Col>
        ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
