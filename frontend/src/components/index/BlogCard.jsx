import { blogData } from "../../staticData/data";
import { useNavigate } from "react-router-dom";

function BlogCard() {
  const navigate = useNavigate();

  // Get only the 4 latest blogs sorted by date
  const sortedBlogs = blogData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const blogDataElement = sortedBlogs.map((blog) => {
    return (
      <div
        onClick={() => navigate(`/blog/${blog.id}`)}
        key={blog.id}
        className="bg-white p-3 border border-spacing-1 rounded-xl  shadow-md hover:shadow-lg transition-shadow duration-300 h-auto md:h-[250px]"
      >
        <div className="overflow-hidden group relative w-full md:w-[100%]">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-[100%] h-48 md:h-80 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="p-4 md: flex flex-col justify-between">
          <p className="text-[15px] font-semibold mb-2 text-gray-500 uppercase">
            {blog.category}
          </p>
          <h3 className="text-[20px] font-semibold text-gray-800 leading-loose ">
            {blog.title}
          </h3>

          <button
            onClick={() => navigate(`/blog/${blog.id}`)}
            className="mt-4 md:mt-16 text-teal-800 text-sm font-medium flex items-center gap-2 hover:underline font-semibold"
          >
            View More <span>→</span>
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className="text-center capitalize underline font-bold mt-4 md:text-4xl">
        our latest blogs and news{" "}
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center overflow-hidden gap-4 w-full md:w-[95%] p-2 pt-5 pb-5 m-auto">
        {blogDataElement}
      </div>
    </div>
  );
}

export default BlogCard;
