<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class WebTest extends TestCase
{
    private $user;
    private $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->make();
        $this->admin = User::factory()->admin()->make();
    }

    public function test_non_user_cannot_access_home()
    {
        $this->get('/')
            ->assertStatus(401);
    }

    public function test_user_can_access_home()
    {
        $this->actingAs($this->user)
            ->get('/')
            ->assertOk();
    }

    public function test_user_cannot_access_report()
    {
        $this->actingAs($this->user)
            ->get('/report')
            ->assertStatus(403);
    }

    public function test_admin_can_access_report()
    {
        $this->actingAs($this->admin)
            ->get('/report')
            ->assertOk();
    }
}
