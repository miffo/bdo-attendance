<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersTableDiscord extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("users", function (Blueprint $table) {
            $table->unsignedBigInteger('id')->change();
            $table->string('discriminator', 255)->after("name");
            $table->dropColumn("password");
            $table->dropColumn("remember_token");
            $table->string('avatar', 255)->nullable()->default(null)->after("email");
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
            $table->increments('id')->change();
            $table->string('password')->after("email");
            $table->rememberToken()->after("password");
            $table->dropColumn('avatar');
        });
    }
}
