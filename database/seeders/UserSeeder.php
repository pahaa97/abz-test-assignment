<?php

namespace Database\Seeders;

use App\Models\Position;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hasPositions = Position::first();

        if (!$hasPositions) {
            $this->call(PositionSeeder::class);
        }

        User::factory(45)->create();
    }
}
