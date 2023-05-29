import { useEffect, useState } from "react";
import { getFetchNews } from "./utils";
import "./News.css";
import Form from "./Form";
const News = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [form, setForm] = useState({
    id: 0,
    title: "",
    author: "",
    content: "",
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getFetchNews();
      setData(data);
    } catch (error) {
      alert(error);
    }
  };
  const handleClick = async () => {
    const formData = { ...form, id: data.length + 1 };
    const rawResponse = await fetch("http://localhost:3001/news", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const content = await rawResponse.json();
    console.log(content);
    setData([...data, content]);
    setToggle(false);
    setForm({
      id: 0,
      title: "",
      author: "",
      content: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <section className="formWrapper">
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          Create new Post
        </button>
        <Form
          toggle={toggle}
          form={form}
          handleChange={handleChange}
          handleClick={handleClick}
        />
        <div className="responsiveTable">
          <table id="news">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>author</th>
                <th>content</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((d, i) => (
                  <tr key={i}>
                    <td>{d.id}</td>
                    <td>{d.title}</td>
                    <td>{d.author}</td>
                    <td>{d.content}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default News;
