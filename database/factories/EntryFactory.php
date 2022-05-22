<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Entry>
 */
class EntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $createdAt = $this->faker->dateTimeBetween('-14 days');

        return [
            'user_id' => $this->faker->randomElement(\App\Models\User::pluck('id')->toArray()),
            'name' => $this->faker->randomElement(['beer', 'cake', 'burger', 'sandwich', 'granola', 'banana', 'porridge', 'cereal', 'coca cola', 'pizza', 'pasta']),
            'calories' => rand(50, 500),
            'is_cheat' => rand(0, 9) >= 8,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
