CREATE TYPE USER_ROLE AS ENUM ('CUSTOMER', 'CHEF', 'MANAGER');
CREATE TABLE users
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    role USER_ROLE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE FUNCTION synchronize_users_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql VOLATILE LEAKPROOF STRICT PARALLEL SAFE AS
$$ BEGIN
    NEW.created_at = OLD.created_at;
    NEW.updated_at = NOW();
	RETURN NEW;
END $$;
CREATE TRIGGER users_updated_at_synchronization AFTER UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION synchronize_users_updated_at();