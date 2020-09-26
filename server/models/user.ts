import { BuildOptions, DATEONLY, DataTypes, Model } from "sequelize";

import moment from "moment";
import sequelize from "../db";

const { STRING, BOOLEAN, UUID, UUIDV1, ENUM } = DataTypes;

enum AuthType {
  Email = "EMAIL",
  Facebook = "FACEBOOK",
  Google = "GOOGLE",
  Apple = "APPLE",
}

export class User extends Model {
  public id!: string;
  public name: string;
  public email: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt: Date;
}

User.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    name: STRING,
    email: {
      type: STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
  }
);

export type UserModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): User;
};

export default User as UserModelStatic;
