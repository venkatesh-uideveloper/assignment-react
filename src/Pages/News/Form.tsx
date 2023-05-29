const Form = ({ toggle, form, handleChange, handleClick }) => {
  return (
    <>
      {toggle && (
        <form className="formInput" noValidate>
          <input
            type="text"
            value={form.title}
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <input
            type="text"
            value={form.author}
            placeholder="Author"
            name="author"
            onChange={handleChange}
          />
          <textarea
            rows="3"
            value={form.content}
            placeholder="Content"
            name="content"
            onChange={handleChange}
          ></textarea>
          <button
            type="button"
            onClick={handleClick}
            disabled={
              form.title === "" || form.author === "" || form.content === ""
            }
          >
            Post
          </button>
        </form>
      )}
    </>
  );
};

export default Form;
