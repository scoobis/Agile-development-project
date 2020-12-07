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

INSERT INTO user (email, password, full_name, phone_no) 
VALUES
  ('prod@mail.com', 'prodprod', 'Prod', '1234567897');


-- ADDRESS --
CREATE TABLE address (
  id INT NOT NULL AUTO_INCREMENT,
  street_address VARCHAR(100),
  zip INT(5),
  city VARCHAR(40),
  PRIMARY KEY (id)
);

INSERT INTO address (street_address, zip, city) 
VALUES
  ('Prodstreet 1', '12345', 'Prodcity');

-- USER_ADDRESS --
CREATE TABLE user_address (
  user_id INT NOT NULL,
  address_id INT NOT NULL,
  type VARCHAR(100) NOT NULL,
  PRIMARY KEY (user_id, address_id),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (address_id) REFERENCES address(id)
);

INSERT INTO user_address (user_id, address_id, type) 
VALUES
  ('1', '1', 'business');

-- PRODUCER --
CREATE TABLE producer (
  org_no VARCHAR(10) NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (org_no),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO producer (org_no, user_id) 
VALUES
  ('1234567897', '1');

-- PRODUCT --
CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT,
  producer_org_no VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price INT NOT NULL,
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


INSERT INTO category (name, description, parent_id) 
VALUES 
  ('Grönsaker', 'Färska grönsaker', NULL), ('Frukter', 'Färska frukter', NULL), ('Kött', 'Variation av köttprodukter', NULL), ('Nötkött', 'Nötkött', 3), ('Styckningsdetaljer', 'Styckningsdetaljer', 4), ('Rostbiff', 'Rostbiff', 5), ('Innanlår', 'Innanlår', 5), ('Bananer', 'Bananer', 2), ('Ekologiska bananer', 'Ekologiska bananer', 8);


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
  PRIMARY KEY(id),
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

INSERT INTO product_image (product_id, image_name, alt_text)
VALUES
  (1,'test.jpg', 'Image of a test.jpg')