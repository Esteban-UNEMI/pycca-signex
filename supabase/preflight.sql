-- Read-only inspection. Run on the confirmed Esteban-Unemi project BEFORE migrations.
select current_database() as database_name, current_user as database_role;

select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
order by tablename;

select typname
from pg_type t join pg_namespace n on n.oid = t.typnamespace
where n.nspname = 'public' and typname in
 ('app_role', 'order_status', 'sales_channel', 'fulfillment_method', 'payment_status');

select schemaname, tablename, policyname, roles, cmd
from pg_policies
where schemaname = 'public'
order by tablename, policyname;
