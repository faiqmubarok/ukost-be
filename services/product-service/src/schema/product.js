import * as yup from "yup";

// Basic fields
export const productNameSchema = yup.string().required();
export const ownerIdSchema = yup.string().required();
export const managerIdSchema = yup.string().required();

export const imageSchema = yup.array().of(yup.string().url()).min(1).required();
export const descriptionSchema = yup.string().optional();
export const speciousRoomSchema = yup.string().required();

// Enums
export const productTypeSchema = yup
  .mixed()
  .oneOf(["KOST", "KONTRAKAN"])
  .required();
export const typeOccupantSchema = yup
  .mixed()
  .oneOf(["PRIA", "WANITA", "CAMPUR"])
  .required();
export const electricitySchema = yup
  .mixed()
  .oneOf(["INCLUDE", "EXCLUDE"])
  .default("EXCLUDE");
export const bathroomTypeSchema = yup
  .mixed()
  .oneOf(["LUAR", "DALAM"])
  .required();
export const toiletTypeSchema = yup
  .mixed()
  .oneOf(["JONGKOK", "DUDUK"])
  .required();

// Nested types
export const priceSchema = yup.object({
  monthly: yup.number().positive().optional(),
  threeMonth: yup.number().positive().optional(),
  sixMonth: yup.number().positive().optional(),
  yearly: yup.number().positive().optional(),
});

export const addressSchema = yup.object({
  street: yup.string().required(),
  rt: yup.string().required(),
  rw: yup.string().required(),
  village: yup.string().required(),
  subDistrict: yup.string().required(),
  city: yup.string().required(),
  province: yup.string().required(),
  postalCode: yup.string().required(),
});

export const ratingSchema = yup.object({
  average: yup.number().min(0).max(5).default(0),
  count: yup.number().min(0).default(0),
});

export const generalFacilitiesSchema = yup.object({
  livingRoom: yup.boolean(),
  diningRoom: yup.boolean(),
  prayerRoom: yup.boolean(),
  loungeRoom: yup.boolean(),
  dryingRoom: yup.boolean(),
  laundryRoom: yup.boolean(),
  kitchen: yup.boolean(),
  refrigerator: yup.boolean(),
  dispenser: yup.boolean(),
  washingMachine: yup.boolean(),
  security: yup.boolean(),
  wifi: yup.boolean(),
  parkingBike: yup.boolean(),
  parkingCar: yup.boolean(),
});

export const shareRoomFacilitiesSchema = yup.object({
  livingRoom: yup.boolean(),
  diningRoom: yup.boolean(),
  kitchen: yup.boolean(),
  prayerRoom: yup.boolean(),
  loungeRoom: yup.boolean(),
  dryingRoom: yup.boolean(),
  laundryRoom: yup.boolean(),
  parkingBike: yup.boolean(),
  parkingCar: yup.boolean(),
});

export const furnishedFacilitiesSchema = yup.object({
  refrigerator: yup.boolean(),
  dispenser: yup.boolean(),
  washingMachine: yup.boolean(),
  bed: yup.boolean(),
  wardrobe: yup.boolean(),
  desk: yup.boolean(),
  chair: yup.boolean(),
  tv: yup.boolean(),
  ac: yup.boolean(),
  dressingTable: yup.boolean(),
  fan: yup.boolean(),
  empty: yup.boolean(),
});

export const bathroomFacilitiesSchema = yup.object({
  type: bathroomTypeSchema,
  toiletType: toiletTypeSchema,
  shower: yup.boolean(),
  bathtub: yup.boolean(),
  tub: yup.boolean(),
  waterHeater: yup.boolean(),
  sink: yup.boolean(),
  bucket: yup.boolean(),
});

export const regulationSchema = yup.object({
  married: yup.boolean(),
  together: yup.boolean(),
  oppositeSex: yup.boolean(),
  pet: yup.boolean(),
  smoke: yup.boolean(),
});

export const geoLocationSchema = yup.object({
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});
