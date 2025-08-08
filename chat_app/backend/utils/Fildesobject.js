// utils/filterObject.js
export function Fildesobject(obj, allowedFields) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedFields.includes(key))
  );
}
