<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateEventsTableDiscord extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("events", function (Blueprint $table) {
            $table->bigInteger("guild_id",false, true)->after('id')->index("guild");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("events", function (Blueprint $table) {
            $table->dropColumn("guild_id");
        });
    }
}
