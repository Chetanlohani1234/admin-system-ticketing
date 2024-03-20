import React, { useEffect, useState, Fragment } from "react";

const TagsInput = (props) => {
    const [tags, setTags] = React.useState([]);

    useEffect(() => {
      setTags(props?.tags)
    }, [props]);

    const removeTags = indexToRemove => {
      setTags([...tags.filter((_, index) => index !== indexToRemove)]);
      props.selectedTags(props.index, [...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = (event) => {
      if (event.target.value !== "") {
        setTags([...tags, event.target.value]);
        props.selectedTags(props.index, [...tags, event.target.value]);
        event.target.value = "";
      }
     };
    return (
      <div className="tags-input">
        <ul id="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className='tag-title'>{tag}</span>
              <span className='tag-close-icon'
                onClick={() => removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyDown = {e => {
            if (e.key === 'Enter') e.preventDefault();
          }} 
          onKeyUp = {e => {
            if (e.key === 'Enter') addTags(e);
          }} 
          onBlur = {e => {
             addTags(e);
          }} 
          placeholder="Press enter to add values"
        />
      </div>
    );
};

export default TagsInput;