CREATE TABLE User (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(100) NOT NULL,
  full_name VARCHAR(40) NOT NULL,
  role VARCHAR(20) NOT NULL,
  address_id INT(7),
  PRIMARY KEY (id),
  FOREIGN KEY (address_id) REFERENCES Address(id)
)

INSERT INTO User (email, password, full_name, role) 
VALUES
('admin@mail.com', 'admin', 'Admin Adminsson', 'ADMIN'),
('producenten@mail.com', 'producenten', 'Produ Centen', 'PRODUCENT');


