<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Entry;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Create admin user.
        User::factory()->admin()->create();
        
        // Create standard users.
        User::factory()->count(2)->create();

        // Create entries for users.
        Entry::factory()->count(50)->create();
    }
}
