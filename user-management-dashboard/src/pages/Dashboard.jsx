import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userApi";

import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import FilterPopup from "../components/FilterPopup";
import Pagination from "../components/Pagination";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [sortOrder, setSortOrder] =
    useState("");

  const [filters, setFilters] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });

  const [page, setPage] =
    useState(1);

  const [limit, setLimit] =
    useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);

      const res =
        await getUsers();

      const formatted =
        res.data.map((user) => ({
          id: user.id,
          firstName:
            user.name.split(" ")[0],

          lastName:
            user.name
              .split(" ")
              .slice(1)
              .join(" "),

          email:
            user.email,

          department:
            "Engineering",
        }));

      setUsers(formatted);
    } catch {
      setError(
        "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteUser(id);

      setUsers((prev) =>
        prev.filter(
          (u) => u.id !== id
        )
      );
    } catch {
      alert("Delete failed");
    }
  }

  let filteredUsers =
    users.filter((user) => {
      return (
        (
          user.firstName +
          " " +
          user.lastName
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) &&

        user.firstName
          .toLowerCase()
          .includes(
            filters.firstName.toLowerCase()
          ) &&

        user.lastName
          .toLowerCase()
          .includes(
            filters.lastName.toLowerCase()
          ) &&

        user.email
          .toLowerCase()
          .includes(
            filters.email.toLowerCase()
          ) &&

        user.department
          .toLowerCase()
          .includes(
            filters.department.toLowerCase()
          )
      );
    });

  if (sortOrder === "asc") {
    filteredUsers.sort(
      (a, b) =>
        a.firstName.localeCompare(
          b.firstName
        )
    );
  }

  if (sortOrder === "desc") {
    filteredUsers.sort(
      (a, b) =>
        b.firstName.localeCompare(
          a.firstName
        )
    );
  }

  const start =
    (page - 1) * limit;

  const visibleUsers =
    filteredUsers.slice(
      start,
      start + limit
    );

  return (
    <div className="dashboard">

      <h1>
        User Management Dashboard
      </h1>

      {error && (
        <p>{error}</p>
      )}

      <UserForm
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
        setSelectedUser={
          setSelectedUser
        }
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <FilterPopup
        filters={filters}
        setFilters={setFilters}
      />

      <div>

        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(
              e.target.value
            )
          }
        >
          <option value="">
            Sort
          </option>

          <option value="asc">
            A-Z
          </option>

          <option value="desc">
            Z-A
          </option>

        </select>

     <div className="pagination">

<Pagination
limit={limit}
setLimit={(value)=>{
setLimit(value)
setPage(1)
}}
/>

</div>

      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserTable
          users={visibleUsers}
          onEdit={
            setSelectedUser
          }
          onDelete={
            handleDelete
          }
        />
      )}

      <div>

        <button
          disabled={page === 1}
          onClick={() =>
            setPage(
              page - 1
            )
          }
        >
          Prev
        </button>

        <span>
          Page {page}
        </span>

        <button
          disabled={
            start + limit >=
            filteredUsers.length
          }
          onClick={() =>
            setPage(
              page + 1
            )
          }
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Dashboard;