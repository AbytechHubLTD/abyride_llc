import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogData } from "../../staticData/data";
import {
  FaComment,
  FaUserShield,
  FaCalendarAlt,
  FaRegSave,
  FaCheck,
  FaQuoteRight,
  FaSearch,
} from "react-icons/fa";
import Header from "../Header";

function BlogDetails() {
  const { id } = useParams(); // Extract 'id' directly
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const blogDetail = blogData.find((blog) => blog.id === parseInt(id)); // Use 'id' instead of 'blogId'
    setBlog(blogDetail);
  }, [id]);

  const recentPosts = blogData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const recentPostElement = recentPosts.map((post) => (
    <li
      onClick={() => navigate(`/blog/${post?.id}`)}
      key={post?.id}
      className="flex items-center shadow-sm cursor-pointer transition-shadow hover:shadow-md duration-200 xl:p-2 p-3 bg-white rounded px-4 md:flex-col xl:flex-row"
    >
      <img
        src={post?.image}
        alt="Recent Post"
        className="w-[70px] h-[70px] rounded-lg mr-4 object-cover"
      />
      <p className="flex flex-col gap-1 overflow-hidden md:text-sm">
        <h3
          onClick={() => navigate(`/blog/${post?.id}`)}
          className="text-base sm:text-base md:text-sm lg:text-base xl:text-lg font-semibold hover:text-gray-600 text-[.9rem] cursor-pointer"
        >
          {post?.title}
        </h3>
        <small className="text-sm text-gray-500">{post?.date}</small>
      </p>
    </li>
  ));

  if (!blog) {
    return (
      <div className="text-center py-10">
        <Header title="Blog not found" />
        <p className="text-gray-600">
          The blog you're looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <Header title={blog?.title} />
      <section className=" mx-auto py-8 flex flex-col md:flex-row">
        {/* Main Content */}
        <div className=" md:w-4/5 px-4">
          <div className="rounded-lg overflow-hidden">
            <img
              src={blog?.image}
              alt={blog?.title}
              className="w-full h-[500px] object-cover rounded-xl"
            />
            <div className="p-4 text-sm md:text-md flex gap-3 items-center">
              <p className="flex items-center gap-1">
                <FaUserShield /> <span className="text-gray-500">Admin</span>
              </p>
              <p className="flex items-center gap-1">
                <FaCalendarAlt />{" "}
                <span className="text-gray-500">{blog?.date}</span>
              </p>

              <p className="flex items-center gap-1">
                <FaRegSave />{" "}
                <span className="text-gray-500">{blog?.category}</span>
              </p>
            </div>
            <hr className="h-[2px] bg-black mb-2" />
          </div>

          {/* Blog Body */}
          <div className="mt-6">
            <p className="text-gray-600 mb-6">{blog?.content}</p>
            <blockquote className="border-l-4 border-sky-500 p-4 bg-gray-300 italic text-gray-700 mb-4">
              <div className="flex gap-2 items-center mb-1">
                <FaQuoteRight size={28} className="text-sky-500" />
                <span className="text-lg font-bold">{blog?.quote}</span>
              </div>
              <span className="text-sky-600">- {blog?.author}</span>
            </blockquote>
          </div>
        </div>

        {/* rigt sidebar little part */}
        <div className="pl-10 md:w-1/3 px-4 mt-8 md:mt-0">
          <div className="mb-6 rounded-2xl py-5 px-4 bg-gray-200">
            <h2 className="text-2xl mb-3 font-semibold">Search</h2>
            <div className="flex items-center px-3 w-full rounded-3xl border border-transparent bg-white border-gray-300 hover:border-gray-300">
              <input
                type="text"
                placeholder="Search here"
                className="w-full border-none outline-none px-4 bg-transparent py-2 "
              />
              <FaSearch className="text-3xl text-gray-300 hover:text-gray-500" />
            </div>
          </div>

          {/* Recent Posts */}
          <div className="mb-6 px-7 py-4 bg-gray-100 rounded-2xl">
            <h3 className="text-lg md:text-2xl capitalize font-semibold mb-5">
              Recent Posts
            </h3>
            <ul className="flex sm:flex-col gap-3">
              {/* post element being sorted according to there date descwnding order😉 */}
              {recentPostElement}
            </ul>
          </div>

          <div className="my-6 bg-gray-100 px-4 py-5 rounded-lg text-center">
            <h3 className="text-lg font-bold mb-4 capitalize">
              How Can We Help?
            </h3>
            <button
              onClick={() => navigate("/contact-us")}
              className="bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-teal-500 capitalize"
            >
              Contact Us
            </button>
          </div>

          {/* Tags */}
          <div className="mb-6 px-7 py-4 bg-gray-100 rounded-2xl">
            <h3 className="text-xl md:3xl font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-200 px-4 flex items-center justify-center py-2 rounded-lg text-sm cursor-pointer hover:text-white hover:bg-sky-400 capitalize">
                Transportation
              </span>
              <span className="bg-gray-200 px-3 flex items-center justify-center py-2 rounded-lg text-sm cursor-pointer hover:text-white hover:bg-sky-400 capitalize">
                {" "}
                Human Care{" "}
              </span>
              <span className="bg-gray-200 px-3 flex items-center justify-center py-2 rounded-lg text-sm cursor-pointer hover:text-white hover:bg-sky-400 capitalize">
                {" "}
                Language translation
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogDetails;
