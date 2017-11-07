<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('permission', 255);
        });

        $permissions = [
            ['permission' => 'view_app'],
            ['permission' => 'create_signup'],
            ['permission' => 'edit_signup'],
            ['permission' => 'create_afk'],
            ['permission' => 'edit_afk'],
            ['permission' => 'create_character_other'],
            ['permission' => 'edit_character_other'],
            ['permission' => 'create_afk_other'],
            ['permission' => 'edit_aft_other'],
            ['permission' => 'create_event'],
            ['permission' => 'edit_event'],
            ['permission' => 'add_attended'],
            ['permission' => 'administrate'],
        ];

        DB::table('permissions')->insert($permissions);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permissions');
    }
}
