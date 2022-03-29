import React, {useState} from "react";

const welcome = {
  greeting: "Hey ",
  title: "React",
};

const App = () => {
  console.log('app renders')
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
const [searchTerm, setSearchTerm] = useState('')
  const handleSearch = (event)=>{
    setSearchTerm(event.target.value)
  }
  console.log(searchTerm)


  return (
    <div>
      <h1>
        {welcome.greeting}
        {welcome.title}
      </h1>
      <Search onSearch= {handleSearch}/>
      <hr />
      <List list={stories} />
    </div>
  );
};

const List = (props) => {
  console.log('list renders')
  return (
    <div>
      {props.list.map((item) => {
        return (
          <Item key={item.objectID} item={item} />
        );
      })}
    </div>
  );
};

const Item = (props) => {
  console.log('item renders')
  return (
    <div>
      <a href={props.item.url}>{props.item.title}</a>
      <span> {props.item.author}</span>
      <span> {props.item.num_comments}</span>
      <span> {props.item.points}</span>
    </div>
  );
};

const Search = (props) => {
  console.log('seach renders'); 
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={props.onSearch} />
    </div>
  );
};

export default App;
