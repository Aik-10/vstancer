local vehicles = {}

MySQL.ready(function ()
     MySQL.Async.fetchAll('SELECT plate,tires FROM tuning WHERE tires IS NOT NULL', {}, function(tuning)
        if ( tuning ~= "" or tuning ~= "{}" or tuning ~= nil ) then
            for i,v in ipairs(tuning) do 
                table.insert(vehicles, v)
                vehicles[i]["loaded"] = false;
            end
        end
    end)
end)

RegisterServerEvent("vstancer:sSQL")
AddEventHandler("vstancer:sSQL", function(plate, tires)
    local src = source

    local query = MySQL.Sync.fetchScalar("SELECT * FROM tuning WHERE plate = @plate", { ['@plate'] = plate})
    if (query == nil) then
        MySQL.Sync.execute("INSERT INTO tuning ( plate,tires ) VALUES (@plate,@tires)", {
            ['@plate'] = plate,
            ['@tires'] = json.encode(tires)
        })
    else 
        MySQL.Sync.execute("UPDATE tuning SET tires=@tires WHERE plate=@plate", {['@plate'] = plate, ['@tires'] = json.encode(tires) })
    end
    
    for i,v in ipairs(vehicles) do 
        if (v["plate"] == plate) then
            v["tires"] = json.encode(tires)
            TriggerClientEvent("vstancer:changeVehicles", -1, plate, v["loaded"], v["tires"])
            break
        end
    end
end)

RegisterServerEvent("vstancer:updateVehicles")
AddEventHandler("vstancer:updateVehicles", function(plate)
    local src = source
    for i,v in ipairs(vehicles) do 
        if (v["plate"] == plate) then
            if ( vehicles[i]["loaded"] == false) then vehicles[i]["loaded"] = true  end -- else vehicles[i]["loaded"] = false
            TriggerClientEvent("vstancer:changeVehicles", -1, v["plate"], vehicles[i]["loaded"])
            break
        end
    end
end)

RegisterServerEvent("vstancer:returnVehicles")
AddEventHandler("vstancer:returnVehicles", function(scr)
    local src = source
    if src == nil then src = scr end
    TriggerClientEvent("vstancer:cLoadData", src, vehicles)
end)