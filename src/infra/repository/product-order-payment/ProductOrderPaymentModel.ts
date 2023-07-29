import ModelBase from '../shared/ModelBase';

export default class ProductOrderPaymentModel extends ModelBase {
  order_id!: string;
  status!: string;
}
