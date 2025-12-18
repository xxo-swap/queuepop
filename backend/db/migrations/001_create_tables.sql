-- ===========================
-- ENUMS
-- ===========================
CREATE TYPE role AS ENUM ('ADMIN', 'CASHIER', 'MANAGER', 'WAITER', 'CHEF');
CREATE TYPE table_status AS ENUM ('AVAILABLE', 'OCCUPIED', 'RESERVED', 'CLEANING');
CREATE TYPE order_status AS ENUM ('OPEN', 'PREPARING', 'SERVED', 'BILLED', 'CLOSED', 'CANCELLED');
CREATE TYPE payment_method AS ENUM ('CASH', 'CARD', 'UPI', 'WALLET');
CREATE TYPE payment_status AS ENUM ('SUCCESS', 'FAILED', 'REFUNDED');
CREATE TYPE reprint_method AS ENUM ('MANUAL', 'AUTO');

-- ===========================
-- ACCOUNTS & STORES
-- ===========================
CREATE TABLE account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    region VARCHAR(255),
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now()
);

CREATE TABLE store (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    accountId UUID REFERENCES account(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),
    region VARCHAR(255),
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now()
);

-- ===========================
-- USERS
-- ===========================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    accountId UUID REFERENCES account(id),
    storeId UUID REFERENCES store(id),
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role role DEFAULT 'CASHIER',
    reprintPin VARCHAR(255),
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now()
);

-- ===========================
-- CATEGORY & MENU ITEM
-- ===========================
CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    storeId UUID REFERENCES store(id),
    name VARCHAR(255) NOT NULL,
    UNIQUE (storeId, name)
);

CREATE TABLE menuitem (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    storeId UUID REFERENCES store(id),
    categoryId UUID REFERENCES category(id),
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    description TEXT,
    available BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT now()
);

-- ===========================
-- TABLES
-- ===========================
CREATE TABLE restaurant_table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    storeId UUID REFERENCES store(id),
    tableNo INT NOT NULL,
    capacity INT NOT NULL,
    status table_status DEFAULT 'AVAILABLE',
    UNIQUE(storeId, tableNo)
);

-- ===========================
-- ORDERS & ORDER ITEMS
-- ===========================
CREATE TABLE "order" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    storeId UUID REFERENCES store(id),
    tableId UUID REFERENCES restaurant_table(id),
    status order_status DEFAULT 'OPEN',
    subtotal FLOAT DEFAULT 0,
    tax FLOAT DEFAULT 0,
    discount FLOAT DEFAULT 0,
    total FLOAT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now()
);

CREATE TABLE orderitem (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    orderId UUID REFERENCES "order"(id) ON DELETE CASCADE,
    menuItemId UUID REFERENCES menuitem(id),
    name VARCHAR(255) NOT NULL,
    qty INT NOT NULL,
    price FLOAT NOT NULL
);

-- ===========================
-- INVOICE & PAYMENT
-- ===========================
CREATE TABLE invoice (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    orderId UUID UNIQUE REFERENCES "order"(id) ON DELETE CASCADE,
    paid BOOLEAN DEFAULT FALSE,
    paidAt TIMESTAMP
);

CREATE TABLE payment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoiceId UUID UNIQUE REFERENCES invoice(id) ON DELETE CASCADE,
    method payment_method NOT NULL,
    amount FLOAT NOT NULL,
    status payment_status DEFAULT 'SUCCESS',
    createdAt TIMESTAMP DEFAULT now()
);

-- ===========================
-- SHIFT
-- ===========================
CREATE TABLE shift (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID REFERENCES users(id),
    storeId UUID REFERENCES store(id),
    startedAt TIMESTAMP DEFAULT now(),
    endedAt TIMESTAMP,
    cashIn FLOAT DEFAULT 0,
    cashOut FLOAT DEFAULT 0
);

-- ===========================
-- KOT & KOT REPRINT
-- ===========================
CREATE TABLE kot (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    orderId UUID UNIQUE REFERENCES "order"(id) ON DELETE CASCADE,
    tableId UUID REFERENCES restaurant_table(id),
    storeId UUID REFERENCES store(id),
    createdById UUID REFERENCES users(id),
    locked BOOLEAN DEFAULT FALSE,
    lockedAt TIMESTAMP,
    lockedById UUID REFERENCES users(id),
    items JSON,
    printedCount INT DEFAULT 1,
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now()
);

CREATE TABLE kot_reprint (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kotId UUID REFERENCES kot(id),
    requestedById UUID REFERENCES users(id),
    authorizedById UUID REFERENCES users(id),
    reason TEXT,
    method reprint_method DEFAULT 'MANUAL',
    createdAt TIMESTAMP DEFAULT now()
);
