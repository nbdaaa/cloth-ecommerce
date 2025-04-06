const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Seeding database...');
    
    // Clean database (optional - for development)
    await cleanDatabase();

    // Seed users
    const adminUser = await seedUsers();
    
    // Seed categories
    const categories = await seedCategories();
    
    // Seed products
    await seedProducts(categories);

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function cleanDatabase() {
  console.log('🧹 Cleaning database...');
  
  // Delete data in reverse order of dependencies
  await prisma.wishlistItem.deleteMany();
  await prisma.image.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
}

async function seedUsers() {
  console.log('👤 Seeding users...');
  
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await hash('Admin123!', 10),
      role: 'ADMIN',
    },
  });
  
  // Create regular user
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'Regular User',
      email: 'user@example.com',
      password: await hash('User123!', 10),
      role: 'USER',
    },
  });
  
  console.log(`Created users: ${adminUser.name}, ${regularUser.name}`);
  return adminUser;
}

async function seedCategories() {
  console.log('📂 Seeding categories...');
  
  // Create categories
  const tshirtsCategory = await prisma.category.upsert({
    where: { id: 'tshirts-category' },
    update: {},
    create: {
      id: 'tshirts-category',
      name: 'T-shirts',
      description: 'Comfortable and stylish t-shirts for all occasions',
    },
  });
  
  const jeansCategory = await prisma.category.upsert({
    where: { id: 'jeans-category' },
    update: {},
    create: {
      id: 'jeans-category',
      name: 'Jeans',
      description: 'Durable and fashionable jeans for everyday wear',
    },
  });
  
  const shoesCategory = await prisma.category.upsert({
    where: { id: 'shoes-category' },
    update: {},
    create: {
      id: 'shoes-category',
      name: 'Shoes',
      description: 'Stylish and comfortable footwear for any occasion',
    },
  });
  
  console.log(`Created categories: ${tshirtsCategory.name}, ${jeansCategory.name}, ${shoesCategory.name}`);
  return { tshirtsCategory, jeansCategory, shoesCategory };
}

async function seedProducts(categories) {
  console.log('🛍️ Seeding products...');
  
  // T-shirt products
  const tshirt1 = await prisma.product.upsert({
    where: { id: 'tshirt-1' },
    update: {},
    create: {
      id: 'tshirt-1',
      name: 'Classic Cotton T-shirt',
      description: 'A comfortable classic-fit t-shirt made from 100% soft cotton.',
      price: 24.99,
      salePrice: 19.99,
      inventory: 50,
      isFeatured: true,
      categoryId: categories.tshirtsCategory.id,
    },
  });
  
  // Add images for tshirt1
  await prisma.image.createMany({
    data: [
      {
        productId: tshirt1.id,
        url: '/images/p11-1.jpg',
        alt: 'Classic Cotton T-shirt - Front view',
        isPrimary: true,
      },
      {
        productId: tshirt1.id,
        url: '/images/p11-2.jpg',
        alt: 'Classic Cotton T-shirt - Back view',
        isPrimary: false,
      },
    ],
  });
  
  const tshirt2 = await prisma.product.upsert({
    where: { id: 'tshirt-2' },
    update: {},
    create: {
      id: 'tshirt-2',
      name: 'Premium Graphic T-shirt',
      description: 'A premium quality t-shirt with unique graphic design.',
      price: 34.99,
      inventory: 30,
      isFeatured: false,
      categoryId: categories.tshirtsCategory.id,
    },
  });
  
  // Add images for tshirt2
  await prisma.image.createMany({
    data: [
      {
        productId: tshirt2.id,
        url: '/images/p12-1.jpg',
        alt: 'Premium Graphic T-shirt - Front view',
        isPrimary: true,
      },
      {
        productId: tshirt2.id,
        url: '/images/p12-2.jpg',
        alt: 'Premium Graphic T-shirt - Back view',
        isPrimary: false,
      },
    ],
  });
  
  // Jeans products
  const jeans1 = await prisma.product.upsert({
    where: { id: 'jeans-1' },
    update: {},
    create: {
      id: 'jeans-1',
      name: 'Slim Fit Jeans',
      description: 'Modern slim fit jeans with stretch for maximum comfort.',
      price: 59.99,
      salePrice: 49.99,
      inventory: 35,
      isFeatured: true,
      categoryId: categories.jeansCategory.id,
    },
  });
  
  // Add images for jeans1
  await prisma.image.createMany({
    data: [
      {
        productId: jeans1.id,
        url: '/images/p21-1.jpg',
        alt: 'Slim Fit Jeans - Front view',
        isPrimary: true,
      },
      {
        productId: jeans1.id,
        url: '/images/p21-2.jpg',
        alt: 'Slim Fit Jeans - Back view',
        isPrimary: false,
      },
    ],
  });
  
  const jeans2 = await prisma.product.upsert({
    where: { id: 'jeans-2' },
    update: {},
    create: {
      id: 'jeans-2',
      name: 'Relaxed Fit Jeans',
      description: 'Comfortable relaxed fit jeans for a casual look.',
      price: 54.99,
      inventory: 40,
      isFeatured: false,
      categoryId: categories.jeansCategory.id,
    },
  });
  
  // Add images for jeans2
  await prisma.image.createMany({
    data: [
      {
        productId: jeans2.id,
        url: '/images/p22-1.jpg',
        alt: 'Relaxed Fit Jeans - Front view',
        isPrimary: true,
      },
      {
        productId: jeans2.id,
        url: '/images/p22-2.jpg',
        alt: 'Relaxed Fit Jeans - Back view',
        isPrimary: false,
      },
    ],
  });
  
  // Shoes products
  const shoes1 = await prisma.product.upsert({
    where: { id: 'shoes-1' },
    update: {},
    create: {
      id: 'shoes-1',
      name: 'Classic Sneakers',
      description: 'Versatile and comfortable sneakers for everyday wear.',
      price: 79.99,
      salePrice: 69.99,
      inventory: 25,
      isFeatured: true,
      categoryId: categories.shoesCategory.id,
    },
  });
  
  // Add images for shoes1
  await prisma.image.createMany({
    data: [
      {
        productId: shoes1.id,
        url: '/images/p31-1.jpg',
        alt: 'Classic Sneakers - Side view',
        isPrimary: true,
      },
      {
        productId: shoes1.id,
        url: '/images/p31-2.jpg',
        alt: 'Classic Sneakers - Top view',
        isPrimary: false,
      },
    ],
  });
  
  const shoes2 = await prisma.product.upsert({
    where: { id: 'shoes-2' },
    update: {},
    create: {
      id: 'shoes-2',
      name: 'Leather Boots',
      description: 'Durable and stylish leather boots for any season.',
      price: 129.99,
      inventory: 15,
      isFeatured: false,
      categoryId: categories.shoesCategory.id,
    },
  });
  
  // Add images for shoes2
  await prisma.image.createMany({
    data: [
      {
        productId: shoes2.id,
        url: '/images/p32-1.jpg',
        alt: 'Leather Boots - Side view',
        isPrimary: true,
      },
      {
        productId: shoes2.id,
        url: '/images/p32-2.jpg',
        alt: 'Leather Boots - Front view',
        isPrimary: false,
      },
    ],
  });
  
  console.log('Created 6 products with images (2 per category)');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); 