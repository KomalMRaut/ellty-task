import "./App.css";
import { useState, useEffect } from "react"

export default function App() {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [values, setValues] = useState({})
  const [allSelected, setAllSelected] = useState(false)

  const handleSelectAll = (e) => {
    const { checked } = e.target
    const updatedValues = {}
    Object.keys(values).forEach(key => {
      updatedValues[key] = checked
    })
    setAllSelected(checked)
    setValues(updatedValues)
  }

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const updatedValues = { ...values };
    updatedValues[name] = checked;
    if (Object.values(updatedValues).every(val => val)) {
      setAllSelected(true)
    } else {
      setAllSelected(false)
    }
    setValues(updatedValues)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)
  }

  useEffect(() => {
    const options = ["Page 1", "Page 2", "Page 3", "Page 4"]
    setDropdownOptions(options);
    const optionValues = {}
    options.forEach(option => optionValues[option] = false)
    setValues(optionValues)
  }, [])

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="card">
        <label className="card__all-selection">
          <span>All Pages</span>
          <input type="checkbox" name="allSelected" onChange={handleSelectAll} checked={allSelected} />
        </label>
        <hr />
        <div className="card__option-selection">
          {dropdownOptions.map(option => <label key={option} className="card_option-selection_option">
            <span>{option}</span>
            <input type="checkbox" name={option} checked={values[option]} onChange={handleChange} />
          </label>)}
        </div>
        <hr />
        <button className="card__btn">
          Done
        </button>
      </div>
    </form>
  );
}