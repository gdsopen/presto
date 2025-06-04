import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import { useAuth } from "../../../hooks/useLoginValidation";
import { MainLayout } from "../../../layouts/MainLayout";
import type { components } from "../../../api/generated/types";
import { useEffect, useState } from "react";
import { getAllUsers, updateOtherUser } from "../../../api/client";
import { authTokenAtom } from "../../../lib/Atoms";
import { useAtomValue } from "jotai";

function App() {
  const { user } = useAuth();
  const { register, handleSubmit, reset, setValue } = useForm<
    components["schemas"]["UpdateOtherUser"]
  >({
    defaultValues: {
      name: user?.name || "",
      login: "",
      currentPassword: "",
      newPassword: "",
      role: "",
    },
  });
  const token = useAtomValue(authTokenAtom);
  const [users, setUsers] = useState<components["schemas"]["User"][]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  useEffect(() => {
    if (token.token) {
      const fetchUsers = async () => {
        const res = await getAllUsers(token.token);
        setUsers(res.data || []);
      };
      fetchUsers();
    }
  }, [token]);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    const selectedUser = users.find((u) => u.id === userId);
    if (selectedUser) {
      setValue("name", selectedUser.name || "");
      setValue("login", selectedUser.login || "");
      setValue("role", selectedUser.role || "");
    }
  };

  const onSubmit = async (data: components["schemas"]["UpdateOtherUser"]) => {
    const res = await updateOtherUser(token.token, data);
    if (res.error) {
      alert(res.error);
    } else {
      alert("User updated successfully");
    }
    reset();
  };

  useEffect(() => {
    if (user) {
      if (user.role !== "super_admin") {
        window.location.href = "/users";
      }
    }
  }, [user]);

  return (
    <MainLayout>
      <h1
        className={css({
          fontSize: "1.7rem",
          fontWeight: "700",
          color: "#333",
        })}
      >
        Update users in your organization
      </h1>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          })}
        >
          <label htmlFor="userSelect">Select User</label>
          <select
            id="userSelect"
            value={selectedUserId}
            onChange={(e) => handleUserSelect(e.target.value)}
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
            })}
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.login})
              </option>
            ))}
          </select>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px 10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#e0f8ff",
          })}
        >
          <h2
            className={css({
              fontSize: "1.2rem",
              fontWeight: "700",
              color: "#333",
            })}
          >
            Update User
          </h2>
          <p>
            At this screen, you can update the users information in your
            organization. It requires SUPER_ADMIN role.
          </p>
          <div>
            <label htmlFor="login">Login</label>
            <input
              {...register("login")}
              autoComplete="new-password"
              className={css({
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: "#fff",
              })}
            />
          </div>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            })}
          >
            <label htmlFor="name">Name</label>
            <input
              {...register("name")}
              autoComplete="new-password"
              className={css({
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: "#fff",
              })}
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <select
              {...register("role")}
              autoComplete="new-password"
              className={css({
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: "#fff",
              })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            })}
          >
            <label htmlFor="newPassword">New Password</label>
            <input
              {...register("newPassword")}
              type="password"
              autoComplete="new-password"
              className={css({
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: "#fff",
              })}
            />
          </div>
          <div
            className={css({
              padding: "10px",
              marginY: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#fff",
            })}
          >
            <p>To confirm your changes, please enter your current password.</p>
            <label
              htmlFor="currentPassword"
              className={css({
                fontWeight: "700",
                color: "#333",
              })}
            >
              Current Password
            </label>
            <input
              {...register("currentPassword")}
              type="password"
              autoComplete="current-password"
              className={css({
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: "#fff",
              })}
            />
          </div>
          <button
            type="submit"
            className={css({
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "#000",
              color: "#fff",
              fontWeight: "700",
              cursor: "pointer",
            })}
          >
            Update
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

export default App;
