import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/auth';

@Injectable()
export class UserService {
  async findUserByUID(uid: string): Promise<UserRecord> {
    const user = await firebaseAdmin.auth().getUser(uid);

    if (!user) {
      throw new Error("User doesn't exist");
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserRecord> {
    const user = await firebaseAdmin.auth().getUserByEmail(email);

    if (!user) {
      throw new Error("User doesn't exist");
    }

    return user;
  }
}
