import {
useEffect,
useState
} from "react";

import {
addUser,
editUser
}
from "../services/userApi";

import {
validateUser
}
from "../utils/validation";

function UserForm({
users,
setUsers,
selectedUser,
setSelectedUser
}) {

const initialState = {
firstName: "",
lastName: "",
email: "",
department: ""
};

const [form, setForm] =
useState(initialState);

const [error, setError] =
useState("");

useEffect(() => {

if (selectedUser) {
setForm(selectedUser);
}

}, [selectedUser]);

function handleChange(e) {

setForm({
...form,
[e.target.name]:
e.target.value
});

}

async function handleSubmit(e) {

e.preventDefault();

const validation =
validateUser(form);

if (validation) {
setError(validation);
return;
}

setError("");

try {

if (selectedUser) {

await editUser(
selectedUser.id,
form
);

setUsers(
users.map((user) =>
user.id === selectedUser.id
? {
...form,
id:
selectedUser.id
}
: user
)
);

} else {

const res =
await addUser(form);

setUsers([
{
...form,
id:
res.data.id
},
...users
]);

}

setForm(initialState);

setSelectedUser(null);

} catch {

alert(
"Something went wrong"
);

}

}

return (

<div>

<h2>

{
selectedUser
? "Edit User"
: "Add User"
}

</h2>

{error && (
<p>{error}</p>
)}

<form
onSubmit={
handleSubmit
}
>

<input
type="text"
name="firstName"
placeholder="First Name"
value={form.firstName}
onChange={handleChange}
/>

<input
type="text"
name="lastName"
placeholder="Last Name"
value={form.lastName}
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
/>

<input
type="text"
name="department"
placeholder="Department"
value={form.department}
onChange={handleChange}
/>

<button
type="submit"
>

{
selectedUser
? "Update"
: "Add"
}

</button>

</form>

</div>

);

}

export default UserForm;