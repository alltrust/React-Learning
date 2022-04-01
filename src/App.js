import React, { useState, useEffect, useRef, useReducer } from "react";
import axios from "axios";

import styles from "./App.module.css";
import { ReactComponent as Check } from "./check.svg";

const welcome = {
  greeting: "Hey ",
  title: "React",
};

const useSemiPersistantState = (key, initialValue) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialValue);
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

const actionStories = {
  removeStory: "REMOVE_STORY",
  storiesFetchInit: "STORIES_FETCH_INIT",
  storiesFetchSuccess: "STORIES_FETCH_SUCCESS",
  storiesFetchFailure: "STORIES_FETCH_FAILURE",
};
const {
  storiesFetchFailure,
  storiesFetchInit,
  storiesFetchSuccess,
  removeStory,
} = actionStories;

const storiesReducer = (state, action) => {
  switch (action.type) {
    case storiesFetchInit:
      return { ...state, isLoading: true, isError: false };
    case storiesFetchSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case storiesFetchFailure:
      return { ...state, isLoading: false, isError: true };
    case removeStory:
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error("error");
  }
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const App = () => {
  console.log("app renders");
  const [searchTerm, setSearchTerm] = useSemiPersistantState("search", "React");

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: storiesFetchInit });
    try {
      const result = await axios.get(url);
      dispatchStories({ type: storiesFetchSuccess, payload: result.data.hits });
    } catch {
      dispatchStories({ type: storiesFetchFailure });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({ type: removeStory, payload: item });
    // dispatchStories({type: "SET_STORIES", payload: newStories});
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };
  // const searchedStories = stories.data.filter((story) => {
  //   return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  return (
    <div className={styles.container}>
      <h1 className={styles.headlinePrimary}>
        {welcome.greeting}
        {welcome.title}
      </h1>
      <SearchForm
        onSearchSubmit={handleSearchSubmit}
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
      />
      <PracticeClassComponent />
      <hr />
      {stories.isError && <p>...something went wrong</p>}
      {stories.isLoading ? (
        <p>...Loading </p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

class PracticeClassComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <h3>class component</h3>
        <input
          type="text"
          value={this.state.value}
          onChange={this.onChange}
        ></input>
        <h2>{this.state.value}</h2>
      </div>
    );
  }
}

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => {
  return (
    <form className={styles.search} onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        label="search"
        value={searchTerm}
        onInputChange={onSearchInput}
        isFocused
      >
        Search:
      </InputWithLabel>
      <button
        className={`${styles.button} ${styles.buttonLarge}`}
        type="submit"
        disabled={!searchTerm}
      >
        Submit
      </button>
    </form>
  );
};

const List = ({ list, onRemoveItem }) => {
  console.log("list renders");
  return (
    <>
      {list.map((item) => {
        return (
          <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
        );
      })}
    </>
  );
};

const Item = ({ item, onRemoveItem }) => {
  // const handleRemoveItem = ()=>{
  //   onRemoveItem(item)
  // }
  console.log("item renders");
  return (
    <li className={styles.item}>
      <span style={{ width: "40%" }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: "30%" }}> {item.author}</span>
      <span style={{ width: "10%" }}> {item.num_comments}</span>
      <span style={{ width: "10%" }}> {item.points}</span>
      <span style={{ width: "10%" }}>
        <button
          className={`${styles.button} ${styles.buttonSmall}`}
          type="button"
          onClick={() => onRemoveItem(item)}
        >
          <Check height="18px" width="18px"/>
        </button>
      </span>
      <br />
    </li>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  children,
  isFocused,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  console.log("search renders");
  // const {search, onSearch} = props
  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
      &nbsp;
      <input
        id={id}
        type={type}
        onChange={onInputChange}
        value={value}
        ref={inputRef}
        className={styles.input}
      />
    </div>
  );
};

export default App;
