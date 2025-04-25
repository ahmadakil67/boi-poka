import React from "react";
import { useLoaderData, useParams } from "react-router";
import { addToStoredDB } from "../../utility/addToDB";
import Swal from 'sweetalert2';


const BookDetails = () => {
  const { id } = useParams();
  const bookId = parseInt(id);
  const data = useLoaderData();
  console.log(data);
  const singleBook = data.find((book) => book.bookId === bookId);
  const { bookName, image, author, category, tags, review, publisher, totalPages, yearOfPublishing, rating} = singleBook;
  console.log(id);
  

  const handleMarkAsRead = (id, buttonElement) => {
    Swal.fire({
      title: 'Mark as Read?',
      text: 'Are you sure you want to mark this book as read?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, mark as read!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        addToStoredDB(id);
        Swal.fire(
          'Marked!',
          'This book has been added to your read list.',
          'success'
        );
        // Change the button color
        if (buttonElement) {
          buttonElement.style.backgroundColor = 'green'; // Or your desired color
          buttonElement.textContent = 'Read'; // Optgreenionally change the text
          buttonElement.disabled = true; // Optionally disable the button
        }
      }
    });
  };

// const handleAddToWishList = (id) =>{
//     addToStoredWishList(id);
// }

  return (
    <div className="flex my-10 gap-4">
      <div className="bg-gray-100 rounded-2xl">
        <img className="h-120 w-100 p-10" src={image} alt="" />
      </div>
      <div className="ml-8">
        <h1 className="font-bold text-4xl mb-3">{bookName}</h1>
        <p className="font-bold text-gray-500">By: {author}</p>
        <div className="border-1 border-gray-300"></div>
        <p className="font-bold text-gray-500">{category}</p>
        <div className="border-1 border-gray-300"></div>
        <div className="w-150 text-justify">
          <span className="font-bold">Review: </span>
          {review}
        </div>
        <div className="mt-3">
          <span className="font-bold">Tags:</span>
          {tags.map((tag) => (
            <p className="badge text-green-400 bg-gray-100 ml-2">{tag}</p>
          ))}
        </div>
        <div className="border-1 border-gray-300 mt-3"></div>
        <h1 className=" text-gray-600">Number of Pages: <span className="font-bold">{totalPages}</span> </h1>
        <h1 className=" text-gray-600">Publisher: <span className="font-bold">{publisher}</span> </h1>
        <h1 className=" text-gray-600">Year of Publishing: <span className="font-bold">{yearOfPublishing}</span></h1>
        <h1 className=" text-gray-600">Rating: <span className="font-bold">{rating}</span> </h1>
        <div className="">
        <button onClick={() => handleMarkAsRead(bookId)} className="btn btn-outline mr-4 btn-accent">Mark as Read</button>
        <button  className="btn btn-accent">Add to Wish List</button>
        {/* onClick={() => handleAddToWishList(bookId)} */}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
