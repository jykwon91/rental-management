import Notification, { NotificationModelStatic } from './Notification';
import Post, { PostModelStatic } from './Post';
import User, { UserModelStatic } from './User';
import Payment, { PaymentModelStatic } from './Payment';

export default {
  Notification,
  User,
  Post,
  Payment,
};

export interface ModelType {
  User: UserModelStatic;
  Post: PostModelStatic;
  Notification: NotificationModelStatic;
  Payment: PaymentModelStatic;
}
