import { IAddress } from './address.model';

export interface IDelivery {
  id: string;
  status: string;
  initDate: Date;
  price: number;
  codigoFreight: string;
  address: IAddress;
  shippingCompany: string;
  startDeliveryDate: Date;
  finalDeliveryDate: Date;
  completeDeliveryDate: Date;
}
