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
	IN	NS		ns1.wt14.ephec-ti.be.		;Utilisé pour définir quels serveurs répondent pour cette zone.
	IN	MX	10	mail.wt14.ephec-ti.be.

;A Records
ns1	IN	A	54.37.65.61			; Cet enregistrement fait correspondre une adresse IP à un nom de machine.


;Configuration WEB

web		IN	A	54.37.65.61 ; VPS - JULIEN

www		IN	CNAME	web
b2b		IN	CNAME 	web
intranet	IN	CNAME	web

;Serveur sip
sip.wt14.ephec-ti.be.	IN	A	54.37.65.61
_sip._tcp               IN SRV 0 0 5060 sip.wt14.ephe-ti.be.
_sip._udp		IN SRV 0 0 5060 sip.wt14.ephe-ti.be.


; config mail

mail 		IN	A	54.37.65.61 
smtp					IN	CNAME	mail
pop3					IN	CNAME	mail
imap					IN	CNAME	mail
mail._domainkey IN      TXT     ( "v=DKIM1; h=sha256; k=rsa; "
          "p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0GOkyXTL5wsyDNDK9DbyGc74V9D+ZMoiiY5RNsINGtCb934f2GGofpFAfZHTzBcUXLBqz3PfYylJEUgsy5YERWjpZfkZJvOBm/5PlLmQZVBLTJeSVhPjkJ24M5cn4TV2vCnpe9oO24cMuu4h8OOrvXiipKH9FtlVirlD3ZuPJSln2MuJtDZO4t0nkPmptBDYAbMXcHMLIeqGsJ"
          "KhTB2tTsaeGZG18dcrxsIIukxM1bZX5JliilFJv7Lv+MMYm5sjfOQOfbAp3fcj6Z6NK3wxoX5gl0z8p8ft/sr9zhqIezYiOAEOc5SwYN0NH6SDhP0DwzFy9VDCNpNMsz3WIaYRfwIDAQAB" )  ; ----- DKIM key mail for wt14.ephec-ti.be
