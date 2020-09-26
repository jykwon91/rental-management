import { INTEGER } from 'sequelize';
import { BuildOptions, Model, STRING, UUID, UUIDV4 } from 'sequelize';

import sequelize from '../db';

class Payment extends Model {
  public id: string;
  public amount: number;
  public description: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    amount: INTEGER,
    description: STRING,
  },
  {
    sequelize,
    modelName: 'payment',
    timestamps: true,
    paranoid: true,
  },
);

export type PaymentModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Payment;
}

export default Payment as PaymentModelStatic;
