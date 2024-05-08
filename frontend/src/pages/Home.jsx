import { Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineAddBox } from "react-icons/md";
import { useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        console.log(response.data);
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Ensure this runs even if there's an error
      }
    };

    fetchBooks(); // Call the async function
  }, []);
  return (
    <div className="p-2">
      <div className="flex justify-center items-center gap-x-4 pt-4 ">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
      </div>
      <div>
        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
      <div className="text-center" >
        <Link to="/books/create">
          <MdOutlineAddBox className="  text-4xl" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
