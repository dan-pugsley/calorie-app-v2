<?php

namespace Tests\Feature;

use App\Models\Entry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    const ReportPeriod = 7;

    private $user;
    private $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->admin = User::factory()->admin()->create();

        // Add test entries
        Entry::factory()->count(50)->create();
    }

    public function test_user_can_view_own_entries()
    {
        $this->actingAs($this->user)
            ->getJson("/api/entries/0/0/{$this->user->id}")
            ->assertOk()
            ->assertJsonStructure(['entries']);
    }

    public function test_user_cannot_view_other_entries()
    {
        $this->actingAs($this->user)
            ->getJson("/api/entries/0/0/{$this->admin->id}")
            ->assertStatus(403);
    }

    public function test_admin_can_view_other_entries()
    {
        $this->actingAs($this->admin)
            ->getJson("/api/entries/0/0/{$this->user->id}")
            ->assertOk()
            ->assertJsonStructure(['entries']);
    }

    public function test_user_can_add_own_entry()
    {
        $this->actingAs($this->user)
            ->postJson("/api/entries", $this->getAddEntryParams($this->user))
            ->assertOk()
            ->assertJsonStructure(['id']);
    }

    public function test_user_cannot_add_invalid_entry()
    {
        $this->actingAs($this->user)
            ->postJson("/api/entries", $this->getAddEntryParams($this->user, true))
            ->assertStatus(422);
    }

    public function test_user_cannot_add_other_entry()
    {
        $this->actingAs($this->user)
            ->postJson("/api/entries", $this->getAddEntryParams($this->admin))
            ->assertStatus(403);
    }

    public function test_admin_can_add_other_entry()
    {
        $this->actingAs($this->admin)
            ->postJson("/api/entries", $this->getAddEntryParams($this->user))
            ->assertOk()
            ->assertJsonStructure(['id']);
    }

    public function test_user_can_update_own_entry()
    {
        $normalEntry = Entry::create($this->getAddEntryParams($this->user));

        $this->actingAs($this->user)
            ->putJson("/api/entries/{$normalEntry->id}", [
                'calories' => $normalEntry->calories + 1
            ])
            ->assertOk()
            ->assertJson([
                'changed' => true
            ]);
    }

    public function test_user_cannot_update_invalid_entry()
    {
        $normalEntry = Entry::create($this->getAddEntryParams($this->user));

        $this->actingAs($this->user)
            ->putJson("/api/entries/{$normalEntry->id}", [
                'name' => str_pad('', 200, 'a')
            ])
            ->assertStatus(422);
    }

    public function test_user_cannot_update_other_entry()
    {
        $otherEntry = Entry::create($this->getAddEntryParams($this->admin));

        $this->actingAs($this->user)
            ->putJson("/api/entries/{$otherEntry->id}", [
                'calories' => $otherEntry->calories + 1
            ])
            ->assertStatus(403);
    }

    public function test_admin_can_update_other_entry()
    {
        $normalEntry = Entry::create($this->getAddEntryParams($this->user));

        $this->actingAs($this->admin)
            ->putJson("/api/entries/{$normalEntry->id}", [
                'calories' => $normalEntry->calories + 1
            ])
            ->assertOk()
            ->assertJson([
                'changed' => true
            ]);
    }


    public function test_user_can_delete_own_entry()
    {
        $normalEntry = Entry::create($this->getAddEntryParams($this->user));

        $this->actingAs($this->user)
            ->deleteJson("/api/entries/{$normalEntry->id}")
            ->assertOk()
            ->assertJson([
                'deleted' => true
            ]);
    }

    public function test_user_cannot_delete_other_entry()
    {
        $otherEntry = Entry::create($this->getAddEntryParams($this->admin));

        $this->actingAs($this->user)
            ->deleteJson("/api/entries/{$otherEntry->id}")
            ->assertStatus(403);
    }

    public function test_admin_can_delete_other_entry()
    {
        $normalEntry = Entry::create($this->getAddEntryParams($this->user));

        $this->actingAs($this->admin)
            ->deleteJson("/api/entries/{$normalEntry->id}")
            ->assertOk()
            ->assertJson([
                'deleted' => true
            ]);
    }

    public function test_user_cannot_view_entries_report()
    {
        $this->actingAs($this->user)
            ->getJson("/api/report/entries-added/".self::ReportPeriod)
            ->assertStatus(403);
    }

    public function test_user_cannot_view_calories_report()
    {
        $this->actingAs($this->user)
            ->getJson("/api/report/user-avg-cals/".self::ReportPeriod)
            ->assertStatus(403);
    }

    public function test_admin_can_view_entries_report()
    {
        $this->actingAs($this->admin)
            ->getJson("/api/report/entries-added/".self::ReportPeriod)
            ->assertOk()
            ->assertJsonStructure([
                'current_period',
                'previous_period',
            ]);
    }

    public function test_admin_can_view_calories_report()
    {
        $this->actingAs($this->admin)
            ->getJson("/api/report/user-avg-cals/".self::ReportPeriod)
            ->assertOk()
            ->assertJsonStructure([
                'average_calories_per_user',
            ]);
    }

    
    // ——— Helpers ———

    private function getAddEntryParams($toUser, $invalid = false)
    {
        return [
            'name' => 'salad',
            'calories' => $invalid ? -1 : 150,
            'is_cheat' => false,
            'created_at_ts' => 1653219536000,
            'user_id' => $toUser->id,
        ];
    }
}
