import { useForm } from "react-hook-form";
import { css } from "../../../styled-system/css";
import { useAuth } from "../../hooks/useLoginValidation";
import { MainLayout } from "../../layouts/MainLayout";
import type { components } from "../../api/generated/types";
import { useEffect } from "react";
import { updateUser } from "../../api/client";
import { authTokenAtom } from "../../lib/Atoms";
import { useAtomValue } from "jotai";
import { Button } from "../../components/Button";

function App() {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm<
    components["schemas"]["UpdateUser"]
  >({
    defaultValues: {
      name: user?.name || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [user, reset]);

  const token = useAtomValue(authTokenAtom);

  const onSubmit = async (data: components["schemas"]["UpdateUser"]) => {
    const res = await updateUser(token.token, data);
    if (res.error) {
      alert(res.error);
    } else {
      alert("User updated successfully");
    }
    window.location.reload();
    reset();
  };

  return (
    <MainLayout>
      <h1
        className={css({
          fontSize: "1.7rem",
          fontWeight: "700",
          color: "#333",
        })}
      >
        Account Settings
      </h1>
      <div>
        <div>
          <a href="/users/me">
            <Button>Update my information</Button>
          </a>
        </div>
        <div>
          <a href="/users/other">
            <Button>Update other user</Button>
          </a>
        </div>
        <div>
          <a href="/users/invite">
            <Button>Invite user</Button>
          </a>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
