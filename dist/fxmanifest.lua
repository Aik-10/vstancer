fx_version 'adamant'
games { 'gta5' }

files {
	'MenuAPI.dll',
	'Newtonsoft.Json.dll',
	'config.json'
}

client_scripts {
	'VStancer.Client.net.dll',
	'client.js',
	'client.lua'
}

server_scripts {
	'@mysql-async/lib/MySQL.lua',
	'server.lua',
}

exports {
	'SetVstancerPreset',
	'GetVstancerPreset',
	'openVstancer',
	'GetVstancerNearVehicles'
}