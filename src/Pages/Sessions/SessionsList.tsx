import { useState, memo, useEffect } from "react";
import userIcon from "./../../assets/user_icon.png";

const SessionsList = ({ data }) => {
  const [group, setGroup] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      const grpList = Array.from(
        new Set(data.map((item: any) => item.group.name))
      );
      setGroup(grpList);
      setFilterData(data);
      setSelectValue("");
    }
  }, [data]);

  const handleChange = (e: any) => {
    const val = e.target.value;
    const filterData = data.filter((d: any) => d.group.name === val);
    setSelectValue(val);
    setFilterData(val !== "" ? filterData : data);
  };

  const updatePresenceStatus = (id: number, presence: string) => {
    const filterData = data.map((d: any) =>
      d.id === id
        ? {
            ...d,
            presence:
              presence === "unknown"
                ? "present"
                : presence === "present"
                ? "picked up"
                : "unknown",
          }
        : d
    );
    setFilterData(filterData);
    // if (presence === "unknown") {
    //   setPresenceStatus("present");
    // } else if (presence === "present") {
    //   setPresenceStatus("picked up");
    // } else {
    //   setPresenceStatus("unknown");
    // }
  };

  //   let buttonLabel;
  //   if (presenceStatus === "unknown") {
  //     buttonLabel = "Present";
  //   } else if (presenceStatus === "present") {
  //     buttonLabel = "Picked Up";
  //   } else {
  //     buttonLabel = "Unknown";
  //   }

  return (
    <>
      <div className="filterDropdown">
        Filter:{" "}
        <select onChange={(e) => handleChange(e)} value={selectValue}>
          <option value="">All</option>
          {group &&
            group.length > 0 &&
            group.map((g, i) => (
              <option key={i} value={g}>
                {g}
              </option>
            ))}
        </select>
      </div>
      <section className="cardsView">
        {filterData &&
          filterData.length > 0 &&
          filterData.map((d: any) => (
            <div key={d.id} className="cardWrapper">
              <div className="card">
                <h1>
                  <span>{d.name}</span>
                  <small className="time">{d.group.name}</small>
                </h1>
                <div className="image">
                  <img src={d.avatar ? d.avatar : userIcon} alt={d.name} />
                </div>
                <div className="dateTime">
                  {d.day}{" "}
                  <small>
                    {d.start_time}- {d.end_time}
                  </small>
                </div>
                <div className="action">
                  {d.product_name}
                  <button
                    onClick={() => updatePresenceStatus(d.id, d.presence)}
                  >
                    {d.presence}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default memo(SessionsList);
