KickPlayer = function(id, reason)
    local Check = GetPlayerName(id)
    if Check == nil then return false end
    DropPlayer(id, reason)
    return true
end

exports("KickPlayer", KickPlayer)