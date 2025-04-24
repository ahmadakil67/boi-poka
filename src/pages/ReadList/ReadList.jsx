import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getStoredBook } from "../../utility/addToDB";
import Book from "../Book/Book";

const ReadList = () => {
  const [readList, setReadList] = useState([]);

  const data = useLoaderData();
  // console.log(data);

  useEffect(() => {
    const storedBookData = getStoredBook();
    // console.log(storedBookData);
    const ConvertedStoredBooks = storedBookData.map((id) => parseInt(id));
    // console.log(ConvertedStoredBooks);
    const myReadList = data.filter((book) =>
      ConvertedStoredBooks.includes(book.bookId)
    );
    // console.log(myReadList)
    setReadList(myReadList);
  }, []);

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Read Book List</Tab>
          <Tab>Wish List</Tab>
        </TabList>

        <TabPanel>
          <h2>Book I read. {readList.length}</h2>
          <div className="flex flex-col gap-4 mt-4">
            {readList.map((book) => (
              <div key={book.bookId} className="flex gap-4">
                <img
                  src={book.image}
                  alt={book.bookName}
                  className="w-24 h-32 object-cover rounded shadow-md mb-2"
                />
                <div className="text-left">
                  <p className="text-sm font-bold">{book.bookName}</p>
                  {book.author && (
                    <p className="text-xs text-gray-600">By: {book.author}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <h2>My wish list.</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ReadList;
