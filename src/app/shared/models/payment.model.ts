export interface IPayment {
  id: string;
  paymentMethod: string;
  paymentStatus: boolean;
  installments: boolean;
  quantityInstallments: number;
  dateConfirm: Date;
  // card: ICard;
  // pix: IPix;
  // fetlock: IFetlock;
}
