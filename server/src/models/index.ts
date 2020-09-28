import Notification, { NotificationModelStatic } from "./Notification";
import Post, { PostModelStatic } from "./Post";
import User, { UserModelStatic } from "./User";
import Payment, { PaymentModelStatic } from "./Payment";
import ServiceRequest, { ServiceRequestModelStatic } from "./ServiceRequest";
import Landlord, { LandlordModelStatic } from "./Landlord";
import Tenant, { TenantModelStatic } from "./Tenant";

export default {
  Notification,
  User,
  Post,
  Payment,
  ServiceRequest,
  Landlord,
  Tenant,
};

export interface ModelType {
  User: UserModelStatic;
  Post: PostModelStatic;
  Notification: NotificationModelStatic;
  Payment: PaymentModelStatic;
  ServiceRequest: ServiceRequestModelStatic;
  Landlord: LandlordModelStatic;
  Tenant: TenantModelStatic;
}
