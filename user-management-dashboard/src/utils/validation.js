export function validateUser(form) {

if (!form.firstName.trim()) {
return "First name is required";
}

if (!form.lastName.trim()) {
return "Last name is required";
}

if (!form.email.trim()) {
return "Email is required";
}

const emailRegex =
/^\S+@\S+\.\S+$/;

if (!emailRegex.test(form.email)) {
return "Enter valid email";
}

if (!form.department.trim()) {
return "Department is required";
}

return null;

}