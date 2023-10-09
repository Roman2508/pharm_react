export const clearPhoneNumber = (phone: string) => {
  if (!phone) return ''

  // @ts-ignore
  return phone.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll('_', '').replaceAll(' ', '')
}
