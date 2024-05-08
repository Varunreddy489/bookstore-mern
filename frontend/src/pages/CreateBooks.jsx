import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const handleSaveBook = async () => {
    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/books", data);
      setLoading(false); 
      navigate("/");
    } catch (error) {
      setLoading(false); 
      console.error("Error in creating book:", error);
     
      alert("Error occurred while creating book."); 
    }
  };
  return (
    <div className=" p-4">
      <BackButton />
      <h1 className="text-3xl my-4 ">Create Book</h1>
      {loading ? <Spinner x/> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter the Book Title"
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter the Book Author"
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            placeholder="Enter the Book Publish Year"
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 rounded  " onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;