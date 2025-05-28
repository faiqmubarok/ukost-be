import * as yup from "yup";

const emailSchema = yup
  .string()
  .email("Email is not valid")
  .required("Email is required");

const nameSchema = yup.string().required("Name is required");

const roleSchema = yup
  .string()
  .oneOf(["USER", "OWNER", "MANAGER", "ADMIN", "SUPER_ADMIN"])
  .required();

const phoneSchema = yup.string().nullable();

const photoSchema = yup.string().nullable();

export const putUserSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  role: roleSchema,
  phone: phoneSchema,
  photo: photoSchema,
});
