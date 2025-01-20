-- drop table if exists daily_expense;

-- -- create table daily_expense(
-- --   id bigint primary key generated always as identity not null,
-- --   date timestampz not null,
-- --   description text not null,

-- -- )

-- CREATE TABLE transactions (
--     id SERIAL PRIMARY KEY,
--     category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
--     wallet_id INT NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
--     user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     description TEXT NOT NULL,
--     amount INT NOT NULL,
--     type TEXT CHECK (type IN ('income', 'expend')) NOT NULL,
--     action_date TIMESTAMP DEFAULT NULL,
--     deleted_at TIMESTAMP DEFAULT NULL,
--     created_at TIMESTAMP DEFAULT NOW(),
--     updated_at TIMESTAMP DEFAULT NOW()
-- );


-- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--    NEW.updated_at = NOW();
--    RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER set_updated_at
-- BEFORE UPDATE ON transactions
-- FOR EACH ROW
-- EXECUTE FUNCTION update_updated_at_column();