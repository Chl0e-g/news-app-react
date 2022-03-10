function SortDropDown({sortBy, setSortBy}) {
  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <>
    <div className="uk-width-medium uk-width-xlarge@s uk-width-2xlarge@m ukwidth-3xlarge@l">
      <form className="uk-flex uk-align-right">
        <label className="uk-text-muted uk-margin-right form-label-top-margin" htmlFor="sortSelector">
          Sort by:</label>
          <div className="uk-form-controls">
          <select value={sortBy} onChange={handleChange} className="uk-select" id="sortSelector">
            <option value="Most likes">Most likes</option>
            <option value="Most comments">Most comments</option>
            <option value="Newest first">Newest first</option>
            <option value="Oldest first">Oldest first</option>
          </select></div>
        
      </form></div>
    </>
  );
}

export default SortDropDown;
