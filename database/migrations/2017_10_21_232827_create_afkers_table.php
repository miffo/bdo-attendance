<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAfkersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('afk', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger("member_id")->index("member");
            $table->string("reason", 255)->default("");
            $table->date("from_date");
            $table->date("to_date");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('afkers');
    }
}
