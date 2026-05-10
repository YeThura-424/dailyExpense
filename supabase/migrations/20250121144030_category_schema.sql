drop table if exists categories;

drop type if exists current_status;

create type category_type as enum('income','expense');

create table
  categories(
    id bigint primary key generated always as identity not null,
    name text not null,
    type category_type default 'income' not null,
    user_id uuid references auth.users on delete cascade null,
    is_default boolean default false,
    created_at timestamptz default now() not null,
    CONSTRAINT unique_user_category UNIQUE (user_id, name)
  );