ESX = nil
Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

function GetVstancerNearVehicles (radius) 
    return ESX.Game.GetVehiclesInArea(GetEntityCoords(PlayerPedId(-1)), radius)
end