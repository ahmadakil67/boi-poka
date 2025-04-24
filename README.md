# Boi Poka - Your Online Book Reader

## Project Description

Boi Poka is a web application designed to provide users with a platform to explore and read books online.  It allows users to:

* Read books
* Add books to a wishlist
* View book details

This application aims to create a convenient and user-friendly experience for book enthusiasts.

## Features

* **Read Books:** Users can access and read books directly on the platform.
* **Wishlist:** Users can add books to a personal wishlist for later reading.
* **Book Details:** Users can view detailed information about each book, helping them make informed decisions.

## Technologies Used

* React
* React Router
* React Tabs
* SweetAlert2

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd boi-poka
    ```

3.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

## Usage

1.  **Start the development server:**

    ```bash
    npm run dev # or yarn dev
    ```

2.  **Open your browser:**

    Open your web browser and navigate to the address shown in the terminal (usually `http://localhost:3000`).

## Project Structure

The project structure is organized as follows:

\* `Boi Poka/`
    \* `src/`
        \* `pages/`
            \* `ReadList/`
                \* `ReadList.jsx`
        \* `components/`
            \* `Book/`
                \* `Book.jsx`
        \* `utility/`
            \* `addToDB.js`
            \* `getStoredBook.js`
            \* `addLocalStorage.js`
        \* `public/`
            \* `index.html`
        \* `package.json`
        \* `README.md`

## Key Components and Functionalities

\* **`ReadList` Component:**

    \* Displays the list of books that the user has added to their "Read List".
    \* Allows users to sort the list.
    \* Uses React Tabs to separate "Read List" and "Wish List".
    \* Fetches book data using `useLoaderData` from React Router.
    \* Stores read list data using local storage with helper functions.
    \* Uses `getItem` to retrieve data.
    \* Uses `handleMarkAsRead` to mark a book as read, show a SweetAlert confirmation, and update the button appearance.

\* **`Book` Component:**

    \* Displays individual book information (image, title, author).

\* **`addToDB.js`:**

    \* Function to add book IDs to the storage (local storage).

\* **`getStoredBook.js`:**

    \* Function to get book IDs from local storage.

\* **`addLocalStorage.js`:**

    \* Functions for local storage operations.

## Code Examples

\* **`ReadList.jsx`**

    <pre><code>
    import React, { useEffect, useState } from 'react';
    import { useLoaderData } from 'react-router-dom';
    import &#123; Tab, Tabs, TabList, TabPanel &#125; from 'react-tabs';
    import 'react-tabs/style/react-tabs.css';
    import Book from '../components/Book/Book';
    import &#123; getStoredBook &#125; from '../../utility/getStoredBook';
    import &#123; addToStoredDB &#125; from '../../utility/addToDB';
    import &#123; getItem &#125; from '../../utility/addLocalStorage'; // Corrected import

    const ReadList = () => &#123;
        const [readList, setReadList] = useState([]);
        const [sort, setSort] = useState('');
        const allBooks = useLoaderData();

        useEffect(() => &#123;
            const storedReadList = getStoredBook();
            const storedReadListInt = storedReadList.map(id => parseInt(id));

            // Use getItem instead of storedReadList
            const storedIds = getItem();
            const readBookList = allBooks.filter(book => storedIds.includes(book.bookId));
            setReadList(readBookList);
        &#125;, [allBooks]);

        const handleSort = (sortType) => &#123;
            setSort(sortType);
            if (sortType === 'No of pages') &#123;
                const sortedReadList = [...readList].sort((a, b) => a.totalPages - b.totalPages);
                setReadList(sortedReadList);
            &#125;

            if (sortType === 'Ratings') &#123;
                const sortedReadList = [...readList].sort((a, b) => a.rating - b.rating);
                setReadList(sortedReadList);
            &#125;
        &#125;

          const handleMarkAsRead = (id) => &#123;
            addToStoredDB(id);
            //  Show a SweetAlert confirmation, and update the button appearance.  This would be better done in the component where the button is.
            alert(`Book with ID $&#123;id&#125; marked as read!`); // Basic alert for demonstration
            //  You'd likely want to update state here to change button appearance.
        &#125;;

        return (
            &lt;div&gt;
                &lt;h3 className="text-3xl my-8"&gt;Listed Books&lt;/h3&gt;
                &lt;div className="dropdown"&gt;
                    &lt;div tabIndex=&#123;0&#125; role="button" className="btn m-1"&gt;
                        &#123;sort ? `Sort by: $&#123;sort&#125;` : 'Sort by'&#125;
                    &lt;/div&gt;
                    &lt;ul tabIndex=&#123;0&#125; className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"&gt;
                        &lt;li onClick={() => handleSort('Ratings')}&gt;&lt;a&gt;Ratings&lt;/a&gt;&lt;/li&gt;
                        &lt;li onClick={() => handleSort('No of pages')}&gt;&lt;a&gt;No of pages&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
                &lt;Tabs&gt;
                    &lt;TabList&gt;
                        &lt;Tab&gt;Read List&lt;/Tab&gt;
                        &lt;Tab&gt;Wish List&lt;/Tab&gt;
                    &lt;/TabList&gt;
                    &lt;TabPanel&gt;
                        &lt;h2 className='text-2xl'&gt;Books I read: &#123;readList.length&#125;&lt;/h2&gt;
                        &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"&gt;
                            &#123;readList.map(book => (
                                &lt;div key=&#123;book.bookId&#125;&gt;
                                    &lt;Book key=&#123;book.bookId&#125; book=&#123;book&#125; /&gt;
                                    &lt;button onClick={() => handleMarkAsRead(book.bookId)}&gt;
                                        Mark as Read
                                    &lt;/button&gt;
                                &lt;/div&gt;
                            ))&#125;
                        &lt;/div&gt;
                    &lt;/TabPanel&gt;
                    &lt;TabPanel&gt;
                        &lt;h2 className='text-2xl'&gt;My wish list&lt;/h2&gt;
                    &lt;/TabPanel&gt;
                &lt;/Tabs&gt;
            &lt;/div&gt;
        );
    &#125;;

    export default ReadList;
    </code></pre>

\* **`Book.jsx`**

    <pre><code>
    import React from 'react';

    const Book = (&#123; book &#125;) => &#123;
        return (
            &lt;div className="border rounded-md p-4 shadow-md"&gt;
                &lt;img src=&#123;book.image&#125; alt=&#123;book.title&#125; className="w-full h-48 object-cover rounded-md mb-4" /&gt;
                &lt;h3 className="text-lg font-semibold"&gt;&#123;book.title&#125;&lt;/h3&gt;
                &lt;p className="text-gray-600"&gt;By &#123;book.author&#125;&lt;/p&gt;
                &lt;!-- Add more book details here --&gt;
            &lt;/div&gt;
        );
    &#125;;

    export default Book;
    </code></pre>

\* **`addToDB.js`**

    <pre><code>
    const addToStoredDB = (id) => &#123;
        let shoppingCart = &#123;&#125;;
        const storedCart = localStorage.getItem('shopping-cart');
        if (storedCart) &#123;
            shoppingCart = JSON.parse(storedCart);
        &#125;

        const quantity = shoppingCart[id];
        if (quantity) &#123;
            const newQuantity = quantity + 1;
            shoppingCart[id] = newQuantity;
        &#125; else &#123;
            shoppingCart[id] = 1;
        &#125;
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    &#125;

    export &#123; addToStoredDB &#125;;
    </code></pre>

\* **`getStoredBook.js`**

    <pre><code>
    const getStoredBook = () => &#123;
        let shoppingCart = &#123;&#125;;
          const storedCart = localStorage.getItem('shopping-cart');
          if (storedCart)&#123;
              shoppingCart = JSON.parse(storedCart);
          &#125;
        const keys = Object.keys(shoppingCart);
        return keys;
    &#125;;
    export &#123;getStoredBook&#125;
    </code></pre>

\* **`addLocalStorage.js`**

    <pre><code>
    // addLocalStorage.js
    const getItem = () => &#123;
        const stored = localStorage.getItem('readList');
        if (stored) &#123;
            return JSON.parse(stored);
        &#125;
        return [];
    &#125;;

    const setItem = (item) => &#123;
        localStorage.setItem('readList', JSON.stringify(item));
    &#125;;

    export &#123; getItem, setItem &#125;;
    </code></pre>

Let me know if you have any other questions or need further assistance.
