import { Pool, PoolClient } from 'pg';

export default abstract class RepositoryBase {
  public abstract readonly name: string;

  constructor(private readonly _pool: Pool) {}

  public async query<T extends object>(
    sql: string,
    parameters?: (string | number | Date)[],
  ) {
    return await this.withConnection(async (client) => {
      const result = await client.query<T>(sql, parameters);

      return result.rows;
    });
  }

  private async withConnection<T extends object>(
    exec: (client: PoolClient) => Promise<T[]>,
  ) {
    const client = await this._pool.connect();

    try {
      const result = await exec(client);

      return result;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
}
