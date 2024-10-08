/* eslint-disable no-console */
import config from '../config';
import { USER_ROLE, USER_STATUS } from '../modules/User/user.constant';
import { User } from '../modules/User/user.model';

export const seed = async () => {
  try {
    //at first check if the admin exist of not
    const admin = await User.findOne({
      role: USER_ROLE.ADMIN,
      email: config.admin_email,
      status: USER_STATUS.PREMIUM,
    });
    if (!admin) {
      console.log('Seeding started...');

      await User.create({
        name: 'Admin',
        role: USER_ROLE.ADMIN,
        email: config.admin_email,
        password: config.admin_password,
        status: USER_STATUS.PREMIUM,
        profilePhoto: config.admin_profile_photo,
      });
      console.log('Admin created successfully...');
      console.log('Seeding completed...');
    }
  } catch (error) {
    console.log('Error in seeding', error);
  }
};
