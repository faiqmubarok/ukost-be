import * as yup from "yup";

import {
  addressSchema,
  descriptionSchema,
  geoLocationSchema,
  priceSchema,
  imageSchema,
  managerIdSchema,
  ownerIdSchema,
  productNameSchema,
  productTypeSchema,
  ratingSchema,
  typeOccupantSchema,
  electricitySchema,
  generalFacilitiesSchema,
  shareRoomFacilitiesSchema,
  furnishedFacilitiesSchema,
  bathroomFacilitiesSchema,
  regulationSchema,
  speciousRoomSchema,
} from "../schema/product.js";

export const createProductSchema = yup.object({
  productName: productNameSchema,
  ownerId: ownerIdSchema,
  managerId: managerIdSchema,
  image: imageSchema,
  description: descriptionSchema,
  price: priceSchema,
  productType: productTypeSchema,
  address: addressSchema,
  rating: ratingSchema.optional(),
  typeOccupant: typeOccupantSchema,
  electricity: electricitySchema,
  speciousRoom: speciousRoomSchema,
  available: yup
    .number()
    .nullable()
    .when("productType", {
      is: "KOST",
      then: (schema) =>
        schema.required("Jumlah ketersediaan kamar harus diisi untuk KOST"),
      otherwise: (schema) => schema.nullable(),
    }),
  roomCount: yup
    .number()
    .nullable()
    .when("productType", {
      is: "KONTRAKAN",
      then: (schema) =>
        schema.required("Jumlah kamar harus diisi untuk KONTRAKAN"),
      otherwise: (schema) => schema.nullable(),
    }),
  bathroomCount: yup
    .number()
    .nullable()
    .when("productType", {
      is: "KONTRAKAN",
      then: (schema) =>
        schema.required("Jumlah kamar mandi harus diisi untuk KONTRAKAN"),
      otherwise: (schema) => schema.nullable(),
    }),
  generalFacilities: yup
    .object()
    .nullable()
    .when("productType", {
      is: "KOST",
      then: (schema) =>
        schema.required("Fasilitas umum harus diisi untuk KOST"),
      otherwise: (schema) => schema.nullable(),
    }),
  shareRoomFacilities: yup
    .object()
    .nullable()
    .when("productType", {
      is: "KONTRAKAN",
      then: (schema) =>
        schema.required("Fasilitas bersama harus diisi untuk KONTRAKAN"),
      otherwise: (schema) => schema.nullable(),
    }),
  furnishedFacilities: furnishedFacilitiesSchema.nullable(),
  bathroomFacilities: bathroomFacilitiesSchema.required(),
  regulation: regulationSchema.nullable(),
  location: geoLocationSchema.required(),
});
