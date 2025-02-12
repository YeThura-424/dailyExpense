drop table if exists wallet_transfer_log;

create table
  wallet_transfer_log(
    id bigint primary key generated always as identity not null,
    created_at timestamptz default now() not null,
    user_id UUID not null references auth.users on delete cascade,
    from_wallet bigint not null references wallet(id) on delete cascade,
    to_wallet bigint not null references wallet(id) on delete cascade,
    from_wallet_before_amount default 0 not null,
    to_wallet_before_amount default 0 not null,
    transfer_amount int default 0 not null,
    from_wallet_after_amount int default 0 not null,
    to_wallet_after_amount default 0 not null,
  );