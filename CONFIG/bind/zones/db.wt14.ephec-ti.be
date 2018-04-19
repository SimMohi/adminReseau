;
;BIND File
;

$TTL 1d
$ORIGIN wt14.ephec-ti.be.
@	1D	IN	SOA	ns1.wt14.ephec-ti.be. root.wt14.ephec-ti.be. (
				1	; serial
				3H	; refresh
				15	; retry
				1w	; expire
				3h)	;

;NS RECORDS
	IN	NS	ns1.wt14.ephec-ti.be.		;Utilisé pour définir quels serveurs répondent pour cette zone.
	IN	MX	10	mail.wt14.ephec-ti.be.

;A Records
ns1	IN	A	54.37.65.61			; Cet enregistrement fait correspondre une adresse IP à un nom de machine.


;Configuration WEB

web		IN	A	54.37.65.61 ; VPS - JULIEN
service 	IN	A	54.37.65.61 ; VPS - JULIEN

www		IN	CNAME	web
b2b		IN	CNAME 	web
intranet	IN	CNAME	web
postfixadmin	IN	CNAME	service
webmail		IN	CNAME	service
