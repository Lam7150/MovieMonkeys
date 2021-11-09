import React from 'react';
import { Select, Input, InputNumber } from 'antd';
import { GENRES, COUNTRIES, YEARS, RATINGS } from "../utils/constants";
import '../css/Filters.css';
import { capitalize } from '../utils/utils';

const { Option } = Select;
const { Search } = Input;

function Filters(props) {
  const { setGenre, setRating, setYear, setCountry, setName } = props;

  function handleNameChange(value) {
    setName(value.toLowerCase());
  }

  function handleGenreChange(value) {
    setGenre(value);
  }

  function handleRatingChange(value) {
    setRating(parseInt(value));
  }

  function handleYearChange(value) {
    setYear(value);
  }

  function handleCountryChange(value) {
    setCountry(value);
  }

  return (
    <div className="filter-wrapper">
      <div className="flex-row">
        <div className="filter-title"> Filter By: </div>
        <Select className="filter-select" showSearch placeholder="Genre" style={{ width: 120 }} allowClear onChange={handleGenreChange}>
          {GENRES.map(genre => (
            <Option value={genre}>{capitalize(genre)}</Option>
          ))}
        </Select>
        <Select className="filter-select" showSearch placeholder="Country" style={{ width: 120 }} allowClear onChange={handleCountryChange}>
          {COUNTRIES.map(country => (
            <Option value={country}>{capitalize(country)}</Option>
          ))}
        </Select>
        <Select className="filter-select" showSearch placeholder="Year" style={{ width: 120 }} allowClear onChange={handleYearChange}>
          {YEARS.map(year => (
            <Option value={year}>{year}</Option>
          ))}
        </Select>
        <Select className="filter-select" showSearch placeholder="Rating" style={{ width: 120 }} allowClear onChange={handleRatingChange}>
          {RATINGS.map(rating => (
            <Option value={rating}>{rating}</Option>
          ))}
        </Select>
      </div>
      <div className="flex-row">
        <Search className="filter-search" placeholder="Name" allowClear onSearch={handleNameChange} style={{ width: 200 }} />
      </div>
    </div>
  );
}

export default Filters;
