import React from "react";
import { FaRegStar } from "react-icons/fa6";
import { Link } from "react-router";

const Book = ({ singleBook }) => {
  // const data = use();
//   console.log(singleBook);

  const { bookName, author, image, category, rating, tags, bookId } = singleBook;

  return (
    <Link to={`/bookDetails/${bookId}`}>
      <div className="card border-2 border-gray-300 w-76 mb-5">
        <figure className="p-6 bg-gray-200 m-5">
          <img className="h-[160px] w-[130px]" src={image} alt="Shoes" />
        </figure>
        <div className="ml-4">
          {tags.map((tag) => ( 
            <p className="badge text-green-400 bg-gray-100 ml-2">{tag}</p>
          ))}
        </div>
        <div className="card-body">
          <h2 className="card-title">{bookName}</h2>
          <p>BY: {author}</p>
          <div className="border-1 border-gray-300"></div>
          <div className="card-actions justify-between">
            <div className="">{category}</div>
            <div className="flex items-center gap-2">
              <div>{rating}</div>
              <div>
                <FaRegStar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Book;
