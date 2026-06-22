/**
 * Elimina elementos duplicados de un array de objetos basándose en una propiedad específica.
 * Por defecto filtra por la propiedad 'id'.
 * * @template T - El tipo de los objetos dentro del array
 * @template K - El tipo de las llaves permitidas del objeto T
 * * @param {T[]} array - El array original con posibles duplicados
 * @param {K} key - La propiedad utilizada para identificar duplicados (Por defecto: "id")
 * @returns {T[]} Un nuevo array con elementos únicos
 */
export const removeDuplicates = <T, K extends keyof T = "id" & keyof T>(
  array: T[],
  key: K = "id" as K,
): T[] => {
  return array.filter(
    (item, index, self) =>
      self.findIndex((p) => p[key] === item[key]) === index,
  );
};
