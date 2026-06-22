function FilterPopup({
filters,
setFilters
}) {

function update(e){

setFilters({
...filters,
[e.target.name]:
e.target.value
})

}

return (

<div>

<h3>Filters</h3>

<input
name="firstName"
placeholder="First Name"
onChange={update}
/>

<input
name="lastName"
placeholder="Last Name"
onChange={update}
/>

<input
name="email"
placeholder="Email"
onChange={update}
/>

<input
name="department"
placeholder="Department"
onChange={update}
/>

</div>

)

}

export default FilterPopup;