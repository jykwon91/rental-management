import { INTEGER } from "sequelize";
import { BuildOptions, Model, STRING, UUID, UUIDV4 } from "sequelize";

import sequelize from "../db";

class ServiceRequest extends Model {
  public id: string;
  public description: string;
  public status: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly completedAt!: Date;
}

ServiceRequest.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    description: STRING,
    status: STRING,
  },
  {
    sequelize,
    modelName: "serviceRequest",
    timestamps: true,
    paranoid: true,
  }
);

export type ServiceRequestModelStatic = typeof Model & {
  new (
    values?: Record<string, unknown>,
    options?: BuildOptions
  ): ServiceRequest;
};

export default ServiceRequest as ServiceRequestModelStatic;
