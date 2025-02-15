drop table if exists budget;

create table 
  budget (
    id bigint primary key generated always as identity not null,
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    title text not null,
    -- category_id bigint not null references categories(id) on delete cascade,
    total int default 0 not null,
    spend_amount int null,
    remaining_amount int null,
    alert text default false,
    usage int default 0 null,
    expired_at timestamptz null,
    created_at timestamptz default now()
  );