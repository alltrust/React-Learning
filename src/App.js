import React, { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("React");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  console.log(searchTerm);
  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLocaleLowerCase());
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
        return (
          <Item
            key={item.objectID}
            title={item.title}
            url={item.url}
            author={item.author}
            num_comments={item.num_comments}
            points={item.points}
          />
        );
      })}
    </div>
  );
};

const Item = ({ title, url, author, num_comments, points }) => {
  console.log("item renders");
  return (
    <div>
      <a href={url}>{title}</a>
      <span> {author}</span>
      <span> {num_comments}</span>
      <span> {points}</span>
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
