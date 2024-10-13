<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IpController;
Route::post('/upload-csv', [IpController::class, 'uploadCsv']);
Route::get('/whitelist', [IpController::class, 'whitelist']);
Route::get('/blacklist', [IpController::class, 'blacklist']);
Route::post('/blacklist', [IpController::class, 'storeBlacklist']);
Route::put('/blacklist/{id}', [IpController::class, 'updateBlacklist']);
Route::delete('/blacklist/{id}', [IpController::class, 'destroyBlacklist']);