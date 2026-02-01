export function phoneNumberFromatter(phoneNumber: string) {
  let digits = phoneNumber.replace(/\D/g, "");

  // Remove código do país (55) se existir
  if (digits.length > 11 && digits.startsWith("55")) {
    digits = digits.slice(2);
  }

  // Celular com DDD → (99) 99999-9999
  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  // Fixo com DDD → (99) 9999-9999
  if (digits.length === 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return phoneNumber;
}
