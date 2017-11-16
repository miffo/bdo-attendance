<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSignupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sign_ups', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('event_id');
            $table->unsignedInteger("character_id");
            $table->unsignedInteger("member_id");
            $table->boolean("attending")->default(0);
            $table->string("comment", 255)->default("");
            $table->timestamps();
            $table->index(['event_id', 'character_id', 'member_id'], "signed_up");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sign_ups');
    }
}
