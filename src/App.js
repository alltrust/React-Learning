import React, { useState, useEffect } from "react";

const welcome = {
  greeting: "Hey ",
  title: "React",
};

const useSemiPersistantState = (key, initialValue)=>{
  const [value, setValue] = useState(
    localStorage.getItem(key) || initialValue
  );
  useEffect(()=>{
    localStorage.setItem(key, value);
  },[value, key]);
  return [value, setValue]
}

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
  
const [searchTerm, setSearchTerm] = useSemiPersistantState('search', 'React')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  console.log(searchTerm);
  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <h1>
        {welcome.greeting}
        {welcome.title}
      </h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </>
  );
};

const List = ({ list }) => {
  console.log("list renders");
  return (
    <>
      {list.map((item) => {
        return <Item key={item.objectID} item={item} />;
      })}
    </>
  );
};

const Item = ({ item }) => {
  console.log("item renders");
  return (
    <>
      <a href={item.url}>{item.title}</a>
      <span> {item.author}</span>
      <span> {item.num_comments}</span>
      <span> {item.points}</span>
      <br/>
    </>
  );
};

const Search = ({ search, onSearch }) => {
  console.log("search renders");
  // const {search, onSearch} = props
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={onSearch} value={search} />
    </div>
  );
};

export default App;
