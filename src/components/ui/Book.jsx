import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Price from "./Price";
import Rating from "./Rating";

const Book = ({ book }) => {
  const [img, setImg] = useState() //iniitally no img

  const mountedRef = useRef(false) //whole componenent dont reender

  useEffect(() => {
    const image = new Image() //create dom element with js, when it loads, set the img
    image.src = book.url
    image.onload = () => {
      if (mountedRef.current) {
        setImg(image)
      }
    }
    return () => {
      //when the componenet unmounts
      mountedRef.current = true
    }
  })
  // function imageLoaded() {
  //   console.log("imageLoaded"); //to see how it works
  // }
  return (
    <div className="book">
      {img ? (
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
