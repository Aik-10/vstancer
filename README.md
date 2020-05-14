# **vstancer Fivem** :+1:
SQL Build
```
CREATE TABLE IF NOT EXISTS `tuning` (
  `plate` varchar(50) DEFAULT NULL,
  `tunings` text DEFAULT '[]',
  `tires` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

edit in client.js line
```
ESX job name template "cardealer"
```
```
ESX identifier template "87dedcd959b350fc8d1a936f36cec4aaa0862dga"
```
```
const whitelisted = ["cardealer", "87dedcd959b350fc8d1a936f36cec4aaa0862dga"];
```

Trigger client event when you vehicle was repaired.
```
TriggerEvent("vstancer:cloadvehicles")
```
Or in javascript
```
emit("vstancer:cloadvehicles")
```

### Original repo
 - https://github.com/carmineos/fivem-vstancer
### Reguired Script
- https://github.com/brouznouf/fivem-mysql-async
- https://github.com/ESX-Org/es_extended
