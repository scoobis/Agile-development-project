SET NAMES utf8;
SET CHARACTER SET utf8;

-- USER --
CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(100) NOT NULL,
  full_name VARCHAR(40) NOT NULL,
  phone_no VARCHAR(10),
  PRIMARY KEY (id),
  UNIQUE (email)
);

-- ADDRESS --
CREATE TABLE address (
  id INT NOT NULL AUTO_INCREMENT,
  street_address VARCHAR(100),
  zip INT(5),
  city VARCHAR(40),
  PRIMARY KEY (id)
);

-- USER_ADDRESS --
CREATE TABLE user_address (
  user_id INT NOT NULL,
  address_id INT NOT NULL,
  type VARCHAR(100) NOT NULL,
  PRIMARY KEY (user_id, address_id),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (address_id) REFERENCES address(id)
);

-- PRODUCER --
CREATE TABLE producer (
  org_no VARCHAR(10) NOT NULL,
  user_id INT NOT NULL,
  description TEXT,
  PRIMARY KEY (org_no),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- SUBSCRIBER --
CREATE TABLE subscriber (
  producer_org_no VARCHAR(10) NOT NULL,
  email VARCHAR(60) NOT NULL,
  PRIMARY KEY (producer_org_no, email),
  FOREIGN KEY (producer_org_no) REFERENCES producer(org_no) ON DELETE CASCADE
);

-- PRODUCT --
CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT,
  producer_org_no VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price INT NOT NULL,
  sale_price INT,
  unit VARCHAR(20) NOT NULL,
  in_stock INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (producer_org_no) REFERENCES producer(org_no)
);

-- CATEGORY --
CREATE TABLE category (
  id INT NOT NULL AUTO_INCREMENT,
  parent_id INT,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);

-- PRODUCT_CATEGORY --
CREATE TABLE product_category (
  product_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (product_id, category_id),
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

-- PRODUCT_IMAGE --
CREATE TABLE product_image (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  image_name VARCHAR(255) NOT NULL,
  alt_text VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

-- PRODUCT_TAG --
CREATE TABLE product_tag (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(40) NOT NULL,
  product_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

-- ORDER --
CREATE TABLE orders (
  producer_org_no VARCHAR(10),
  customer_name VARCHAR(100),
  customer_email VARCHAR(100),
  customer_phone_no VARCHAR(10),
  customer_street_address VARCHAR(100),
  customer_zip INT(5),
  customer_city VARCHAR(40),
  shipping_method VARCHAR(40),
  payment_method VARCHAR(40),
  subtotal INT,
  shipping INT,
  discount INT,
  total INT,
  created DATE,
  order_status VARCHAR(40),
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);

-- ORDER_PRODUCT --
CREATE TABLE order_product (
  id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(100),
  unit VARCHAR(20),
  price INT,
  quantity INT,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Inserting categories --
INSERT INTO category (name, description, parent_id) 
VALUES 
  ('Grönsaker', 'Färska grönsaker', null),
    ('Tomat', 'Tomater', 1),
    ('Gurka', 'Gurkor', 1),
    ('Sallat', 'Bladsallat', 1),
  ('Potatis & Rotfrukter', 'Potatis & Rotfrukter', null),
    ('Potatis', 'Potatisar', 5),
    ('Morötter', 'Morötter', 5), 
    ('Kål', 'Kål', 5),
    ('Rotfrukter', 'Rotfrukter', 5),
  ('Frukt', 'Färska Frukter', null),
    ('Äpplen', 'Äpplen', 10),
    ('Päron', 'Päron', 10),
    ('Plommon', 'Plommon', 10),
  ('Kött & Fisk', 'Kött & Fisk', null),
    ('Nötkött', 'Kokött', 14),
    ('Fläskkött', 'Griskött', 14),
    ('Viltkött', 'Viltkött', 14),
    ('Kyckling & Fågel', 'Kyckling & Fågel', 14),
      ('Kyckling', 'Kyckling', 18),
      ('Kalkon', 'Kalkon', 18),
    ('Fisk', 'Fisk', 14),
  ('Dryck', 'Drycker', null),
    ('Must', 'Muster', 22),
    ('Öl', 'Öler', 22),
  ('Mejeri', 'Mejeriprodukter', null),
    ('Mjölk', 'Mjölk', 25),
    ('Smör', 'Smör', 25),
    ('Ost', 'Ostar', 25),
    ('Ägg', 'Ägg', 25),
  ('Spannmål', 'Spannmål', null),
    ('Hö', 'Hö', 30),
  ('Nyhet', 'Nyhet', null),
  ('Ny skörd', 'Senaste skörden', null),
  ('Nyslaktat', 'Färskt kött', null),
  ('Utgående', 'Sista vändan', null);


-- Inserting test users --
INSERT INTO user (email, password, full_name, phone_no) 
VALUES
  ('producent@mail.com', '$2b$08$lVhyWkKWCeDcJv9RfvtfbuRwGGwVzojsigohV0IS14t1UFK25zXwO', 'Produ Centen', '0701111111'), -- Password: producent
  ('konsument@mail.com', '$2b$08$OH9SBfMYS9ml1KUIMkve4umW4dvytpPe.lxzuNWq3u0sJpq9Hg/lG', 'Konsu Menten', '0702222222'); -- Password: konsument

INSERT INTO address (street_address, zip, city) 
VALUES
  ('Producentgatan 1', '11111', 'Produstan');

INSERT INTO user_address (user_id, address_id, type) 
VALUES
  ('1', '1', 'business');

INSERT INTO producer (org_no, user_id, description) 
VALUES
  ('1111111111', '1', 'ProduCent AB\nVi har allt du vill ha nära!');

INSERT INTO product (producer_org_no, name, description, price, sale_price, unit, in_stock) 
VALUES
  ('1111111111', 'Tomat', 'Röd tomat', 29, 19, 'kg', 10),
  ('1111111111', 'Gurka', 'Grön gurka', 12, null, 'st', 10),
  ('1111111111', 'Äpple', 'Royal Gala', 34, null, 'kg', 10),
  ('1111111111', 'Päron', 'Conference', 44, 39, 'kg', 10),
  ('1111111111', 'Ruccola', 'Färsk ruccola sallad', 129, 119, 'kg', 10);

INSERT INTO product_category (product_id, category_id) 
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 3),
  (3, 10),
  (3, 11),
  (4, 10),
  (4, 12),
  (5, 1),
  (5, 4);

INSERT INTO product_tag (name, product_id) 
VALUES
  ('Nyhet', 1),
  ('Söta', 1),
  ('Nyhet', 2),
  ('Raka', 2),
  ('Spanska', 3),
  ('Svenska', 4),
  ('Färsk', 5);

--INSERT INTO product_image (product_id, image_name, alt_text)
--VALUES
--  (1,'test.jpg', 'Image of a test.jpg');
