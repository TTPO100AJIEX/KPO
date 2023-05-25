CREATE TABLE dishes
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE FUNCTION synchronize_dishes_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql VOLATILE LEAKPROOF STRICT PARALLEL SAFE AS
$$ BEGIN
    NEW.created_at = OLD.created_at;
    NEW.updated_at = NOW();
	RETURN NEW;
END $$;
CREATE TRIGGER dishes_updated_at_synchronization AFTER UPDATE ON dishes
FOR EACH ROW EXECUTE FUNCTION synchronize_dishes_updated_at();



CREATE TABLE order (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    userid INT REFERENCES users(id) MATCH FULL ON DELETE SET NULL ON UPDATE CASCADE,
    
    status VARCHAR(50) NOT NULL,
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);





II.3.3. Создание таблицы `order_dish`:
CREATE TABLE order_dish (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    dish_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES order(id),
    FOREIGN KEY (dish_id) REFERENCES dish(id)
);
