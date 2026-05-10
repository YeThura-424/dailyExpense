drop table if exists budget_categories;

create table 
  budget_categories(
    id bigint primary key generated always as identity not null,
    user_id uuid not null references auth.users on delete cascade,
    budget_id bigint not null references budget(id) on delete cascade,
    category_id bigint not null references categories(id) on delete cascade,
    created_at timestamptz default now() not null,
    expired_at timestamptz null
  );