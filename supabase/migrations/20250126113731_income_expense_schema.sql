drop table if exists daily_expense;

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    wallet_id INT NOT NULL REFERENCES wallet(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    description TEXT NOT NULL,
    amount INT NOT NULL,
    type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
    action_date timestamptz DEFAULT NULL,
    deleted_at timestamptz DEFAULT NULL,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();