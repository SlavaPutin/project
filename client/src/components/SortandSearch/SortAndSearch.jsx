import React from "react";
import MyInput from "../UI/MyInput/MyInput";
import MySelecter from "../UI/Selecter/MySelecter";
import './sortandsearch.css'

const SortAndSearch = (props) =>{
    return(<div className='wrap-search'>
          <MyInput 
          type='text'
          placeholder='Search'
          value={props.query}
          onChange = {(e) =>  props.setQuery(e.target.value)}
          style={{width: '50%'}}
          />
          <MySelecter 
          value={props.sort}
          onChange={(selectSort) => {props.setSort(selectSort)}}
          options={[
            {name: 'Сначало новые', value: 'new'},
            {name: 'Сначало старые', value: 'old'},
            {name: 'Сначала популярные', value: 'popular'}
          ]}
          />
        </div>)
}

export default SortAndSearch;