import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { css } from "../../../../styled-system/css";
import { signUp } from "../../../api/client";
import type { components } from "../../../api/generated/types";
import { useAuth } from "../../../hooks/useLoginValidation";
import { MainLayout } from "../../../layouts/MainLayout";
import { authTokenAtom } from "../../../lib/Atoms";

function App() {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm<
    components["schemas"]["CreateUserFromAdmin"]
  >({
    defaultValues: {
      name: user?.name || "",
      login: "",
      password: "",
      role: "user",
    },
  });
  const token = useAtomValue(authTokenAtom);

  const onSubmit = async (
    data: components["schemas"]["CreateUserFromAdmin"]
  ) => {
    const res = await signUp(token.token, data);
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
        Invite users to your organization
      </h1>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        })}
      >
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
            Register User
          </h2>
          <p>
            At this screen, you can register a new user to your organization. It
            requires SUPER_ADMIN role.
          </p>
          <div>
            <label htmlFor="login">Login</label>
            <input
              {...register("login")}
              placeholder="jeremy@t2gate.hnd.aeromate"
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
              placeholder="Jeremy / HNDT2Gate"
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
            <label htmlFor="password">New Password</label>
            <input
              {...register("password")}
              type="password"
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
