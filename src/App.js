import React, { useState, useEffect } from "react";

const welcome = {
  greeting: "Hey ",
  title: "React",
};

const App = () => {
  console.log("app renders");
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || "React"
  );
  useEffect(()=>{
    localStorage.setItem("search", searchTerm);
  },[searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  console.log(searchTerm);
  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>
        {welcome.greeting}
        {welcome.title}
      </h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
};

const List = ({ list }) => {
  console.log("list renders");
  return (
    <div>
      {list.map((item) => {
        return <Item key={item.objectID} item={item} />;
      })}
    </div>
  );
};

const Item = ({ item }) => {
  console.log("item renders");
  return (
    <div>
      <a href={item.url}>{item.title}</a>
      <span> {item.author}</span>
      <span> {item.num_comments}</span>
      <span> {item.points}</span>
    </div>
  );
};

const Search = ({ search, onSearch }) => {
  console.log("seach renders");
  // const {search, onSearch} = props
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={onSearch} value={search} />
    </div>
  );
};

export default App;
