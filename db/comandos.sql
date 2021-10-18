
CREATE TABLE sensors(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR (50) NOT NULL,
	deleted boolean DEFAULT false
);

ALTER TABLE sensors ADD createdAt date;
ALTER TABLE sensors ADD updatedAt date;

CREATE TABLE measures(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	temperature INT NOT NULL,
	hour INT NOT NULL,
	sensor_id BIGINT NOT NULL REFERENCES sensors(id)
);


ALTER TABLE measures ADD createdAt date;
ALTER TABLE measures ADD updatedAt date;