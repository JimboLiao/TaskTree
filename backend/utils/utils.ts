function findElementsNotInSecondArray<T>(
  firstArray: T[],
  secondArray: T[]
): T[] {
  const secondArrayStrings = secondArray.map((item) => JSON.stringify(item));
  return firstArray.filter(
    (item) => !secondArrayStrings.includes(JSON.stringify(item))
  );
}

export { findElementsNotInSecondArray };
