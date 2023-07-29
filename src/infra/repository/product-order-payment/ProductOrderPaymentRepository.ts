import RepositoryBase from '../shared/RepositoryBase';
import ProductOrderPaymentModel from './ProductOrderPaymentModel';
import IProductOrderPaymentRepository from '../../../application/product-order-payment/IProductOrderPaymentRepository';
import ProductOrderPaymentEntity from '../../../domain/entities/ProductOrderPaymentEntity';

export default class ProductOrderPaymentRepository
  extends RepositoryBase
  implements IProductOrderPaymentRepository
{
  public override readonly name = 'product_order_payments';

  async createOrUpdate(entity: ProductOrderPaymentEntity) {
    const existingModel = await this.getById(entity.id);

    if (existingModel) {
      await this.query(`UPDATE "${this.name}" SET status = $2 WHERE id = $1`, [
        existingModel.id,
        entity.status,
      ]);
      return;
    }

    await this.query(
      `INSERT INTO "${this.name}"(id, order_id, status) VALUES($1, $2, $3)`,
      [entity.id, entity.orderId, entity.status],
    );
  }

  public async getById(id: string) {
    const results = await this.query<ProductOrderPaymentModel>(
      `SELECT * FROM "${this.name}" WHERE id = $1`,
      [id],
    );

    const item = results[0];

    return item
      ? new ProductOrderPaymentEntity(item.order_id, item.status, item.id)
      : undefined;
  }
}
