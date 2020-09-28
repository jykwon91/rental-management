import { BuildOptions, DATEONLY, DataTypes, Model } from "sequelize";

import Notification from "./Notification";
import Post from "./Post";
import Payment from "./Payment";
import Property from "./Property";
import Tenant from "./Tenant";
import moment from "moment";
import sequelize from "../db";

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

export class Landlord extends Model {
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
  public properties: typeof Property[];
  public tenants: typeof Tenant[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt: Date;
}

Landlord.init(
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

Landlord.hasMany(Notification);
Notification.belongsTo(Landlord);
Landlord.hasMany(Post);
Post.belongsTo(Landlord);
Landlord.hasMany(Payment);
Payment.belongsTo(Landlord);
Landlord.hasMany(Tenant);
Tenant.belongsTo(Landlord);
Landlord.hasMany(Property);
Property.belongsTo(Property);

export type LandlordModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Landlord;
};

export default Landlord as LandlordModelStatic;
