import * as yup from "yup";

export const nameSchema = yup.string().required();
export const productNameSchema = yup.string().required();
export const ownerIdSchema = yup.string().required();
export const managerIdSchema = yup.string().required();
export const productTypeSchema = yup
  .mixed()
  .oneOf(["KOST", "KONTRAKAN"])
  .required();

export const imageSchema = yup.array().of(yup.string().url()).min(1).required();
export const descriptionSchema = yup.string().nullable();

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

export const specificationSchema = yup.object({
  rating: ratingSchema,
  typeOccupant: yup.mixed().oneOf(["PRIA", "WANITA", "CAMPUR"]).required(),
  electricity: yup.mixed().oneOf(["INCLUDE", "EXCLUDE"]).default("EXCLUDE"),
  speciousRoom: yup.string().required(),
  available: yup.number().min(0).nullable(),
  roomCount: yup.number().min(0).nullable(),
  bathroomCount: yup.number().min(0).nullable(),
});

export const generalFacilitiesSchema = yup.object({
  livingRoom: yup.boolean(),
  diningRoom: yup.boolean(),
  prayerRoom: yup.boolean(),
  loungeRoom: yup.boolean(),
  dryingRoom: yup.boolean(),
  laundryRoom: yup.boolean(),
  kitchen: yup.boolean(),
  refrigator: yup.boolean(),
  dispensers: yup.boolean(),
  washingMachine: yup.boolean(),
  security: yup.boolean(),
  wifi: yup.boolean(),
  parkingBike: yup.boolean(),
  parkingCar: yup.boolean(),
});

export const shareFacilitiesSchema = yup.object({
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
  refrigator: yup.boolean(),
  dispensers: yup.boolean(),
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
  type: yup.mixed().oneOf(["LUAR", "DALAM"]).required(),
  toiletType: yup.mixed().oneOf(["JONGKOK", "DUDUK"]).required(),
  shower: yup.boolean(),
  bathtube: yup.boolean(),
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

export const facilitiesSchema = yup.object({
  general: generalFacilitiesSchema.nullable(),
  shareRoom: shareFacilitiesSchema.nullable(),
  room: furnishedFacilitiesSchema.nullable(),
  rented: furnishedFacilitiesSchema.nullable(),
  bathroom: bathroomFacilitiesSchema.required(),
});
