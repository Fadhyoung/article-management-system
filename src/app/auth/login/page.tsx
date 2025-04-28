"use client";

import Typography from "@/components/Typography";
import { Controller } from "react-hook-form";
import Input from "@/components/Input";
import { PASSWORD_REGEX } from "@/constants/regex";
import { useLogin } from "@/app/auth/login/hooks";
import Button from "@/components/Button";
import Link from "next/link";
import { APP_REGISTER } from "@/constants";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const {
    control,
    errors,
    showPassword,
    handleSubmit,
    handleSubmitLogin,
    t,
    togglePasswordVisibility,
  } = useLogin();

  return (
    <form
      onSubmit={handleSubmit(handleSubmitLogin)}
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

      <Button
        variant="primary"
        buttonType="solid"
        type="submit"
        radius="lg"
        size="md"
        className="w-full"
        disabled={!errors}
      >
        {t("login")}
      </Button>

      <Typography
        variant="black"
        type="body"
        className="flex gap-5 justify-center text-center"
      >
        {t("dontHaveAnAccoutn")}{" "}
        <Link href={APP_REGISTER} className="text-primary">
          {t("register")}
        </Link>
      </Typography>
    </form>
  );
}
