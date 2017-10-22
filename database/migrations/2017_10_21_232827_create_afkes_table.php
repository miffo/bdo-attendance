<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAfkesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('afkes', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger("user_id")->index("user");
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
        Schema::dropIfExists('afkes');
    }
}
