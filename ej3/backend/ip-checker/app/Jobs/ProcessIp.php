<?php

namespace App\Jobs;

use App\Models\WhitelistIp;
use App\Models\IpLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
class ProcessIp implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $ip;

    public function __construct($ip)
    {
        $this->ip = $ip;
    }

    public function handle()
    {
        try {
            //Log::info("Processing IP: {$this->ip}");
            $response = Http::get("https://ipapi.co/$this->ip/json/");
            $data = $response->json();

            if ($response->successful()) {
                WhitelistIp::create([
                    'ip_address' => $this->ip,
                    'country' => $data['country_name'] ?? 'Unknown',
                ]);
            } else {
                IpLog::create([
                    'ip_address' => $this->ip,
                    'message' => 'Error al obtener el pais de la IP',
                ]);
            }
        } catch (\Exception $e) {
            IpLog::create([
                'ip_address' => $this->ip,
                'message' => $e->getMessage(),
            ]);
            //Log::error("Error processing IP: {$this->ip}. Exception: {$e->getMessage()}");
        }
    }
}

