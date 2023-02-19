import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Price from "./Price";
import Rating from "./Rating";

const Book = ({ book }) => {
  //img = HTML element!
  const [img, setImg] = useState() //iniitally no img~
  //when img changes, whole component reenders
  
  const mountedRef = useRef(true) //whole componenent dont reender

  //To get that element = document allow us to create new image!
  useEffect(() => {           //as soon as the book component mounts, call the useEffect and~
    const image = new Image() 
    image.src = book.url      //create dom image element with js(not HTML)~
    image.onload = () => {    //when it loads, attach onload function with that by setting the image~
      if (mountedRef.current) {
        setImg(image)
        //getting called even when components are unmounted due to its callback nature
        //only use when it is mounted by useRef
      }
    }
    return () => {
      //when the componenet unmounts
      mountedRef.current = false
      //.current to use it with UseRef
    }
  })
  // function imageLoaded() {
  //   console.log("imageLoaded"); //to see how skeleton works
  // }
  return (
    <div className="book">
      {img ? ( //check if there is an img
        <>
          <Link to={`/books/${book.id}`}>
            <figure className="book__img--wrapper">
              <img
                src={img.src}
                alt=""
                className="book__img"
                // onLoad={imageLoaded}
              />
            </figure>
          </Link>
          <div className="book__title">
            <Link to={`/books/${book.id}`} className="book__title--link">
              {book.title}
            </Link>
          </div>
          <Rating rating={book.rating} />
          <Price
            salePrice={book.salePrice}
            originalPrice={book.originalPrice}
          />
        </>
      ) : (
        <>
          <div className="book__img--skeletion"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      )}
    </div>
  );
};

export default Book;
