const ButtonGroup = ({
  dates,
  handleClick,
  handlePrevious,
  handleNext,
  currentIndex,
}) => {
  return (
    <section className="btn-group">
      <button onClick={handlePrevious}>Previous</button>
      {dates &&
        dates.length > 0 &&
        dates.map((date: any, index: number) => (
          <button
            key={index}
            onClick={() => handleClick(date, index)}
            className={dates[currentIndex] === date ? "active" : ""}
          >
            {date}
          </button>
        ))}
      <button onClick={handleNext}>Next</button>
    </section>
  );
};

export default ButtonGroup;
