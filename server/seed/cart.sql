create table documents
(
  _id serial primary key not null,
  document jsonb not null
);

copy documents (document) from 'file_name_here'