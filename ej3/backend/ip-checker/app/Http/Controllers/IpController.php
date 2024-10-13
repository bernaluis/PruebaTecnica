<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BlacklistIp;
use App\Models\WhitelistIp;
use Illuminate\Support\Facades\Http;

class IpController extends Controller
{
    // Cargar CSV y verificar contra la lista negra
    public function uploadCsv(Request $request)
    {
        if (!$request->hasFile('csv_file')) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se ha detectado un archivo'
            ]);
        }

        $file = $request->file('csv_file');
        
        $ips = array_map('str_getcsv', file($file->getRealPath()));

        $blacklistedIps = [];
        foreach ($ips as $ipData) {
            $ip = $ipData[0];
            if (BlacklistIp::where('ip_address', $ip)->exists()) {
                $blacklistedIps[] = $ip;
            }
        }

        if (count($blacklistedIps) > 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'IP encontrada en blacklist',
                'blacklisted_ips' => $blacklistedIps,
            ]);
        }

        // Procesa las IPs en segundo plano
        foreach ($ips as $ipData) {
            $ip = $ipData[0];
            dispatch(new \App\Jobs\ProcessIp($ip));
        }      
        return response()->json(['status' => 'success', 'message' => 'Procesando las IPs en background']);
    }

    // Mostrar lista blanca de IPs
    public function whitelist()
    {
        return WhitelistIp::all();
    }



     // Obtener todas las IPs en la lista negra
     public function blacklist()
     {
         return BlacklistIp::all();
     }
 
    // Agregar una nueva IP a la lista negra
    public function storeBlacklist(Request $request)
    {
        $request->validate([
            'ip_address' => 'required|ipv4|unique:blacklist_ips',
        ]);

        $ipData = Http::get("https://ipapi.co/".$request->ip_address."/json/");
        $country = $ipData->json()['country_name'] ?? 'Unknown';

        $blacklistIp = BlacklistIp::create([
            'ip_address' => $request->ip_address,
            'country' => $country,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'IP agregada a la blacklist',
            'blacklist_ip' => $blacklistIp,
        ]);
    }

    // Actualizar una IP de la lista negra
    public function updateBlacklist(Request $request, $id)
    {
        $request->validate([
            'ip_address' => 'required|ipv4|unique:blacklist_ips,ip_address,' . $id,
        ]);

        $blacklistIp = BlacklistIp::findOrFail($id);
        $blacklistIp->ip_address = $request->ip_address;
        $blacklistIp->save();

        return response()->json([
            'status' => 'success',
            'message' => 'IP actualizada correctamente',
            'blacklist_ip' => $blacklistIp,
        ]);
    }

    // Eliminar una IP de la lista negra
    public function destroyBlacklist($id)
    {
        $blacklistIp = BlacklistIp::findOrFail($id);
        $blacklistIp->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'IP eliminada exitosamente',
        ]);
    }
}
