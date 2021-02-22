create table documents
(
  _id serial primary key not null,
  document jsonb not null
);

copy documents (document) from 'file_name_here'

-- schema to seed postgres db, the shape of the JSONB docs is the same as Mongo Schema