import { INTEGER } from "sequelize";
import { BuildOptions, Model, STRING, UUID, UUIDV4 } from "sequelize";

import sequelize from "../db";

class Property extends Model {
  public id: string;
  public address: string;
  public state: string;
  public postalCode: string;
  public city: string;
  public description: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Property.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    address: STRING,
    state: STRING,
    postalCode: STRING,
    city: STRING,
    description: STRING,
  },
  {
    sequelize,
    modelName: "property",
    timestamps: true,
    paranoid: true,
  }
);

export type PropertyModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Property;
};

export default Property as PropertyModelStatic;
