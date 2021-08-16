
/**
 * Generate random number from a length
 * @param param0 length
 * @returns Number
 */
export const generateRandomNumber = ({ length }: { length: number }) => {
  const firstNumber = 10 ** (length - 1);
  return Math.floor(firstNumber + Math.random() * 9 * firstNumber);
}
