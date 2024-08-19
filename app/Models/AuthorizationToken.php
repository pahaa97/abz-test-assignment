<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class AuthorizationToken extends Model
{
    protected $fillable = ['token', 'used', 'expires_at'];

    /**
     * @return mixed
     */
    public static function generate()
    {
        return self::create([
            'token' => Str::random(60),
            'expires_at' => now()->addMinutes(40),
        ]);
    }

    /**
     * @return bool
     */
    public function isValid()
    {
        return !$this->used && Carbon::now()->lt($this->expires_at);
    }

    /**
     * @return void
     */
    public function markAsUsed()
    {
        $this->update(['used' => true]);
    }
}
