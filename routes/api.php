<?php

use App\Http\Controllers\PositionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{userId}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store'])->middleware('auth.token');
Route::get('/token', [UserController::class, 'getToken']);

Route::get('/positions', [PositionController::class, 'index']);


Route::get('/avatars/{avatar}', [UserController::class, 'getAvatar'])->name('files.show');
