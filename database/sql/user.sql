-- USER --
CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(100) NOT NULL,
  full_name VARCHAR(40) NOT NULL,
  phone_no INT(10),
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
  org_no INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (org_no),
  FOREIGN KEY (user_id) REFERENCES user(id)
);
