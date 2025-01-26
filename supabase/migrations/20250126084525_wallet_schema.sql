drop table if exists wallet;

create table 
  wallet(
    id bigint primary key generated always as identity not null,
    user_id uuid references auth.users on delete cascade not null,
    name text unique not null,
    amount int default 0 not null
  );