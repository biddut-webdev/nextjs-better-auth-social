
"use client";

import { updateUser, changePassword } from "@/lib/auth-client";
import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";

export default function ProfilePage() {
  // Update User Name
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    console.log("profile form data", userData);

    const resData = await updateUser({
      name: userData.name,
    });

    console.log("after submit", resData);

    toast.success("User name updated successfully");
  };

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const passwordData = Object.fromEntries(formData.entries());

    console.log("password form data", passwordData);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.danger("New passwords do not match");
      return;
    }

    const resData = await changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    console.log("change password response", resData);

    if (resData?.error) {
      toast.danger(resData.error.message || "Failed to change password");
      return;
    }

    toast.success("Password changed successfully");
  };

  return (
    <div className="w-full max-w-96">

      {/* Profile Settings */}
      <Form onSubmit={handleUpdateUser}>
        <Fieldset>
          <Fieldset.Legend>Profile Settings</Fieldset.Legend>

          <Description>
            Update your profile information.
          </Description>

          <FieldGroup>
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }

                return null;
              }}
            >
              <Label>Name</Label>
              <Input placeholder="John Doe" />
              <FieldError />
            </TextField>
          </FieldGroup>

          <Fieldset.Actions>
            <Button
              type="submit"
              className="text-success-soft-foreground"
              size="sm"
              variant="tertiary"
            >
              <FloppyDisk />
              Save changes
            </Button>

            <Button type="reset" variant="secondary">
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>

      {/* Change Password */}
      <Form
        className="mt-8"
        onSubmit={handleChangePassword}
      >
        <Fieldset>
          <Fieldset.Legend>Change Password</Fieldset.Legend>

          <Description>
            Change your account password.
          </Description>

          <FieldGroup>

            <TextField
              isRequired
              name="currentPassword"
            >
              <Label>Current Password</Label>
              <Input
                type="password"
                placeholder="Current password"
              />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="newPassword"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }

                return null;
              }}
            >
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="New password"
              />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="confirmPassword"
            >
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                placeholder="Confirm new password"
              />
              <FieldError />
            </TextField>

          </FieldGroup>

          <Fieldset.Actions>
            <Button
              type="submit"
              className="text-success-soft-foreground"
              size="sm"
              variant="tertiary"
            >
              Change Password
            </Button>

            <Button
              type="reset"
              variant="secondary"
            >
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>

    </div>
  );
}

