import 'dotenv/config';
import logger from './logger.js';
import connectDB from '../db/index.js';
import { User } from '../models/user.models.js';
import bcrypt from 'bcrypt';
import { ROLES } from '../constants.js';
import { Car } from '../models/car.models.js';

const seedData = async () => {
  try {
    const saltValue = Number(process.env.HASH_SALT_VALUE) || 10;
    await connectDB();

    // Seed admin user
    await User.deleteMany({});
    const adminPassword = await bcrypt.hash('admin123', saltValue);
    const admin = await User.create({
      email: 'admin@example.com',
      password: adminPassword,
      role: ROLES.ADMIN,
    });

    // seed cars
    await Car.deleteMany({});
    await Car.insertMany([
      {
        make: 'Mahindra',
        model: 'Thar',
        year: 2022,
        price: 1500000,
        image:
          'https://img.autocarindia.com/Reviews/2020-Mahindra-Thar-front-static.jpg?w=700&c=0',
        description: 'Rugged off-road SUV',
        slug: 'mahindra-thar-2022',
        createdBy: admin._id,
      },
      {
        make: 'Toyota',
        model: 'Fortuner',
        year: 2021,
        price: 3500000,
        image:
          'https://www.financialexpress.com/wp-content/uploads/2021/09/Toyota-Fortuner-Legender.jpg',
        description: 'Premium SUV with great features',
        slug: 'toyota-fortuner-2021',
        createdBy: admin._id,
      },
    ]);

    logger.info('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
