
/**
 * format number adding leading zeros if necessary
 */
export const padding = (totalAmount: number, number: number) =>
    `${number}`.padStart(`${totalAmount}`.length, '0')