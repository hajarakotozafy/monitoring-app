create trigger account_trg
before update
on accounts
For each row
execute procedure account_audit_trg_func();