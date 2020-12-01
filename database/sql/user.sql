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
  description VARCHAR(500),
  price INT NOT NULL,
  unit VARCHAR(20) NOT NULL,
  in_stock INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (producer_org_no) REFERENCES producer(org_no)
);
INSERT INTO product (producer_org_no, name, description, price, unit, in_stock) 
VALUES
  ('1234567897', 'Name', 'Description', 55, 'kg', 25);

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
  ('Grönsaker', 'Färska grönsaker', NULL), ('Frukter', 'Färska frukter', NULL), ('Mejeri', 'Variation av mejeriprodukter', NULL), ('Mjölk', 'Variation av mjölk', 3);
  


-- PRODUCT_CATEGORY --
CREATE TABLE product_category (
  product_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (product_id, category_id),
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);
