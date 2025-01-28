drop table if exists wallet_transaction_log_schema;

create table 
  wallet_transaction_log_schema (
    id bigint primary key generated always as identity not null,
    action_date timestamptz not null,
    wallet_id int not null references wallet(id) on delete cascade,
    transaction_id int not null references transactions(id) on delete cascade,
    type text not null,
    before_amount int not null,
    transaction_amount int not null,
    after_amount int not null,
    transaction_at timestamptz default now() not null
  );