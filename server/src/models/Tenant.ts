import { BuildOptions, DATEONLY, DataTypes, Model } from "sequelize";

import Notification from "./Notification";
import Post from "./Post";
import Payment from "./Payment";
import moment from "moment";
import sequelize from "../db";
import { Landlord } from "./Landlord";

const { STRING, BOOLEAN, UUID, UUIDV1, ENUM } = DataTypes;

enum Gender {
  Male = "MALE",
  Female = "FEMALE",
}

enum AuthType {
  Email = "EMAIL",
  Facebook = "FACEBOOK",
  Google = "GOOGLE",
  Apple = "APPLE",
}

export class Tenant extends Model {
  public id!: string;
  public email: string;
  public password: string;
  public name: string;
  public nickname: string;
  public thumbURL: string;
  public photoURL: string;
  public birthday: Date;
  public gender: Gender;
  public phone: string;
  public socialId: string;
  public authType: AuthType;
  public verified: boolean;
  public landlord: Landlord;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt: Date;
}

Tenant.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: STRING,
    },
    password: {
      type: STRING,
      allowNull: true,
    },
    name: STRING,
    nickname: STRING,
    gender: ENUM("MALE", "FEMALE"),
    thumbUrl: STRING,
    photoURL: STRING,
    birthday: {
      type: DATEONLY,
      get: function (): string {
        return moment.utc(this.getDataValue("regDate")).format("YYYY-MM-DD");
      },
    },
    socialId: STRING,
    authType: ENUM("EMAIL", "FACEBOOK", "GOOGLE", "APPLE"),
    verified: {
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
    paranoid: true,
  }
);

Tenant.hasMany(Notification);
Notification.belongsTo(Tenant);
Tenant.hasMany(Post);
Post.belongsTo(Tenant);
Tenant.hasMany(Payment);
Payment.belongsTo(Tenant);

export type TenantModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Tenant;
};

export default Tenant as TenantModelStatic;
