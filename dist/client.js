ESX = null; PlayerData = null; var table = [], loaded = false;
setInterval(loadESX, 1000);
function loadESX(){ if (ESX === null) emit('esx:getSharedObject', function(obj) { ESX = obj });}

emitNet("vstancer:returnVehicles");

RegisterNetEvent('esx:playerLoaded')
on('esx:playerLoaded', (xPlayer) => { PlayerData = xPlayer });

RegisterNetEvent('vstancer:cLoadData')
on('vstancer:cLoadData', (d) => {
	table = [];
	for (let i = 0; i < d.length; i++) {
		table[i] = { plate: d[i]["plate"], data: d[i]["tires"], loaded: d[i]["loaded"] };
	}
	loaded = true;
});

RegisterNetEvent('vstancer:cloadvehicles')
on('vstancer:cloadvehicles', () => {
	console.log("Joo")
	for (let i = 0; i < table.length; i++) {
		if ( table[i].loaded === true ) {
			table[i].loaded = false;
		}
	}
});

RegisterNetEvent('vstancer:changeVehicles')
on('vstancer:changeVehicles', (plate,v, tires) => {
	if ( plate === null || v === null) return;
	if ( tires !== undefined ) {
		for (let i = 0; i < table.length; i++) {
			if ( table[i].plate === plate ){
				table[i].data = JSON.stringify(tires);
				return;
			}
		}
	} else {
		for (let i = 0; i < table.length; i++) {
			if ( table[i].plate === plate ){
				table[i].loaded = v;
				return;
			}
		}
	}
});

RegisterNetEvent('vstancer:changeVehiclesChambers')
on('vstancer:changeVehiclesChambers', (d) => {
	if (d === "reset") {
		let v = GetVehiclePedIsIn(GetPlayerPed(-1));
		let pr = exports[GetCurrentResourceName()].GetVstancerPreset(v);
		exports[GetCurrentResourceName()].SetVstancerPreset(v,pr[4],pr[5],pr[6],pr[7]);
		emitNet("vstancer:sSQL", GetVehicleNumberPlateText(v), exports[GetCurrentResourceName()].GetVstancerPreset(v));
	} else {
		emitNet("vstancer:sSQL", GetVehicleNumberPlateText(GetVehiclePedIsIn(GetPlayerPed(-1))), exports[GetCurrentResourceName()].GetVstancerPreset(GetVehiclePedIsIn(GetPlayerPed(-1))));
	}
});

setInterval(LoadTable, 2500)
function LoadTable() {
	if (loaded === false && ESX !== null) return;
	let ev = exports[GetCurrentResourceName()].GetVstancerNearVehicles(40.0)
	if ( ev.length > 0 ) {
		for (let x = 0; x < table.length; x++) {
			if (table[x].loaded === false) {
				for (let i = 0; i < ev.length; i++) {
					if ( table[x].plate.trim() === GetVehicleNumberPlateText(ev[i]).trim()) {
						
						let d = JSON.parse(table[x].data)
						exports[GetCurrentResourceName()].SetVstancerPreset(ev[i],parseFloat(d[0]),parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3]))
						emitNet("vstancer:updateVehicles", table[x].plate)
					}
				}
			}
		}
	}
}
// identifier == "87dedcd959b350fc8d1a936f36cec4aaa0862dac"
// ESX job name "cardealer";

const whitelisted = ["cardealer", "87dedcd959b350fc8d1a936f36cec4aaa0862dac"];
RegisterCommand("chamber", function (source, args) {
	for (let i = 0; i < whitelisted.length; i++) {
		if (whitelisted[i] === ESX.GetPlayerData().identifier || whitelisted[i] === ESX.GetPlayerData().job.name) {
			exports[GetCurrentResourceName()].openVstancer()
			return;
		}
	}
}, false);

// emit("vstancer:cloadvehicles")

