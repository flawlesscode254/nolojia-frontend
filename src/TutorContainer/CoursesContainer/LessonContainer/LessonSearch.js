import React, { useState, useEffect } from "react";
import LessonCard from "../../../components/tutors/Lessons/LessonCard";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import AddLesson from "./AddLesson";
const LessonSearch = () => {
  const [open, setOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const courseId = useLocation().pathname.split("/")[4];
  const query = useLocation().search;
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://nolojia.herokuapp.com/api/nolojia/v1/lessons/search/${courseId}${query}`,
          {
            withCredentials: true,
          }
        );
        setLessons(res.data);

        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);
  const handleSearch = () => {
    navigate(`/admin/courses/lessons/${courseId}/searchlesson?q=${input}`);
  };
  return (
    <div className="lesson-panel-tutor">
      <div className="search-bar-tutor">
        <input
          type="text"
          placeholder="Search Lesson"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button onClick={handleSearch} className="btn">
          Search
        </button>
      </div>
      <button onClick={() => setOpen(true)} className="btn">
        Add lesson
      </button>
      {loading ? (
        <div className="middle">
          <ReactLoading type="spin" color="#101050" height={200} width={75} />
        </div>
      ) : (
        <>
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </>
      )}
      {open && <AddLesson setOpen={setOpen} />}
    </div>
  );
};

export default LessonSearch;
