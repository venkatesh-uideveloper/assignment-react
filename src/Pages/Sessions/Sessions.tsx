import { useState, useEffect } from "react";
import { getFetchSessions, getFetchChildren } from "./utils";
import "./sessions.css";
import SessionsList from "./SessionsList";
import ButtonGroup from "./ButtonGroup";

interface Data {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
  product_name: string;
  child_id: number;
  group: {
    id: number;
    name: string;
  };
  presence: string;
  avatar: string;
  name: string;
}

function Sessions() {
  const [data, useData] = useState([]);
  const [filterData, useFilterData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [dates, useDates] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const filterData: Array<Data> = data.filter(
        (item) => item.day === dates[currentIndex]
      );
      useFilterData(filterData);
    }
  }, [currentIndex, data]);

  const fetchData = async () => {
    try {
      const data = await getFetchSessions();
      const data1 = await getFetchChildren();
      const mergeData: Array<Data> = data.map((item: any) => {
        const { avatar, name } = data1.find(
          (item1: any) => item1.id === item.child_id
        );
        return { ...item, avatar, name };
      });
      const uniqueDays = Array.from(new Set(data.map((item: any) => item.day)));
      const filterData: Array<Data> = mergeData.filter(
        (item) => item.day === uniqueDays[currentIndex]
      );
      useDates(uniqueDays);
      useFilterData(filterData);
      useData(mergeData);
    } catch (error) {
      alert(error);
    }
  };
  const handleClick = (selectedDate: any, index) => {
    const filterData: Array<Data> = data.filter(
      (item) => item.day === selectedDate
    );
    // useSelectedDate(selectedDate);
    setCurrentIndex(index);
    useFilterData(filterData);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dates.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dates.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <ButtonGroup
        dates={dates}
        handleClick={handleClick}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        currentIndex={currentIndex}
      />
      <SessionsList data={filterData} />
    </>
  );
}

export default Sessions;
