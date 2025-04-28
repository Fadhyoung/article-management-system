"use client";

import Typography from "@/components/Typography";
import { Controller } from "react-hook-form";
import Input from "@/components/Input";
import { PASSWORD_REGEX } from "@/constants/regex";
import Button from "@/components/Button";
import Link from "next/link";
import { APP_LOGIN } from "@/constants";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRegister } from "@/app/auth/register/hooks";

export default function RegisterPage() {
  const { control, errors, handleSubmit, handleSubmitRegister, t } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitRegister)}
      className="w-full space-y-4 flex flex-col justify-center"
    >
      <div>
        <Controller
          name="username"
          defaultValue=""
          control={control}
          rules={{
            required: t("usernameRequired"),
          }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label={t("username")}
              placeholder={t("usernamePlaceholder")}
              isError={!!fieldState.error}
              errorText={fieldState.error?.message}
              variant="primary"
              size="md"
              radius="md"
              required
            />
          )}
        />
      </div>

      <div className="relative">
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{
            required: t("passwordRequired"),
            minLength: {
              value: 6,
              message: t("passwordLengthInvalid"),
            },
            pattern: {
              value: PASSWORD_REGEX,
              message: t("passwordFormatInvalid"),
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                label={t("password")}
                placeholder={t("passwordPlaceholder")}
                isError={!!fieldState.error}
                errorText={fieldState.error?.message}
                variant="primary"
                size="md"
                radius="md"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </>
          )}
        />
      </div>

      <div>
        <Controller
          name="role"
          defaultValue=""
          control={control}
          rules={{
            required: t("roleRequired"),
          }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label={t("role")}
              placeholder={t("rolePlaceholder")}
              isError={!!fieldState.error}
              errorText={fieldState.error?.message}
              variant="primary"
              size="md"
              radius="md"
              required
            />
          )}
        />
      </div>

      <Button
        variant="primary"
        buttonType="solid"
        type="submit"
        radius="lg"
        size="md"
        className="w-full"
        disabled={!errors}
      >
        {t("register")}
      </Button>

      <Typography
        variant="black"
        type="body"
        className="flex gap-5 justify-center text-center"
      >
        {t("alreadyHaveAccount")}{" "}
        <Link href={APP_LOGIN} className="text-primary">
          {t("login")}
        </Link>
      </Typography>
    </form>
  );
}
