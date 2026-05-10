drop table if exists wallet_transaction_log;

create table 
  wallet_transaction_log (
    id bigint primary key generated always as identity not null,
    action_date timestamptz not null,
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    wallet_id bigint not null references wallet(id) on delete cascade,
    transaction_id bigint not null references transactions(id) on delete cascade,
    type text not null,
    before_amount int not null,
    transaction_amount int not null,
    after_amount int not null,
    transaction_at timestamptz default now() not null
  );