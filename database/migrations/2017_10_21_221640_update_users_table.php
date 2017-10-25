<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("users", function (Blueprint $table) {
            $table->string("family_name", 255)
                ->after("name")
                ->unique();
            $table->unsignedInteger("default_character_id")
                ->after("family_name")
                ->nullable()
                ->default(null);
            $table->unique(["family_name", "name"], "user");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("users", function (Blueprint $table) {
            $table->dropUnique("user");
            $table->dropColumn("family_name");
            $table->dropColumn("default_character");
        });
    }
}
