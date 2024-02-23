create function account_audit_trg_func()
returns trigger
language 'plpgsql'
as $$
declare
begin
	INSERT INTO account_audits
	(action_type, updated_at, account_number, account_owner, account_amount_old, account_amount_new, username)
	VALUES ('ajout', now(), old.account_number, old.account_owner, old.account_amount, new.account_amount, user);
return new;
end;
$$;