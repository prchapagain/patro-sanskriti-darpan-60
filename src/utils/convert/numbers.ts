
export const nepaliDigits: { [key: string]: string } = {
  "0": "०",
  "1": "१",
  "2": "२",
  "3": "३",
  "4": "४",
  "5": "५",
  "6": "६",
  "7": "७",
  "8": "८",
  "9": "९"
};

export function toNepaliDigits(num: number): string {
  return num.toString().split('').map(digit => nepaliDigits[digit] || digit).join('');
}
